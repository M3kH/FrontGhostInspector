/**
* Pages.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  migrate: 'alter',
  attributes: {

      path : 'STRING',

      processed: {
        type: 'BOOLEAN',
        defaultsTo: false
      },

      site :{
        model: 'sites'
      },

      full_url: function(){

          if( typeof this.site == "undefined" ) return false;

          var path = this.path,
              url = this.site.url;

              // Check Slash
              path_cs = path.indexOf("/"),
              url_cs = url.lastIndexOf("/");

          if( url.indexOf("http://") > -1 ) return path;
          if( path_cs > -1 && url_cs > -1 ) return url+path.substring(1);
          return ( path_cs > -1 || url_cs > -1 ) ? site.url + path : url + "/" + path;
      }
  }

};

