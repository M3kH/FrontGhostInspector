define(function(require){
    "use strict";
//
//    var HarViewer = require('http://localhost:1337/js/libs/harviewer/harViewer.js');
//    console.log(HarViewer);

    var $ = require('jquery'),
        bootstrap = require('bootstrap');

    require('selectize');

    return function(){

//        var har = document.createElement("script");
//        har.src = "http://www.softwareishard.com/har/viewer/har.js";
//        har.setAttribute("id", "har");
//        har.setAttribute("async", "true");
//        document.documentElement.firstChild.appendChild(har);

        $.ajax({
            url: '/resources/website',
            type: 'GET',
            dataType: 'json',
            valueField: 'content',
            labelField: 'content',
            searchField: 'content',
            data: {
                id: 3
            },
            error: function() {
                callback();
            },
            success: function(res) {

                $('.selectize').selectize({
                    dataType: 'json',
                    valueField: 'id',
                    labelField: 'content',
                    searchField: 'content',
                    options: res
                });
            }
        });

    };

});
