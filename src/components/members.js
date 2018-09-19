import {Component} from "react";
import Grid from "@material-ui/core/es/Grid/Grid";
import withStyles from "@material-ui/core/es/styles/withStyles";
import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    members_list: {
        width: "100%"
    }
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
                  alignItems="stretch">
                <List className={classes.members_list}>
                    <ListItem>
                        <Avatar>
                            <AccountCircle />
                        </Avatar>
                        <ListItemText primary="Andrey" secondary="online" />
                    </ListItem>
                    <li>
                        <Divider inset />
                    </li>
                    <ListItem>
                        <Avatar>
                            <AccountCircle />
                        </Avatar>
                        <ListItemText primary="Vova" secondary="offline" />
                    </ListItem>
                    <li>
                        <Divider inset />
                    </li>
                    <ListItem>
                        <Avatar>
                            <AccountCircle />
                        </Avatar>
                        <ListItemText primary="Maxim" secondary="online" />
                    </ListItem>
                </List>
            </Grid>
        );
    }
}

export default withStyles(styles)(Members);