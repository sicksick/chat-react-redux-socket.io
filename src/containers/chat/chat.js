import React, {Component} from 'react';
import Grid from "@material-ui/core/es/Grid/Grid";
import withStyles from "@material-ui/core/es/styles/withStyles";
import MessageArea from "../../components/messageArea"
import Members from "../../components/members"
import MessagesHistory from "../../components/messagesHistory"
import {setDataAfterAuth} from "../../actions/socket";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {preloaderStartAction, preloaderStopAction} from "../../actions/common";
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
            isConnected: false
        };

    }

    componentWillMount() {
        this.props.preloaderStartAction();
    }

    componentWillUnmount() {
        this.setState({
            isConnected: false,
            socket: null
        });
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
            this.setState({ isConnected: true });
            this.props.setDataAfterAuth(data.data);
            this.setState({socket: socket});
        });

        socket.on('ping', data => {
            this.setState(data);
        });
    }

    render() {
        const classes = this.props.classes;

        if (this.state.isConnected === true && this.state.socket) {
            this.props.preloaderStopAction();
        }

        return (
                <Grid className={`Chat  ${classes.chat}`} container spacing={24}
                      direction="row"
                      justify="flex-start"
                      alignItems="stretch"
                >
                    <Grid item xs={8} className={classes.messagesHistory}>
                        {this.state.isConnected === true && this.state.socket ? <MessagesHistory socket={this.state.socket}/> : ''}
                    </Grid>
                    <Grid item xs={4} >
                        {this.state.isConnected === true && this.state.socket ? <Members /> : ''}
                    </Grid>
                    {this.state.isConnected === true && this.state.socket ? <MessageArea /> : ''}
                </Grid>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Chat));
