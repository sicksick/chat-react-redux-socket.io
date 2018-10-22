import {Component} from "react";
import Grid from "@material-ui/core/Grid/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";
import Paper from "@material-ui/core/Paper/Paper";
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';


const styles = theme => ({
    paperMy: {
        padding: '10px',
        height: '100%',
        color: theme.palette.text.secondary,
        backgroundColor: '#8ebba4',
    },
    gridItem: {
        width: '100%',
        marginBottom: 6,
    }
});

class MyMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        const classes = this.props.classes;

        return (
            <Grid container className={`MyMessage`}
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start">
                <Grid container className={classes.gridItem}>
                    <Grid container
                          spacing={24}
                          direction="row"
                          justify="space-between"
                          alignItems="baseline"
                    >
                        <Grid item xs={11}>
                            <Paper className={classes.paperMy}>
                                <Grid container
                                      direction="row"
                                      justify="flex-start"
                                      alignItems="baseline"
                                >
                                    <Grid item xs={1}>
                                        <Avatar >
                                            <AccountCircle style={{ fontSize: 16 }}  />
                                        </Avatar>
                                    </Grid>
                                    <Grid item xs>
                                        My message
                                    </Grid>

                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={1}>12:30</Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(MyMessage);