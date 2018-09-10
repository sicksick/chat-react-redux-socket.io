import {Component} from "react";
import Grid from "@material-ui/core/es/Grid/Grid";
import withStyles from "@material-ui/core/es/styles/withStyles";
import React from "react";
import Paper from "@material-ui/core/Paper/Paper";

const styles = theme => ({

});

class MessagesHistory extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const classes = this.props.classes;

        return (
            <Grid className='MessagesHistory'
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="stretch">
                MESSAGES HISTORY

            </Grid>
        );
    }
}

export default withStyles(styles)(MessagesHistory);