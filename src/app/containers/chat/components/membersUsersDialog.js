import React from 'react';
import PropTypes, {bool, string} from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import blue from '@material-ui/core/colors/blue';


const styles = theme => ({
    members_list: {
        width: "100%"
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    }
});

@withStyles(styles)
export default class MembersUsersDialog extends React.Component {

    state = {
        value: 0,
        open: true,
        selectedValue: null,
    };

    static propTypes = {
        open: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired,
        createNewChat: PropTypes.func.isRequired,
        members: PropTypes.array.isRequired,
    };

    handleClose = () => {
        this.props.onClose();
    };

    handleListItemClick = value => {
        this.props.onClose(value);
    };

    createNewChat = user => {
        this.props.createNewChat(user);
        this.handleClose();
    };

    render() {
        const { classes, onClose, selectedValue, members, createNewChat, ...other} = this.props;

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">Searching users</DialogTitle>
                <div>
                    <List component="nav">
                        {members.map(user => (
                            <ListItem key={user.id} button onClick={this.createNewChat.bind(null, user)}>
                                <ListItemAvatar>
                                    <Avatar src={user.image} className={classes.avatar}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user.firstname ? user.firstname : user.email}
                                    secondary={user.firstname ? user.email : ''}/>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Dialog>
        );
    }
}
