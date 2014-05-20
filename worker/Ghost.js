
// Get the current directory
var currentFile = require('system').args[3].split("/"),
    pathL = currentFile.length,
    _dir = [], i;

for( i = 0; i < pathL; i++){
    if( i <= (pathL-2)){
        _dir.push(currentFile[i]);
    }
}
_dir = _dir.join("/")+"/";


// Initialization of the casperjs and create the first configuration
var casper = require('casper').create({
        clientScripts: [_dir+"../node_modules/jquery/dist/jquery.min.js"]
    }),
    base = 'http://localhost:1337/',
    ajaxurls = {
        links: base+'pages',
        scambNext: base+'sites/scrambNext/',
        resource: base+'resources'
    },
    request = {};

    request.url = casper.cli.args[0];
    request.id = casper.cli.args[1];

// Utilities functions
var _utils = {

    process_links: function( ajax_urls, request ){
        console.log("Process links");

        _jq = $.noConflict(true);

        var links = __utils__.findAll('a');
        return Array.prototype.forEach.call(links, function(link_elem) {

            // Utils for debug

            // console.log(link_elem);
            // console.log(link_elem.hostname);
            // console.log(request.url);
            // console.log(request.url.indexOf(link_elem.hostname));

            if( request.url.indexOf(link_elem.hostname) > -1 ){

              if( typeof link_elem.getAttribute != "undefined" ){

                  var url = link_elem.getAttribute("href");

                  // @ TODO Implement a jquery ajax approach for debug the result
//                  _jq.ajax({
//                      type: 'POST',
//                      url: ajax_urls.links,
//                      data: {path: url, site: request.id},
//                      beforeSend: function(){
//                        console.log("Send trough JQUERY");
//                      },
//                      success: function(msg){
//                          console.log(msg);
//                      }
//                  });
//                  __utils__.sendAJAX(ajax_urls.links, 'POST', {path: url, site: request.id}, false);

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

//        console.log(txt);
    },

    finish: function( ajax_urls, request ){
      __utils__.sendAJAX(ajax_urls.scambNext, 'POST', { site: request.id }, false);
    }

};

// Casperjs data binding
casper.on('remote.message', function(msg) {
//    this.echo('remote message caught: ' + msg);
});
casper.on( 'page.error', function (msg, trace) {
//    this.echo( 'Error: ' + msg, 'ERROR' );
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
//    this.debugPage();
    this.exit();
});

