import Grid from "@material-ui/core/Grid/Grid";
import React from "react";
import AddIcon from '@material-ui/icons/Add';
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
});

@withStyles(styles, {withTheme: true})
export default class MembersMain extends React.Component {

    state = {
        value: 0,
        open: false,
        selectedValue: null,
    };

    static propTypes = {
        classes: PropTypes.object.isRequired,
        createNewChat: PropTypes.func.isRequired,
        onChangeChat: PropTypes.func.isRequired,
        participatedChat: PropTypes.array.isRequired,
        members: PropTypes.array.isRequired,
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = value => {
        this.setState({selectedValue: value, open: false});
    };

    render() {
        const {classes, members, participatedChat} = this.props;

        return (
            <Grid className={`Members`}
                  container
                  direction="row"
                  alignItems="stretch">

                <Fab onClick={this.handleClickOpen} size="small" color="secondary" aria-label="Add"
                        className={classes.button}>
                    <AddIcon/>
                </Fab>
                <MembersChat chats={participatedChat} onChangeChat={this.props.onChangeChat}/>

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
