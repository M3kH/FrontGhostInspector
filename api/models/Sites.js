/**
* Sites.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

      name: {
        type: "STRING",
        required: true,
        unique: true,
        defaultsTo: ""
      },

      url: {
        type: "STRING",
        required: true,
        unique: true,
        defaultsTo: ""
      },

      is_processing: function(){
          var res;

          var _res = Pages.find({site: this.id, processed: false}).exec(function(err, data){

              res = "false";
              if(data.length > 0) res = "true";

              console.log(res);

              return res;
          });

          console.log(_res);
          return _res;
      }

  }
};

