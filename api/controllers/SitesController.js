/**
 * SitesController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var process = require('child_process'),
    u = {
        _casper_exec: function( url, id, page ){
            // Make sure is not an obj req
            if(typeof url != 'string') return '';
            return process.spawn('casperjs', [ '--web-security=no', __dirname+'/../../worker/Ghost.js', url, id, page ]);
        }
    };



module.exports = {

  /**
   * `SitesController.inspectUrl`
   */

  inspectUrl: function (req, res) {
    return res.json({
      todo: 'Not implemented yet!'
    });
  },

  all: function (req, res) {
    return Sites.find().exec(function(err, data){
//        console.log(err);
//        console.log(data);
      return res.view({sites: data});
    });
  },

  single: function (req, res) {

    // Ok this could be wired
    // @TODO Try to figurate a better pattern maybe with 'promise'

    return Sites.findOne(req.param('id')).exec(function(err, _site){

        return Pages.find({site:req.param('id')}).populate('site').exec(function(err, _pages){

            var _pagesId = _pages.map(function(page){ return page.id; });

            return Resources.find({page: _pagesId}).populate('page').exec(function(err, _resources){

                var __pages = _pages.map(function(page){
                    var i, rl = _resources.length;
                    page.resources = [];

                    for( i=0; i < rl; i++ ){
                       if( _resources[ i ].page == page.id ) page.resources.push( _resources[ i ] );
                    }

                    return page;
                });

                return res.view({site: _site, pages: __pages });
            });
        });
    });
  },

  scramb: function(req, res) {

      var that = this,
          id = req.param('site');


      if(id){

          Sites.findOne({id: id}).exec(function(err,data){


            if( !err && typeof data.url != "undefined" ){

                Pages.destroy({site: id}).exec(function(err, _pages){

                    var _pagesArr = _pages.map(function(_page){return _page.id;});
                    Resources.destroy({page: _pagesArr}).exec(function(err, _resources) {
                        // do something
                    });
                });
                Pages.create({path : '', site: data.id, processed: true}).exec(function(err, page){

                    var casper = u._casper_exec( data.url, data.id, page.id );

                    // This is a good model for catch the events of the process
                    casper.stdout.on('data', function (data) {
                        console.log('stdout: ' + data);
                    });

                    casper.stderr.on('data', function (data) {
                        console.log('stderr: ' + data);
                    });

                    casper.on('close', function (code) {
                        console.log('child process exited with code ' + code);
                    });

                });

            }

          });


      }

      return res.redirect('/Sites/all');
  },

  scrambNext: function(req, res) {
      var that = this,
          site = req.param('site');

      if(site){

          // var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
          // var domain = matches && matches[1];

          Pages.findOne({
            processed: false,
            site: site
          })
          .populate('site')
          .exec(function(err,data){


            var url = ( typeof data != "undefined" && typeof data.full_url != "undefined") ? data.full_url() : false;

            if( !err && url ){
//                console.log(url);

                // @TODO this is twiced called
                Pages.update({id: data.id}, {processed: true}).exec(function(err, pages){});

                var casper = u._casper_exec( url, data.site.id, data.id );

                casper.stdout.on('data', function (data) {
                    console.log('stdout: ' + data);
                });

                casper.stderr.on('data', function (data) {
                    console.log('stderr: ' + data);
                });

                casper.on('close', function (code) {
                    console.log('child process exited with code ' + code);
                });
            }


          });



      }

      return res.redirect('/Sites/all');
  }

};
