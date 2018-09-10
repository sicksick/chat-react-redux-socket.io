import {Component} from "react";
import Grid from "@material-ui/core/es/Grid/Grid";
import withStyles from "@material-ui/core/es/styles/withStyles";
import React from "react";

const styles = theme => ({

});

class Members extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const classes = this.props.classes;

        return (
            <Grid className={`Members`}
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="stretch">
                MEMBERS
            </Grid>
        );
    }
}

export default withStyles(styles)(Members);