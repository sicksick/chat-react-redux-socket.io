import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import MessageArea from "../../components/messageArea"
import Members from "../../components/members"
import MessagesHistory from "../../components/messagesHistory"
import {setDataAfterAuth} from "../../actions/socket";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {preloaderStartAction, preloaderStopAction} from "../../actions/common";
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

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isConnected: false,
            messagesHistory: [],
            members: []
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

        socket.on('connect', () => {});

        socket.on('auth', (data) => {
            this.props.setDataAfterAuth(data.data);
            this.setState({socket: socket, isConnected: true});
            if (this.state.isConnected === true && this.state.socket) {
                this.props.preloaderStopAction();
            }
            // this.state.socket.emit('my event')
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
                    <MessagesHistory messagesHistory={this.state.messagesHistory}/>
                </Grid>
                <Grid item xs={4}>
                    <Members members={this.state.members}/>
                </Grid>
                {this.state.isConnected === true && this.state.socket ? <MessageArea/> : ''}
            </Grid>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Chat));
