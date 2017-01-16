import React from 'react';
import "./app.less";

//APP主要框架
var App=React.createClass({
  getInitialState(){
    return {
      baby : "oldCow",
    }
  },
  render() {
      return (
       <div className="milk">{this.state.baby}</div>
    );
  }
});

export default App;
