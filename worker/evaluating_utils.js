// Utilities functions
var _utils = {

    process_links: function( ajax_urls, request ){
        console.log("Process links");

        _jq = $.noConflict(true);

        var links = __utils__.findAll('a');
        return Array.prototype.forEach.call(links, function(link_elem) {

            // Utils for debug

            // console.log(link_elem);
            // console.log(link_elem.hostname);
            // console.log(request.url);
            // console.log(request.url.indexOf(link_elem.hostname));

            if( request.url.indexOf(link_elem.hostname) > -1 ){

                if( typeof link_elem.getAttribute != "undefined" ){

                    var url = link_elem.getAttribute("href");

                    // @ TODO Implement a jquery ajax approach for debug the result
//                  _jq.ajax({
//                      type: 'POST',
//                      url: ajax_urls.links,
//                      data: {path: url, site: request.id},
//                      beforeSend: function(){
//                        console.log("Send trough JQUERY");
//                      },
//                      success: function(msg){
//                          console.log(msg);
//                      }
//                  });

                    __utils__.sendAJAX(ajax_urls.links, 'POST', {path: url, site: request.id}, false);

                }

            }

        });
    },

    process_scripts: function( ajax_urls, request ){



        var script = document.getElementsByTagName('script');
        var txt = '';

        for( var z in script ){
            var msg = {},
                _script = script[z]
                src = _script.getAttribute("src");

            msg.type = 'js';
            msg.content = _script.outerHTML;
            msg.page = request.page;
            msg.is_linked = src ? true : false;
            if( msg.is_linked ) msg.link = src;


            __utils__.sendAJAX(ajax_urls.resource, 'POST', msg, false);

            if( typeof script[z].outerHTML != "undefined"){
                txt += script[z].outerHTML+"\n";
            }else{
                txt += script[z]+"\n";
            }
        }

    },

    page_analytics: function( ajax_urls, request, har, status ){
        __utils__.sendAJAX(ajax_urls.links+"update/"+request.page, 'POST', {har: har, status: status }, false);
    },

    finish: function( ajax_urls, request ){
        __utils__.sendAJAX(ajax_urls.scambNext, 'POST', { site: request.id }, false);
    }

};

exports._utils =  _utils;