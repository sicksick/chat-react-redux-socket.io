import Grid from "@material-ui/core/Grid/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import connect from "react-redux/es/connect/connect";
import {changeChat, setDataAfterAuth} from "../../../../actions/socket";
import {preloaderStartAction, preloaderStopAction} from "../../../../actions/common";

const styles = theme => ({
    membersList: {
        width: "100%"
    },
    chatItem: {
      borderLeft: "none"
    },
    chatActive: {
        borderRadius: '8px',
        backgroundColor: '#929fde',
        borderLeft: "1px solid #333"
    },
    chatInactive: {
        cursor: 'pointer'
    },
    MembersChat:{
        width: '100%'
    }
});

const mapDispatchToProps = function (dispatch) {
    return {
        changeChat: (data) => dispatch(changeChat(data)),
    };
};

@withStyles(styles)
@connect(null, mapDispatchToProps)
export default class MembersChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };

    }

    changeChat(chat) {
        if (chat.active === true){
            return
        }

        console.log(chat);
        this.props.changeChat(chat.chat_id);
    }

    memberChatsList = (chats, classes) => {
        if (chats.length === 0) {
            return ('');
        }
        const listItems = chats.map((chat) =>
            <span key={chat.chat_id.toString()} onClick={this.changeChat.bind(this,chat)}>
                <ListItem className={classes.chatItem + ' ' + (chat.active === true ? classes.chatActive: classes.chatInactive)}>
                    <Avatar>
                        <AccountCircle/>
                    </Avatar>
                    <ListItemText primary={chat.name} secondary={chat.permission}/>
                </ListItem>
            </span>
        );
        return (<List className={classes.membersList}> {listItems}</List>);
    };

    render() {
        const {classes, chats} = this.props;

        return (
            <Grid className={`MembersChat ${classes.MembersChat}`}>
                {chats.length !== 0 ? this.memberChatsList(chats, classes) : ''}
            </Grid>
        );
    }
}
