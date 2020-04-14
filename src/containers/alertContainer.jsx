import React, { Component } from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { closeAlert } from '../actions/alertAction';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
class AlertContainer extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(event, reason) {
    if (reason === 'clickaway' || !this.props.alert.setAlertOpen) {
      return;
    }
    this.props.closeAlert();
  }

  render() {
    console.log('>>>>>>>');
    return (
      <Snackbar
        open={this.props.alert.setAlertOpen}
        autoHideDuration={3000}
        onClose={this.handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Alert
          onClose={this.handleClose}
          severity={this.props.alert.message.type}
        >
          {this.props.alert.message.text}
        </Alert>
      </Snackbar>
    );
  }
}
const mapStateToProps = (store) => ({
  alert: store.alert,
});
const mapDispatchToProps = (dispatch) => ({
  closeAlert: () => dispatch(closeAlert()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AlertContainer);
