import React from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Drawer from '@material-ui/core/Drawer/Drawer';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Icon from '@material-ui/core/Icon/Icon';
import Chat from '@material-ui/icons/Chat';
import Home from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';

const styles = {
  appBar: {
    paddingLeft: 0
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  // eslint-disable-next-line react/no-access-state-in-setstate
  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose(path) {
    this.setState({ open: false });
    return path !== this.props.history.location.pathname ? this.props.history.push(path) : null;
  }

  render() {
    return (
      <div className="Header">
        <AppBar position="static">
          <Toolbar variant="dense" className={this.props.classes.appBar}>
            <IconButton color="inherit" aria-label="reorder" onClick={this.handleToggle}>
              <Icon>reorder</Icon>
            </IconButton>
            <h2 color="inherit" className="flex">
              {' '}
              React Redux Socket.IO Webpack 4 Babel{' '}
            </h2>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.open} onClose={this.handleToggle}>
          <div tabIndex={0} role="button" onClick={this.handleToggle} onKeyDown={this.handleToggle}>
            <List component="nav">
              <div>
                <ListItem button role="button" onClick={() => this.handleClose(`${this.props.match.url}`)}>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button role="button" onClick={() => this.handleClose(`${this.props.match.url}chat`)}>
                  <ListItemIcon>
                    <Chat />
                  </ListItemIcon>
                  <ListItemText primary="Chat" />
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
