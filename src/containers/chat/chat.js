import React, {Component} from 'react';
import Grid from "@material-ui/core/es/Grid/Grid";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Paper from "@material-ui/core/Paper/Paper";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    chatMessages: {

    },
    chat: {
        height: '100%'
    }
});

class Chat extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const classes = this.props.classes;

        return (
                <Grid className={`Chat  ${classes.chat}`} container spacing={24}
                      direction="row"
                      justify="flex-start"
                      alignItems="stretch"
                >
                    <Grid item
                          xs={8}

                          className={classes.chatMessages}
                    >
                        <Paper className={classes.paper}>xs=12</Paper>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        className={classes.chatMessages}
                    >
                        <Paper className={classes.paper}>xs=5</Paper>
                    </Grid>
                </Grid>
        );
    }
}

export default withStyles(styles)(Chat);
