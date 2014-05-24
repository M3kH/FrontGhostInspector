/**
 * ResourcesController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	website: function(req, res){
        return Pages.find({site: req.param("id")}).exec(function(err, _pages){
            var ___pages = _.map(_pages, function(__page){
                if(__page.id) return __page.id;
            });

            return Resources.find().where({page: ___pages}).exec(function(err, _resources){
                return res.json(_resources);
            })
        });
    }
};