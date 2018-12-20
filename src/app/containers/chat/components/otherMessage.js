import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper/Paper';
import Avatar from '@material-ui/core/Avatar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PropTypes from 'prop-types';

const styles = theme => ({
  paperOther: {
    padding: '4px',
    height: '100%',
    color: theme.palette.text.secondary,
    backgroundColor: '#a494bb'
  },
  gridItem: {
    width: '100%',
    marginBottom: 6
  },
  time: {
    marginTop: '8px',
    marginLeft: '15px'
  },
  messageBox: {
    color: theme.palette.text.primary
  },
  userName: {
    color: theme.palette.text.secondary
  }
});

@withStyles(styles)
export default class OtherMessage extends Component {

  static propTypes = {
    classes: PropTypes.shape({}),
    message: PropTypes.shape({})
  };

  static defaultProps = {
    classes: {},
    message: {}
  };

  getTime = (dateString, classes) => {
    const [date, time] = dateString.split(' ');
    return (
      <div className={classes.time}>
        {date}
        <br />
        {time.substr(0, 5)}
      </div>
    );
  };

  render() {
    const { classes, message } = this.props;

    return (
      <Grid
        container
        className="OtherMessage"
        direction="column"
        justify="flex-start"
        alignItems="flex-end"
      >
        <Grid container className={classes.gridItem}>
          <Grid
            container
            spacing={24}
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={2}>
              {this.getTime(message.created_at, classes)}
            </Grid>
            <Grid item xs={10}>
              <Paper className={classes.paperOther}>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                  <Grid item xs>
                    <div className={classes.userName}>
                      {message.user_name ? message.user_name : message.email}
                    </div>
                    <div className={classes.messageBox}>{message.message_text}</div>
                  </Grid>
                  <Grid item xs={1}>
                    {message.user_image ? (
                      <Avatar src={message.user_image} />
                    ) : (
                      <Avatar>
                        {' '}
                        <AccountCircle />{' '}
                      </Avatar>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
