import {Component} from "react";
import React from "react";
import AppBar from "@material-ui/core/es/AppBar/AppBar";
import Drawer from "@material-ui/core/es/Drawer/Drawer";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import Icon from "@material-ui/core/Icon/Icon";
import Chat from '@material-ui/icons/Chat';
import Home from '@material-ui/icons/Home';
import {withStyles} from "@material-ui/core/es";
import Typography from "@material-ui/core/Typography/Typography";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

const styles = {
    appBar: {
        paddingLeft: 0,
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose(path) {
        this.setState({open: false});
        return path != this.props.history.location.pathname ? this.props.history.push(path) : null;
    };

    render() {
        return (
            <div className="Header">
                <AppBar position="static">
                    <Toolbar variant="dense" className={this.props.classes.appBar}>
                        <IconButton color="inherit" aria-label="reorder" onClick={this.handleToggle}>
                            <Icon>reorder</Icon>
                        </IconButton>
                        <Typography variant="title" color="inherit" className='flex'>
                            React Redux Socket.IO Webpack 4 Babel
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.open} onClose={this.handleToggle}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.handleToggle}
                        onKeyDown={this.handleToggle}
                    >
                        <List component="nav">
                            <div>
                                <ListItem button onClick={() => this.handleClose(`${this.props.match.url}`)}>
                                    <ListItemIcon>
                                        <Home/>
                                    </ListItemIcon>
                                    <ListItemText primary="Home"/>
                                </ListItem>
                                <ListItem button onClick={() => this.handleClose(`${this.props.match.url}chat`)}>
                                    <ListItemIcon>
                                        <Chat/>
                                    </ListItemIcon>
                                    <ListItemText primary="Chat"/>
                                </ListItem>
                            </div>
                        </List>
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default withStyles(styles)(Header);