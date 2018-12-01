import Grid from "@material-ui/core/Grid/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PropTypes from "prop-types";
import FaceIcon from "@material-ui/core/SvgIcon/SvgIcon";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";

const styles = theme => ({
    membersList: {
        width: "100%"
    },
    chatItem: {
        borderLeft: "none",
        paddingTop: '4px',
        paddingBottom: '4px',
    },
    chatActive: {
        borderRadius: '0px 8px 8px 0px',
        backgroundColor: '#929fde',
        borderLeft: "1px solid #333",
        paddingTop: '4px',
        paddingBottom: '4px',
    },
    chatInactive: {
        cursor: 'pointer'
    },
    MembersChat: {
        width: '100%'
    }
});


@withStyles(styles)
export default class MembersChat extends React.Component {

    state = {
        value: 0
    };

    static propTypes = {
        activeChat: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        onChangeChat: PropTypes.func.isRequired,
        chats: PropTypes.array.isRequired,
    };

    onChangeChat = chat => {
        this.props.onChangeChat(chat)
    };

    memberChatsList = (chats, classes, activeChat) => {
        if (chats.length === 0) {
            return ('');
        }
        const listItems = chats.map((chat) =>
            <span key={chat.chat_id.toString()} onClick={this.onChangeChat.bind(this, chat)}>
                <ListItem
                    className={classes.chatItem + ' ' + (chat.chat_id === activeChat.chat_id ? classes.chatActive : classes.chatInactive)}>
                        {chat.chat_image ? <Avatar src={chat.chat_image}/> : <Avatar> <AccountCircle/> </Avatar> }
                    <ListItemText primary={chat.name} secondary={chat.permission ? 'Role: ' + chat.permission: ''}/>
                </ListItem>
            </span>
        );
        return (<List className={classes.membersList}> {listItems}</List>);
    };

    render() {
        const {classes, chats, activeChat} = this.props;

        return (
            <Grid className={`MembersChat ${classes.MembersChat}`}>
                {chats.length !== 0 ? this.memberChatsList(chats, classes, activeChat) : ''}
            </Grid>
        );
    }
}
