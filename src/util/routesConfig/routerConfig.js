import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from '../formLogin/login'
import Maintodo from '../mainTodo/maintodo'

export default() => (
    <Switch>
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/" component={Login} />
        <Route path="/main" component={Maintodo} />
    </Switch>
)