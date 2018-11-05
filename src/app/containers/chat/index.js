import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import MessageArea from "./components/messageArea"
import Members from "./components/membersMain"
import MessagesHistory from "./components/messagesHistory"
import {setDataAfterAuth} from "../../../actions/socket";
import {connect} from "react-redux";
import {preloaderStartAction, preloaderStopAction} from "../../../actions/common";
import Grid from "@material-ui/core/Grid/Grid";

const io = require('socket.io-client');

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    messagesHistory: {
        borderRight: '1px solid #ddd'
    },
    chat: {
        height: '100%',
    }
});

// TODO make config file and add domain
const SocketEndpoint = 'http://' + document.domain + ':8080';

const mapDispatchToProps = function (dispatch) {
    return {
        setDataAfterAuth: (data) => dispatch(setDataAfterAuth(data)),
        preloaderStartAction: () => dispatch(preloaderStartAction()),
        preloaderStopAction: () => dispatch(preloaderStopAction())
    };
};

function mapStateToProps(state) {
    return state.socket;
}

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(styles)
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isConnected: false,
            messages: [],
            activeChat: {},
            members: [],
            participatedChat: []
        };
    }

    componentWillMount() {
        this.props.preloaderStartAction();
    }

    componentDidMount() {
        let token = localStorage.getItem('token');
        const socket = io(SocketEndpoint, {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        'Authorization': token
                    }
                }
            }
        });

        socket.on('connect', () => console.log('connect') );

        socket.on('auth', (data) => {
            console.log('auth', data.data);
            this.props.setDataAfterAuth(data.data);
            this.setState({socket: socket, isConnected: true});
            if (this.state.isConnected === true && this.state.socket) {
                this.props.preloaderStopAction();
            }
            // this.state.socket.emit('my event')
        });

        socket.on('chat:participated', (data) => {
            console.log('chat:participated', data.data);
            this.setState({
                participatedChat: data.data,
            });
        });

        socket.on('user:online', (data) => {
            console.log('user:online', data.data);
            this.setState({members: data.data});
        });

        socket.on('chat:message:history', (data) => {
            console.log('chat:message:history', data.data);
            this.setState({
                messages: data.data.messages,
                activeChat: data.data.chat
            });
        });
    }

    componentWillUnmount () {
        this.setState({
            socket: null,
            isConnected: false
        });
    }

    render() {
        const classes = this.props.classes;

        return (
            <Grid className={`Chat  ${classes.chat}`} container spacing={24}
                  direction="row"
                  justify="flex-start"
                  alignItems="stretch"
            >
                <Grid item xs={8} className={classes.messagesHistory}>
                    <MessagesHistory messages={this.state.messages} activeChat={this.state.chat}/>
                </Grid>
                <Grid item xs={4}>
                    <Members membersOnline={this.state.members} participatedChat={this.state.participatedChat} />
                </Grid>
                {this.state.isConnected === true && this.state.socket ? <MessageArea chactiveChatat={this.state.chat}/> : ''}
            </Grid>
        );
    }
}
