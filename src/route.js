import React from 'react';
import { BrowserRouter as Router,
  Switch,
  Route } from 'react-router-dom';
import HomePage from './components/home';

export default function RouterApp() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
}
