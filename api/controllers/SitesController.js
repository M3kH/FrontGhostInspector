/**
 * SitesController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var process = require('child_process'),
    u = {
        _casper_exec: function( url, id ){
            // Make sure is not an obj req
            if(typeof url != 'string') return '';
            return process.spawn('casperjs', [ '--web-security=no', __dirname+'/../../worker/Ghost.js', url, id ]);
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
        console.log(err);
        console.log(data);
      return res.view({sites: data});
    });
  },

  scramb: function(req, res) {

      var that = this,
          id = req.param('site');


      if(id){

          Sites.findOne({id: id}).exec(function(err,data){


            if( !err && typeof data.url != "undefined" ){

                var casper = u._casper_exec( data.url, data.id );

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
            var url = (typeof data.full_url != "undefined") ? data.full_url() : false;
            if( !err && url ){
                Pages.update({id: data.id}, {processed: true}).exec();
                var casper = u._casper_exec( data.full_url(), data.id );

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
