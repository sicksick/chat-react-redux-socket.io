import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import MessageArea from "./components/messageArea"
import MembersMain from "./components/membersMain"
import MessagesHistory from "./components/messagesHistory"
import {changeChat, createChat, setDataAfterAuth} from "../../../actions/socket";
import {connect} from "react-redux";
import {preloaderStartAction, preloaderStopAction} from "../../../actions/common";
import Grid from "@material-ui/core/Grid/Grid";
import PropTypes, {bool, string} from 'prop-types';

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
        preloaderStopAction: () => dispatch(preloaderStopAction()),
        changeChat: (data) => dispatch(changeChat(data)),
        createChat: (data) => dispatch(createChat(data))
    };
};

function mapStateToProps(state) {
    return state.socket;
}

@connect(mapStateToProps, mapDispatchToProps)
@withStyles(styles)
export default class Index extends Component {
    state = {
        name: '',
        isConnected: false,
        messages: [],
        activeChat: {},
        members: [],
        participatedChat: [],
        activeChatId: null
    };


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

        socket.on('connect', () => console.log('connect'));

        socket.on('auth', (data) => {
            console.log('auth', data.data);
            this.setState({socket: socket, isConnected: true});
            if (this.state.isConnected === true && this.state.socket) {
                data.data.socket = socket;
                this.props.setDataAfterAuth(data.data);
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

        socket.on('user:all', (data) => {
            console.log('user:all', data.data);
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

    createNewChat = users => {
        console.log(users);
        this.props.createChat(users)
    };

    onChangeChat = chat => {
        if (chat.active === true) {
            return
        }
        this.setState({
            activeChatId: chat.chat_id,
        });
        this.props.changeChat(chat.chat_id);
    };

    componentWillUnmount() {
        this.setState({
            socket: null,
            isConnected: false
        });
    }

    render() {
        const classes = this.props.classes;

        return (
            <Grid className={`Chat  ${classes.chat}`}
                  container
                  spacing={24}
                  direction="row"
                  justify="flex-start"
                  alignItems="stretch"
            >
                <Grid item xs={9} className={classes.messagesHistory}>
                    <MessagesHistory
                        messages={this.state.messages}
                        activeChat={this.state.activeChat}
                        user={this.props.user}
                    />
                </Grid>
                <Grid item xs={3}>
                    <MembersMain createNewChat={this.createNewChat}
                                 members={this.state.members}
                                 activeChat={this.state.activeChat}
                                 participatedChat={this.state.participatedChat}
                                 onChangeChat={this.onChangeChat}
                    />
                </Grid>
                {this.state.isConnected === true && this.state.socket ?
                    <MessageArea chactiveChatat={this.state.chat}/> : ''}
            </Grid>
        );
    }
}
