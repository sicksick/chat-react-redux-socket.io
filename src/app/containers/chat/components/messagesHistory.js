import {Component} from "react";
import Grid from "@material-ui/core/Grid/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";
import PropTypes from "prop-types";
import MyMessage from "./myMessage";
import OtherMessage from "./otherMessage";

const styles = theme => ({
    time: {
        marginTop: '6px'
    }
});

@withStyles(styles)
export default class MessagesHistory extends Component {

    static propTypes = {
        activeChat: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        classes: PropTypes.object,
        messages: PropTypes.array.isRequired,
    };

    render() {
        const {classes, messages, activeChat, user} = this.props;

        return (
            <Grid className='MessagesHistory'
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="stretch">
                {messages.map(message => {
                    if (message.user_id === user.id)  {
                        return (<MyMessage key={message.id.toString()} message={message} />)
                    }
                    return (<OtherMessage  key={message.id.toString()} message={message} />)
                })}
            </Grid>
        );
    }
}
