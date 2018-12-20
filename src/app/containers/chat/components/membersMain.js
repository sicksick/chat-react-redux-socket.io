import Grid from '@material-ui/core/Grid/Grid';
import React from 'react';
import PersonAdd from '@material-ui/icons/PersonAdd';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab/Fab';
import PropTypes from 'prop-types';
import MembersChat from './membersChat';
import MembersUsersDialog from './membersUsersDialog';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%'
  },
  buttonClickOpen: {
    marginRight: '5px'
  }
});

@withStyles(styles, { withTheme: true })
export default class MembersMain extends React.Component {
  state = {
    open: false
  };

  static propTypes = {
    activeChat: PropTypes.shape({}),
    createNewChat: PropTypes.func.isRequired,
    onChangeChat: PropTypes.func.isRequired,
    participatedChat: PropTypes.arrayOf(PropTypes.any),
    members: PropTypes.arrayOf(PropTypes.any)
  };

  static defaultProps = {
    activeChat: {},
    participatedChat: [],
    members: []
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, members, participatedChat, activeChat } = this.props;

    return (
      <Grid className="Members" container direction="row" alignItems="stretch">
        <Fab
          onClick={this.handleClickOpen}
          size="small"
          color="secondary"
          aria-label="Add"
          className={classes.buttonClickOpen}
        >
          <PersonAdd />
        </Fab>
        <MembersChat
          chats={participatedChat}
          activeChat={activeChat}
          onChangeChat={this.props.onChangeChat}
        />

        <MembersUsersDialog
          open={this.state.open}
          onClose={this.handleClose}
          createNewChat={this.props.createNewChat}
          members={members}
        />
      </Grid>
    );
  }
}
