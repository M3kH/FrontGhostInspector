/**
* Resources.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var http = require('http');

module.exports = {

  migrate: 'alter',

  attributes: {

      type : "STRING",

      page :{
        model: 'pages'
      },

      content: 'TEXT',

      is_linked: 'BOOLEAN',

      link: "STRING",

      get_attributes: function(){
       if(this.type !== 'js') return false;
       var result = this.content.match(/^<(\w+)((?:\s+\w+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/);

       return _.map(result, function(_result, key){
           var _attrs;
//           console.log("-------");
//           console.log(key);
//           console.log(_result);
//           console.log("-------");
           if( key == 2) _attrs = _result.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g);
//           console.log("---ATTRS---");
//           console.log(_attrs);
//           console.log("-------");
           if(_attrs) return _attrs.slice(1)[0];

           return false;
       });

      },

      is_file: function(){
        var res = false;
          console.log(this.get_attributes());
          _.each(this.get_attributes(), function( attribute ){
              if( typeof attribute == "string" && attribute.indexOf('src') > -1 ) res = attribute;
          });

          return res;
      },

      get_url: function(){

          var r = this.is_file();

          if (r) return r.match(/"(.*?)"/);
          return false;

      },

      get_content: function(){
          if(!this.is_file()){
            return this.content.match(/<script[^>]*>(.*)<\/script>/i);
          }else{

          }
      }

  }

};
