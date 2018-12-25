import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import Icon from '@material-ui/core/Icon/Icon';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

const styles = {
  chatSendButton: {
    marginTop: '15px'
  },
  chatInputBox: {
    height: '100px',
    borderTop: '1px solid #ddd'
  }
};

@withStyles(styles)
export default class messageArea extends Component {
  state = {
    message: ''
  };

  static propTypes = {
    activeChat: PropTypes.shape({}),
    onNewMessage: PropTypes.func.isRequired
  };

  static defaultProps = {
    activeChat: {}
  };

  handleChange = event => {
    this.setState({ message: event.target.value });
  };

  newMessage = () => {
    if (!this.state.message || this.state.message.trim() === '') return;
    this.props.onNewMessage(this.state.message);
    this.setState({
      message: ''
    });
  };

  render() {
    return (
      <Grid
        item
        xs={12}
        className={`MessageArea  ${this.props.classes.chatInputBox}`}
        container
        direction="row"
        justify="space-around"
        alignItems="stretch"
      >
        <Grid item xs={9}>
          <TextField
            id="name-simple"
            value={this.state.message}
            multiline
            fullWidth
            rows="2"
            label="Message"
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={this.props.classes.chatSendButton}
            aria-label="Delete"
            onClick={this.newMessage}
          >
            Send &nbsp;
            <Icon>send</Icon>
          </Button>
        </Grid>
      </Grid>
    );
  }
}
