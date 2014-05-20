define(function(require){
  "use strict";

  var $ = require("jquery"),
      _ = require("underscore"),
      Backbone = require("backbone");

  return Backbone.Model.extend({
    urlRoot: "/sites/",

    initialize: function(opts){

      this.on({"change:user" : this.set_user});

      if(typeof opts.id != "undefined"){
        this.fetch();
      }

    },

    defaults: {
      id: 0,
      name: "",
      url: ""
    },

    idAttribute: "id"

  });


});
