/**
 * SitesController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var process = require('child_process');

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
      console.log(__dirname);
      var url = req.param('site');

      console.log(url);

      if(url){

          var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
          var domain = matches && matches[1];

          Sites.find().
          where({
            url:{
              'like': '%'+domain
            }
          }).exec(function(err,data){

            console.log(data);

            var ls = process.spawn('casperjs', [ '--web-security=no', __dirname+'/../../worker/Ghost.js', url, data.id ]);

            ls.stdout.on('data', function (data) {
                console.log('stdout: ' + data);
            });

            ls.stderr.on('data', function (data) {
                console.log('stderr: ' + data);
            });

            ls.on('close', function (code) {
                console.log('child process exited with code ' + code);
            });

          });



      }

      return res.redirect('/Sites/all');
  }

};
