define(function(require){
    "use strict";

    var $ = require('jquery'),
        bootstrap = require('bootstrap');
//        Model = require('js/models/site'),
//        View = require('js/components/SitesAll'),
//        m;

    var _u = {
        submit_form: function(){
            var form = $('.ref-form-addWebsite'),
                title = form.find('#title').val() || false,
                url = form.find('#url').val() || false;

            console.log(form);
            console.log(title);
            console.log(url);

            if( !title || !url || title.length <= 0 || url.indexOf("http://") <= -1 ) return false;

            $.ajax({
               url: '/sites/',
               type: 'POST',
               data: {name: title, url: url},
               success: function( msg ){
                   $('#addWebsite').modal('hide');
                   window.location.reload();
               },
               error: function( msg ){

               }
            });

            form[0].reset();

        }
    };

    return function(){


        $('#addWebsite').on("shown.bs.modal", function(e){
            $(this).find("#title").focus();
        });

        $('#addWebsite').on("hidden.bs.modal", function(e){
            $('.ref-form-addWebsite')[0].reset();
        });

        $('.ev-addWebsite-save').on("click",function(e){
            _u.submit_form();
        });

        $('.ref-form-addWebsite').on("click",function(e){
            _u.submit_form();
        });




//        var m = new Model({id: id});
//        var v = new View({
//            data:{
//                template: m
//            },
//            adaptors: [ 'Backbone' ]
//        });
//
//        v.on({
//            'bgchange': function( color ){
//                var editor = v.get("editor");
//                console.log(color);
//                // console.log(editor);
//                editor.document.getBody().setStyles({backgroundColor: color});
//
//                // editor.addCss( 'body { background-color: '+color+'; }' );
//                // $(editor.document.$).find('body').css({backgroundColor: color});
//                console.log(editor.document.$.body);
//            }
//        });
    };

});
