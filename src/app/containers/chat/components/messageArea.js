import React, { Component } from "react";
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import Icon from '@material-ui/core/Icon/Icon';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  chatSendButton: {
    marginTop: '15px'
  },
  chatInputBox: {
    height: '100px',
    borderTop: '1px solid #ddd'
  }
});

class messageArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
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
            value={this.state.name}
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
          >
            Send &nbsp;
            <Icon>send</Icon>
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(messageArea);
