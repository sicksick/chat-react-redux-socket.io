import Grid from "@material-ui/core/Grid/Grid";
import React from "react";
import AddIcon from '@material-ui/icons/Add';
import connect from "react-redux/es/connect/connect";
import MembersUsers from "./membersUsers";
import MembersUsersDialog from "./membersUsersDialog";
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
    },
});

function mapStateToProps(state) {
    return state.socket;
}

@connect(mapStateToProps)
@withStyles(styles, {withTheme: true})
export default class MembersMain extends React.Component {

    state = {
        value: 0,
        open: true,
        selectedValue: null,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleChangeIndex = index => {
        this.setState({value: index});
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
        const {classes, theme, members} = this.props;

        return (
            <Grid className={`Members`}
                  container
                  direction="row"
                  alignItems="stretch">
                <Button onClick={this.handleClickOpen} mini variant="fab" color="primary" aria-label="Add"
                        className={classes.button}>
                    <AddIcon/>
                </Button>

                <MembersUsersDialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    members={members}
                />
            </Grid>
        );
    }
}
