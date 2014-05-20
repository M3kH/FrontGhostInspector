define([
    "jquery",
    "backbone",
    "io"
],

    function ( config, $, Backbone, io ) {

        //Will be the value 'blue'
        var app = {

            init: function(global){
                if(typeof global.view != "undefined" && global.view != ''){

                    // This load the correct view of the page
                    require(["js/"+global.view], function(instance_view){
                       instance_view();
                    });
                }
            }
        };

        return app;
    });
