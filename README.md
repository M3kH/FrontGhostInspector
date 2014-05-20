# Front Ghost Inspector

A [Sails](http://sailsjs.org) application with a [CasperJS](http://casperjs.readthedocs.org/) worker for research for the javascript usage in a website.

## Installation

Clone repo and install dependencies
```
git@github.com:M3kH/FrontGhostInspector.git && cd FrontGhostInspector && npm install && bower install;

```
Then you have to setup your database in my case I choose to use postgres, so if you want continue with it you have to create a db (suggested: *ghost-db*) and change the connection settings into **config/connections.js**
If you prefer use other db just look into the [Sails](http://sailsjs.org) documentation to see how to implement your own data adapter.

Remember to change even into config/models.js

## Know issues
- **React and Backbone adapter are not working**: this is caused for a small bug into a dependencies.
  go to assets/components/ractive-backbone/Ractive-Backbone.js and change:
  ``` require( 'Ractive' ), require( 'Backbone' ) ``` => ``` require( 'ractive' ), require( 'backbone' ) ```