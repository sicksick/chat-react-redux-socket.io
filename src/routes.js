import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Index from './app';
// import { checkLoginRequest } from './actions/auth';
import { setTokenToSocketStateAction } from './actions/socket';

const mapDispatchToProps = dispatch => bindActionCreators({ dispatch }, dispatch);

function mapStateToProps(state) {
  return {
    login: state.auth.login,
    request: state.auth.request
  };
}

const PrivateRoute = ({ component: NewComponent, data, ...rest }) => (
  <Route
    {...rest}
    /* eslint-disable-next-line react/jsx-no-bind */
    render={props => {
      const token = localStorage.getItem('token');

      if (data.login === false && !token) {
        return window.location.replace('/');
      }

      if (data.login === false && token) {
        // TODO need uncomment
        // checkLoginRequest(data.dispatch, token);
      }
      data.dispatch(setTokenToSocketStateAction(token));
      return <NewComponent {...props} />;
    }}
  />
);

class RootRouter extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <PrivateRoute path="" component={Index} data={this.props} />
        </Switch>
      </HashRouter>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootRouter);
