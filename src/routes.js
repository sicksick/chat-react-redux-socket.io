import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './containers/app/app';
import {checkLoginRequest} from "./actions/auth";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";

const mapDispatchToProps = function (dispatch) {
    return bindActionCreators({dispatch}, dispatch)
};

function mapStateToProps(state) {
    return {
        login: state.auth.login,
        request: state.auth.request
    }
}

const PrivateRoute = ({component: Component, data: data, ...rest}) => {

    return (
        <Route
            {...rest}
            render={function (props) {
                let token = localStorage.getItem('token');

                if (data.login === false && !token) {
                    return (window.location.replace('/'));
                }

                if (data.login === false && token) {
                    checkLoginRequest(data.dispatch, token);
                }

                return (<Component {...props} />)
            }}
        />
    )
};


class RootRouter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HashRouter>
                <Switch>
                    <PrivateRoute path='' component={App} data={this.props}/>
                </Switch>
            </HashRouter>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootRouter);