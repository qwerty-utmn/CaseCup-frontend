import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Divider,
  IconButton,
  Input,
  Paper,
  Tooltip,
  Grid,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import getInitials from '../heplers/getInitials';
import binaryArrayToBase64 from '../heplers/binaryArrayToBase64';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      multiline: false,
    };
  }

  handleMessageChange = (e) => {
    this.setState({ message: e.target.value });
  };

  render() {
    const { handleMessageSend, currentUser } = this.props;
    const { multiline, message } = this.state;
    return (
      <Grid container alignItems="center" style={{ marginTop: '16px', paddingRight: '8px' }}>
        <Grid item>
          <Avatar
            alt={`${currentUser.surname} ${currentUser.name}  ${currentUser.middlename}`}
            component={RouterLink}
            src={binaryArrayToBase64(currentUser.user_photo)}
            to={`/profiles/${currentUser.id}`}
          >
            {!currentUser.user_photo ? getInitials(currentUser) : ''}
          </Avatar>
        </Grid>
        <Grid item style={{ flexGrow: 1, marginLeft: '8px' }}>
          <Paper
            elevation={1}
            style={{ paddingLeft: '8px' }}
          >
            <Input
              disableUnderline
              onChange={this.handleMessageChange}
              placeholder="Оставить комментарий"
              multiline={multiline}
              onFocus={() => {
                this.setState({ multiline: true });
              }}
              onBlur={() => {
                this.setState({ multiline: false });
              }}
              fullWidth
            />
          </Paper>
        </Grid>
        <Tooltip title="Отправить">
          <IconButton color={message.length > 0 ? 'primary' : 'default'} onClick={() => handleMessageSend(message, currentUser.user_id)}>
            <SendIcon />
          </IconButton>
        </Tooltip>
        <Divider style={{ width: 1, height: 24 }} />
        <Tooltip title="Добавить картинку">
          <IconButton
            edge="end"
            // onClick={handleAttach}
          >
            <AddPhotoIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    );
  }
}

export default CommentForm;
