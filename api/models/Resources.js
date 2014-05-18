/**
* Resources.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  adapter: 'postgresGhostDB',
  migrate: 'alter',

  attributes: {

      type : "STRING",

      page :{
        model: 'pages'
      },

      content: 'TEXT'

  }

};
