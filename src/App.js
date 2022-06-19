import React from 'react';
import { connect } from 'react-redux';
import Router from './route';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import './style/mainStyle.scss';

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default connect(() => ({}), {})(App);
