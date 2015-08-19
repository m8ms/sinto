var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var Admin = require('./view/subpages/admin');
var Year = require('./view/subpages/year');
var Week = require('./view/subpages/week');

var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render () {
    return (
      <div>
        <h1>App</h1>
        <RouteHandler/>
      </div>
    )
  }
});

// declare our routes and their hierarchy
var routes = (
  <Route handler={App}>
    <Route path="week" handler={Week}/>
    <Route path="year" handler={Year}/>
    <Route path="admin" handler={Admin}/>
  </Route>
);

Router.run(routes, Router.HashLocation, function(Root){
  React.render(
    <Root/>, 
    document.getElementById('content')
  );
});
