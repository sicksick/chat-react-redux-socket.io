import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyMessage from './myMessage';
import OtherMessage from './otherMessage';

const styles = () => ({
  time: {
    marginTop: '6px'
  }
});

@withStyles(styles)
export default class MessagesHistory extends Component {
  static propTypes = {
    activeChat: PropTypes.shape({}),
    user: PropTypes.shape({}),
    classes: PropTypes.shape({}),
    messages: PropTypes.arrayOf(PropTypes.any)
  };

  static defaultProps = {
    user: {},
    activeChat: {},
    classes: {},
    messages: []
  };

  render() {
    const { messages, user } = this.props;

    return (
      <Grid
        className="MessagesHistory"
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        {messages.map(message => {
          if (!message) return '';

          if (message.user_id === user.id) {
            return <MyMessage key={message.id.toString()} message={message} />;
          }
          return <OtherMessage key={message.id.toString()} message={message} />;
        })}
      </Grid>
    );
  }
}
