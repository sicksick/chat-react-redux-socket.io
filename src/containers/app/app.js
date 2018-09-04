import React, {Component} from 'react';
import Header from '../header/header';
import {Route} from "react-router-dom";
import Chat from "../chat/chat";
import Home from "../home/home";
import Grid from "@material-ui/core/es/Grid/Grid";
import Paper from "@material-ui/core/es/Paper/Paper";
import {withStyles} from "@material-ui/core/es";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#f1f1f1',
        minHeight: '100vh'
    },
    paper: {
        padding: theme.spacing.unit * 2,
        height: '100%',
        color: theme.palette.text.secondary,

    },
    gridItem: {
        marginTop: 20,
        height: '100%',
        marginBottom: 20,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    grid12: {
        height: '100%'
    }
});


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    render() {
        const classes = this.props.classes;

        return (
            <div className={`App  ${classes.app}`}>
                <Grid container className={classes.root} direction="row"
                      justify="center"
                      alignItems="stretch">
                    <Grid item xs={12} className={classes.grid12}>
                        <Header match={this.props.match} history={this.props.history}/>
                        <Grid
                            className={classes.gridItem}
                            container
                            direction="row"
                            justify="center"
                            alignItems="stretch"
                        >
                            <Grid item xs={9} className={classes.gridItem}>
                                <Paper className={classes.paper}>
                                    <Route exact path={`${this.props.match.path}`} component={Home}/>
                                    <Route path={`${this.props.match.path}chat`} component={Chat}/>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(App);
