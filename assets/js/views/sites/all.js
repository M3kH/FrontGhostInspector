define(function(require){
    "use strict";

    var $ = require('jquery'),
        Model = require('js/models/site'),
        View = require('js/components/SitesAll'),
        m;

    return function(){

        var m = new Model({id: id});
        var v = new View({
            data:{
                template: m
            },
            adaptors: [ 'Backbone' ]
        });

        v.on({
            'bgchange': function( color ){
                var editor = v.get("editor");
                console.log(color);
                // console.log(editor);
                editor.document.getBody().setStyles({backgroundColor: color});

                // editor.addCss( 'body { background-color: '+color+'; }' );
                // $(editor.document.$).find('body').css({backgroundColor: color});
                console.log(editor.document.$.body);
            }
        });
    };
});
