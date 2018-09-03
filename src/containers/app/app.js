import React, {Component} from 'react';
import './App.sass';
import Header from '../header/header';
import { Route } from "react-router-dom";
import Chat from "../chat/chat";
import Home from "../home/home";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    render() {
        return (
            <div className="App">
                <Header match={this.props.match} history={this.props.history}/>
                <Route exact path={`${this.props.match.path}`} component={Home}/>
                <Route path={`${this.props.match.path}chat`} component={Chat}/>
            </div>
        );
    }
}

export default App;
