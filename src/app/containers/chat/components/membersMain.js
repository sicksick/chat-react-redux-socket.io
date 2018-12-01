import Grid from "@material-ui/core/Grid/Grid";
import React from "react";
import PersonAdd from '@material-ui/icons/PersonAdd';
import GroupAdd from '@material-ui/icons/GroupAdd';
import MembersUsersDialog from "./membersUsersDialog";
import {withStyles} from '@material-ui/core/styles';
import MembersChat from "./membersChat";
import Fab from "@material-ui/core/Fab/Fab";
import PropTypes from "prop-types";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
    },
    buttonClickOpen: {
        marginRight: '5px'
    }
});

@withStyles(styles, {withTheme: true})
export default class MembersMain extends React.Component {

    state = {
        value: 0,
        open: false,
        selectedValue: null,
    };

    static propTypes = {
        activeChat: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired,
        createNewChat: PropTypes.func.isRequired,
        onChangeChat: PropTypes.func.isRequired,
        participatedChat: PropTypes.array.isRequired,
        members: PropTypes.array.isRequired,
    };

    handleClickOpen = usersDialogType => {
        this.setState({
            open: true
        });
    };

    handleClose = value => {
        this.setState({open: false});
    };

    render() {
        const {classes, members, participatedChat, activeChat} = this.props;

        return (
            <Grid className={`Members`}
                  container
                  direction="row"
                  alignItems="stretch">

                <Fab onClick={this.handleClickOpen} size="small" color="secondary" aria-label="Add"
                        className={classes.buttonClickOpen}>
                    <PersonAdd/>
                </Fab>
                <MembersChat chats={participatedChat} activeChat={activeChat} onChangeChat={this.props.onChangeChat}/>

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
