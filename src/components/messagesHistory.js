import {Component} from "react";
import Grid from "@material-ui/core/es/Grid/Grid";
import withStyles from "@material-ui/core/es/styles/withStyles";
import React from "react";
import MyMessage from './myMessage';
import OtherMessage from './OtherMessage';
import connect from "react-redux/es/connect/connect";

const styles = theme => ({

});


class MessagesHistory extends Component {
    constructor(props) {
        super(props);
        this.state;
    }

    componentDidMount() {
        if (this.props.socket == null) {
            return
        }
        this.props.socket;
    }

    render() {
        const classes = this.props.classes;

        return (
            <Grid className='MessagesHistory'
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="stretch">

                <MyMessage />
                <OtherMessage />

            </Grid>
        );
    }
}

export default withStyles(styles)(MessagesHistory);