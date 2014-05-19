
// Initialization of the casperjs and create the first configuration
var casper = require('casper').create(),
    base = 'http://localhost:1337/',
    ajaxurls = {
        links: base+'pages',
        scambNext: base+'sites/scrambNext/',
        resource: base+'resource'
    },
    request = {};

    request.url = casper.cli.args[0];
    request.id = casper.cli.args[1];

// Utilities functions
var _utils = {

    process_links: function( ajax_urls, request ){
        console.log("Process links");

        var links = __utils__.findAll('a');
        return Array.prototype.forEach.call(links, function(link_elem) {

            console.log(link_elem);
            console.log(link_elem.hostname);
            console.log(request.url);
            console.log(request.url.indexOf(link_elem.hostname));

            if( request.url.indexOf(link_elem.hostname) > -1 ){

              if( typeof link_elem.getAttribute != "undefined" ){

                  var url = link_elem.getAttribute("href");
                  __utils__.sendAJAX(ajax_urls.links, 'POST', {path: url}, false);

              }

            }

        });
    },

    process_scripts: function( ajax_urls, request ){



        var script = document.getElementsByTagName('script');
        var txt = '';

        for( var z in script ){
            __utils__.sendAJAX(ajax_urls.resource, 'POST', {type: 'js', content: script[z].outerHTML, url: request.url }, false);

            if( typeof script[z].outerHTML != "undefined"){
                txt += script[z].outerHTML+"\n";
            }else{
                txt += script[z]+"\n";
            }
        }

        console.log(txt);
    },

    finish: function( ajax_urls, request ){
      __utils__.sendAJAX(ajax_urls.scambNext, 'POST', { site: request.id }, false);
    }

};

// Casperjs data binding
casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
});
casper.on( 'page.error', function (msg, trace) {
    this.echo( 'Error: ' + msg, 'ERROR' );
});

//console.log( casper.cli.args );


casper.start(request.url).then(function(){

    this.evaluate(_utils.process_links, {ajaxurls: ajaxurls, request: request});

}).then(function(){

    this.evaluate(_utils.process_scripts, {ajaxurls: ajaxurls, request: request});

}).then(function(){

    this.evaluate(_utils.finish, {ajaxurls: ajaxurls, request: request});
});

casper.run(function() {
    this.debugPage();
    this.exit();
});

