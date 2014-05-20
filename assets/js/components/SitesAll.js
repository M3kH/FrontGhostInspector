define(function(require){
  "use strict";

  var $ = require("jquery"),
      _ = require("underscore"),
      Backbone = require("backbone"),
      tpl = require("rv!/templates/sites.html"),
      Ractive = require("ractive"),
      a;

      require('js/libs/ractive-adapter');

      return Ractive.extend({

        el: '.main',

        template : tpl,

        init: function( options ){
          var self = this;

          this.on("change", this.change);
        },

        complete: function(){
          var self = this,
              editor;

          CKEDITOR.config.fullPage = true;
          CKEDITOR.config.allowedContent = true;

          editor = CKEDITOR.replace( 'wysiwyg', {height: "800px"} );
          editor.on('change', function() { self.set("template.body_html", this.getData()); });

          self.set("editor", editor);
        },

        change: function(){
          var self = this;

          // Auto save after a second after the change.
          clearTimeout(a);
          a = setTimeout(function(){
             var model = self.get('template');
                 model.save(model.attributes, {silent: true});
          }, 1000);

        },

        // sadly this is necessary for IE - other browsers fire the change event
        // when you hit enter
        eventDefinitions: {
          enter: function ( node, fire ) {
            var keydownHandler = function ( event ) {
              var which = event.which || event.keyCode;
              which === 13 && fire({ node: node, original: event });
            };

            node.addEventListener( 'keydown', keydownHandler );

            return {
              teardown: function () {
                node.removeEventListener( 'keydown', keydownHandler );
              }
            };
          }
        },

        adaptors: [ 'Backbone' ]

      });

});
