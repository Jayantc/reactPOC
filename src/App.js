import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import Layout from './hoc/Layout/Layout'
import product from './containers/product/product'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './Store/actions/index'

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup()
  }

  render() {
    let routes=(
      <Switch>
        <Route path='/auth' exact component={Auth} />
        <Route path='/' exact component={product} />
        <Redirect to='/' />
      </Switch>
    )

    if(this.props.isAuthenticated){
      routes=(
        <Switch>
            <Route path='/' exact component={product} />
            <Route path='/orders' exact component={Orders} />
            <Route path='/logout' exact component={Logout} />
            <Route path='/auth' exact component={Auth} />
            <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps= state=>{
  return{
    isAuthenticated: state.auth.token != null
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    onTryAutoSignup: ()=> dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
