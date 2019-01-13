import React, { Fragment } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Switch, Route} from 'react-router-dom';
import SiderLayout from './Components/SiderLayout';
import StartPage from './Components/StartPage';
import SignUpPage from './Components/SignUpPage';
import LoginPage from './Components/LoginPage';
import ForgotPassword from './Components/ForgotPassword';

function RouterConfig({ history }) {
    return (
      <Fragment>
    
          <ConnectedRouter history={history}>
            <Switch>
               
                <Route  path="/start"  component={StartPage} />
                <Route  exact path="/SignUP" component={SignUpPage}/>
                <Route  exact path="/Login" component={LoginPage}/>
                <Route  exact path="/ForgotPassword" component={ForgotPassword}/>
                <Route  path="/"  component={SiderLayout} />
               
            </Switch>
          </ConnectedRouter>
  
      </Fragment>
    );
  }
  
  export default RouterConfig;
  
