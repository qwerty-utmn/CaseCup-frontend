import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Avatar,
  Divider,
} from '@material-ui/core';

import getInitials from '../heplers/getInitials';
import binaryArrayToBase64 from '../heplers/binaryArrayToBase64';

class ManageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
    };
  }

  componentDidMount=() => {
    const { project_members } = this.props;
    console.log('componentDidMount', project_members && project_members.length > 0);

    if (project_members && project_members.length > 0) {
      this.setState({ roles: project_members.map((member) => (member.role)) });
    }
  }

  handleMemberChanged=(e) => {
    e.persist();
    this.setState((prevState) => {
      const newMembersRoles = prevState.roles.slice();
      newMembersRoles.splice(+e.target.name, 1, e.target.value);
      return ({
        roles: newMembersRoles,
      });
    });
  }

  onCloseManageModal=() => {
    this.setState({ roles: this.props.project_members.map((member) => (member.role)) });
    this.props.handleCloseManageModal();
  }

  render() {
    const {
      project_members,
      handleSubmitManageModal,
      manageModalIsOpen,
    } = this.props;
    const { roles } = this.state;
    console.log(this.state);
    return (
      <Dialog
        maxWidth="lg"
        onClose={this.onCloseManageModal}
        open={manageModalIsOpen}
      >
        <DialogTitle
          disableTypography
        >
          <Typography
            gutterBottom
            variant="h3"
          >
            Изменение ролей участников
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            {project_members && project_members.map((member, index) => (
              <Grid item key={member.user.user_id}>
                <Grid container direction="row" alignItems="center" justify="space-between" spacing={2}>
                  <Grid item>
                    <Avatar
                      component={RouterLink}
                      to={`/profiles/${member.user.user_id}`}
                      alt={`${member.user.surname} ${member.user.name}  ${member.user.middlename}`}
                      src={binaryArrayToBase64(member.user.user_photo)}
                    >
                      {!member.user.user_photo ? getInitials(member.user) : ''}
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h5"
                    >
                      {`${member.user.surname} ${member.user.name}`}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Роль"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="dense"
                      variant="outlined"
                      size="small"
                      name={index.toString()}
                      value={roles[index]}
                      onChange={this.handleMemberChanged}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onCloseManageModal} color="primary">
            Отменить
          </Button>
          <Button
            onClick={() => handleSubmitManageModal(roles)}
            variant="contained"
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default ManageModal;
