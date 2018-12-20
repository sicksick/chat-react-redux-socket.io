import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import Chip from '@material-ui/core/Chip/Chip';
import Paper from '@material-ui/core/Paper/Paper';
import FaceIcon from '@material-ui/icons/Face';
import Button from '@material-ui/core/Button/Button';

const styles = theme => ({
  memberChipsListStyle: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2
  },
  chip: {
    margin: theme.spacing.unit / 2
  },
  members_list: {
    width: '100%'
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  buttonCreate: {
    borderRadius: '30px',
    marginLeft: '4px'
  }
});

@withStyles(styles)
export default class MembersUsersDialog extends React.Component {

    state = {
        checkedUsers: []
    };

  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    createNewChat: PropTypes.func.isRequired,
    members: PropTypes.arrayOf(PropTypes.any)
  };

    static defaultProps = {
        members: []
    };

  handleClose = () => {
    this.props.onClose();
    this.setState({
      checkedUsers: []
    });
  };

  handleDelete = data => () => {
    this.setState(state => {
      const checkedUsers = [...state.checkedUsers];
      const chipToDelete = checkedUsers.indexOf(data);
      checkedUsers.splice(chipToDelete, 1);
      return { checkedUsers };
    });
  };

  addUserToCheckedUsers = user => {
    this.setState(state => {
      const checkedUsers = [...state.checkedUsers];
      const foundUser = checkedUsers.indexOf(user);
      if (foundUser === -1) {
        checkedUsers.push(user);
      }
      return { checkedUsers };
    });
  };

  createNewChat = () => {
    this.props.createNewChat(this.state.checkedUsers.map(item => item.id));
    this.handleClose();
  };

  memberChipsList = classes => {
    const chips = this.state.checkedUsers.map(data => (
      <Chip
        key={data.id.toString()}
        avatar={
          data.image ? (
            <Avatar alt="Natacha" src={data.image} />
          ) : (
            <Avatar>
              {' '}
              <FaceIcon />{' '}
            </Avatar>
          )
        }
        label={data.firstname ? data.firstname : data.email}
        onDelete={this.handleDelete(data)}
        className={classes.chip}
      />
    ));

    let buttonCreate = '';
    if (this.state.checkedUsers.length > 0) {
      buttonCreate = (
        <Button color="primary" onClick={this.createNewChat} className={classes.buttonCreate}>
          Create
        </Button>
      );
    }

    return (
      <Paper className={classes.memberChipsListStyle}>
        {chips}
        {buttonCreate}
      </Paper>
    );
  };

  usersList = (members, classes) => (
    <List component="nav">
      {members.map(user => (
        <ListItem key={user.id} button onClick={this.addUserToCheckedUsers.bind(this, user)}>
          <ListItemAvatar>
            {user.image ? (
              <Avatar src={user.image} className={classes.avatar} />
            ) : (
              <Avatar>
                {' '}
                <FaceIcon />{' '}
              </Avatar>
            )}
          </ListItemAvatar>
          <ListItemText
            primary={user.firstname ? user.firstname : user.email}
            secondary={user.firstname ? user.email : ''}
          />
        </ListItem>
      ))}
    </List>
  );

  render() {
    const { classes, onClose, selectedValue, members, createNewChat, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">
          {members.length > 0 ? 'Searching users' : 'Users not found'}
        </DialogTitle>
        <div>{this.state.checkedUsers.length > 0 ? this.memberChipsList(classes) : ''}</div>
        <div>{members.length > 0 ? this.usersList(members, classes) : ''}</div>
      </Dialog>
    );
  }
}
