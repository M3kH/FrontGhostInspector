/**
 * PagesController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

    /*
        desc: Overwriting the classical create for do a manual checking in the duplicates.
        author: Mauro Mandracchia
     */
    create: function( req, res ){

       var _path = req.param('path').trim() || false,
           _site = req.param('site') || false,
           _processed = req.param('processed') || false;

        Sites.find(_site).exec(function(err, site){

            if( !_path ) return res.json(409, {error: 'Not valid path'});
            if( _path.indexOf("#") == 0 ) return res.json(409, {error: 'This is a local url'});
            if( _path.indexOf("mailto:") == 0 ) return res.json(409, {error: 'This is a mail'});
            if( _path.indexOf("http://") > -1 && _path.indexOf(site.url) == -1 ) return res.json(409, {error: 'No remote link are accepted'});

            // @TODO: This record is filled in the database everytime. Try to figurate a better checker.
            if( _path == "/" ) return res.json(409, {error: 'No remote link are accepted'});

            if(_path && _site){
                return Pages.find({path:_path, site:_site}).exec(function(err, data){


                    if(err) return res.serverError(err);
                    if(data.length > 0) return res.json(409, {error: 'The path already exists'});

                    return Pages.create({
                        site: _site,
                        path: _path,
                        processed: _processed
                    }).exec( function(err, data){
                        return res.json(404, {msg: 'User create', data: data});
                    });
                });
            }
            return res.json(409, {error: 'Path and Site are both required.'});
        });
    },

    // @TODO: This should get all the javascript file of the page
    getJSDetails: function( req, res ){

    },

    getHar: function( req, res ){
        var id = req.param('id');

        if(id.indexOf('&') > -1 ) id = id.split('&')[0];

        return Pages.findOne( id ).exec(function(err, page){
            if(!page) return res.jsonp(500, { error: 'Item not found' });
            return res.jsonp(200, JSON.parse(page.har)) ;
        });
    }

};
