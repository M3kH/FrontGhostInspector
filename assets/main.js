/*
 * Author: Mauro Mandracchia - info@ideabile.com
 * All Right Reserved - 2014
 * Please contact the author before the usage of this code.
 */
	var c = {
		baseUrl: "",
		urlArgs: "bust=" +  (new Date()).getTime(),
		paths: {

			"jquery": "components/jquery/dist/jquery.min",

            "moment": "components/moment/moment",

			"bootstrap": "components/bootstrap/dist/js/bootstrap.min",
			"selectize": "components/selectize/dist/js/standalone/selectize.min",
			"datepicker": "components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min",
			"multiselect": "components/bootstrap-multiselect/js/bootstrap-multiselect",

			"underscore": "components/underscore/underscore",
			"backbone": "components/backbone/backbone",

			"ractive": "components/ractive/ractive",

			"text": 'components/requirejs-plugins/lib/text',
			"amd-loader": 'components/requirejs-ractive/amd-loader',

			"ractive-backbone": "components/ractive-backbone/Ractive-Backbone",
			"rv": 'components/requirejs-ractive/rv',
			"rvc": 'components/requirejs-ractive/rvc',

            "io": 'js/libs/sails.io'
		},

		shim: {
			'ractive': {
				exports: 'Ractive'
			},
			'underscore': {
				exports: '_'
			},
			'backbone': {
				deps: ['jquery', 'underscore'],
				exports: "Backbone"
			},
			'bootstrap': {
				deps: ['jquery']
			},
			'datepicker': {
				deps: ['jquery', 'moment', 'bootstrap']
			},
			'multiselect': {
				deps: ['jquery', 'bootstrap']
			},
			'selectize': {
				deps: ['jquery']
			}
		}
	};

	require.config(c);
	require(["global", "js/app"], function(global, app){
		app.init(global);
	});