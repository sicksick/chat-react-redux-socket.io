import React, {Component} from 'react';
import Grid from "@material-ui/core/es/Grid/Grid";
import withStyles from "@material-ui/core/es/styles/withStyles";
import MessageArea from "../../components/messageArea"
import Members from "../../components/members"
import MessagesHistory from "../../components/messagesHistory"

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

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }
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
                        <MessagesHistory />
                    </Grid>
                    <Grid item xs={4} >
                        <Members />
                    </Grid>
                    <MessageArea />
                </Grid>
        );
    }
}

export default withStyles(styles)(Chat);
