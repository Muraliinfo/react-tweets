/** @jsx React.DOM */

var React = require('react');

console.log("loaderrrrrrrrrrrrrrrrr", this.props);
module.exports = Loader = React.createClass({
  render: function(){
    return (
      <div className={"loader " + (this.props.paging ? "active" : "")}>
        <img src="svg/loader.svg" />
      </div>
    )
  }
});