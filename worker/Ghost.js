
// Get the current directory - START
var currentFile = require('system').args[3].split("/"),
    pathL = currentFile.length,
    _dir = [], i;

for( i = 0; i < pathL; i++){
    if( i <= (pathL-2)){
        _dir.push(currentFile[i]);
    }
}
_dir = _dir.join("/")+"/";
// Get the current directory - END


// Initialization of the casperjs and create the first configuration
var casper = require('casper').create({
        clientScripts: [_dir+"../node_modules/jquery/dist/jquery.min.js"]
    }),

    _page = casper,

    // Required resources
    _utils = require(_dir+'evaluating_utils.js')._utils,
    helpers = require(_dir+'helpers.js'),

    // This are shortcut for the
    base = 'http://localhost:1337/',

    ajaxurls = {
        links: base+'pages/',
        scambNext: base+'sites/scrambNext/',
        resource: base+'resources/'
    },

    request = {};

    // This are the parameters
    request.url = casper.cli.args[0];
    request.id = casper.cli.args[1];
    request.page = casper.cli.args[2];



// Casperjs data binding
casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
});
casper.on( 'page.error', function (msg, trace) {
    this.echo( 'Error: ' + msg, 'ERROR' );
});


// This are needed for get the right informations inside
// when page start
casper.on('load.started', function() {
    this.startTime = new Date();
});

// when resource start
casper.on('resource.requested', function(req) {
    this.resources[req.id] = {
        request: req,
        startReply: null,
        endReply: null
    };
});

// when resource received
casper.on('resource.received', function(res) {
    if (res.stage === 'start') {
        this.resources[res.id].startReply = res;
    }
    if (res.stage === 'end') {
        this.resources[res.id].endReply = res;
    }
});



//console.log( casper.cli.args );


//casper.start(request.url).then(function(){
//
//    this.evaluate(_utils.process_links, {ajaxurls: ajaxurls, request: request});
//    this.evaluate(_utils.process_scripts, {ajaxurls: ajaxurls, request: request});
//    this.evaluate(_utils.finish, {ajaxurls: ajaxurls, request: request});
//
//});

casper.start('about:blank', function(){
    _page.resources = [];

    casper.open(request.url).then(function(){

        _page.title = casper.evaluate(function() {
            return document.title.replace(/\s+/g, "");
        });
        _page.endTime = new Date();

        // This get the
        var har = helpers.createHAR(casper.getCurrentUrl(), _page.title, casper.startTime, _page.resources),
            status = this.status().currentHTTPStatus;

//        console.log(ajaxurls.links+request.page);

        casper.capture('assets/screenshot/' + request.page +'.png');


        this.evaluate(_utils.page_analytics, {ajaxurls: ajaxurls, request: request, har: JSON.stringify(har), status: status});

        this.evaluate(_utils.process_links, {ajaxurls: ajaxurls, request: request});
        this.evaluate(_utils.process_scripts, {ajaxurls: ajaxurls, request: request});
        this.evaluate(_utils.finish, {ajaxurls: ajaxurls, request: request});
    });

});

casper.run(function() {
//    this.debugPage();
    this.exit();
});