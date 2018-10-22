import {Component} from "react";
import Grid from "@material-ui/core/Grid/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";
import SwipeableViews from 'react-swipeable-views';
import Typography from "@material-ui/core/Typography/Typography";
import * as PropTypes from "prop-types";


function TabContainer({children, dir}) {
    return (
        <Typography component="div" dir={dir} style={{padding: 8 * 3}}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
    members_list: {
        width: "100%"
    },
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
});

class MembersMain extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleChangeIndex = index => {
        this.setState({value: index});
    };

    render() {
        const {classes, theme} = this.props;

        return (
            <Grid className={`Members`}
                  container
                  direction="row"
                  alignItems="stretch">
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                    >
                        <Tab label="Users online"/>
                        <Tab label="Chats"/>
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer dir={theme.direction}>Item One</TabContainer>
                    <TabContainer dir={theme.direction}>Item Two</TabContainer>
                </SwipeableViews>
                <List className={classes.members_list}>
                    <ListItem>
                        <Avatar>
                            <AccountCircle/>
                        </Avatar>
                        <ListItemText primary="Andrey" secondary="online"/>
                    </ListItem>
                    <li>
                        <Divider inset/>
                    </li>
                    <ListItem>
                        <Avatar>
                            <AccountCircle/>
                        </Avatar>
                        <ListItemText primary="Vova" secondary="offline"/>
                    </ListItem>
                    <li>
                        <Divider inset/>
                    </li>
                    <ListItem>
                        <Avatar>
                            <AccountCircle/>
                        </Avatar>
                        <ListItemText primary="Maxim" secondary="online"/>
                    </ListItem>
                </List>
            </Grid>
        );
    }
}

export default withStyles(styles, {withTheme: true})(MembersMain);