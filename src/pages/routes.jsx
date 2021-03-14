import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Portfolio } from 'views/Sections'
import LandingPage from './LandingPage'

const routes = [
  {
    path: '/',
    isExact: true,
    Component: LandingPage,
  },
  {
    path: '/portfolio/:id',
    isExact: false,
    Component: Portfolio,
  },
]

const Routes = (props) => {
  return (
    <Switch>
      {routes.map(({ path, isExact, Component }) => (
        <Route
          key={path}
          path={path}
          exact={isExact}
          render={() => <Component {...props} />}
        />
      ))}
    </Switch>
  )
}

export default Routes
