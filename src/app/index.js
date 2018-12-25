import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import Home from './components/home';
import Chat from './containers/chat';
import Header from './components/header';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f1f1f1',
    minHeight: '100vh'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    height: '100%'
  },
  gridItem: {
    marginTop: 20,
    height: '100%',
    marginBottom: 20
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  grid12: {
    height: '100%'
  },
  progress: {
    marginTop: '17%',
    marginLeft: '46%',
    position: 'absolute'
  },
  containerProgress: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#858585',
    opacity: 0.3,
    position: 'absolute',
    zIndex: 1
  }
});

function mapStateToProps(state) {
  return { preload: state.common.preload };
}

@connect(mapStateToProps)
@withStyles(styles)
export default class Index extends Component {

  render() {
    const {classes} = this.props;

    return (
      <div className="App">
        {this.props.preload ? (
          <div className={classes.containerProgress}>
            <CircularProgress className={classes.progress} size={100} />
          </div>
        ) : (
          ''
        )}
        <Grid
          container
          className={classes.root}
          direction="row"
          justify="center"
          alignItems="stretch"
        >
          <Grid item xs={12} className={classes.grid12}>
            <Header match={this.props.match} history={this.props.history} />
            <Grid
              className={classes.gridItem}
              container
              direction="row"
              justify="center"
              alignItems="stretch"
            >
              <Grid item xs={9} className={classes.gridItem}>
                <Paper className={classes.paper}>
                  <Route path={`${this.props.match.path}`} component={Home} />
                  <Route exact path={`${this.props.match.path}chat`} component={Chat} />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
