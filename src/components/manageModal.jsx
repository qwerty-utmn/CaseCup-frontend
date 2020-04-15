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
} from '@material-ui/core';

import getInitials from '../heplers/getInitials';
import binaryArrayToBase64 from '../heplers/binaryArrayToBase64';

class ManageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      errors: [],
    };
  }

  componentDidMount=() => {
    const { project_members } = this.props;
    if (project_members && project_members.length > 0) {
      this.setState({ roles: project_members.map((member) => (member.role)) });
    }
  }

  componentDidUpdate=() => {
    const { roles } = this.state;
    const { project_members } = this.props;
    if (project_members && roles.length === 0) {
      this.setState({ roles: project_members.map((member) => (member.role)) });
    }
  }

  onMemberChanged=(e) => {
    e.persist();
    let error = false;
    if (e.target.value.length === 0) error = true;
    this.setState((prevState) => {
      const newMembersRoles = prevState.roles.slice();
      newMembersRoles.splice(+e.target.name, 1, e.target.value);
      const newErrors = prevState.errors.slice();
      newErrors.splice(+e.target.name, 1, error);
      return ({
        roles: newMembersRoles,
        errors: newErrors,
      });
    });
  }

  onCloseManageModal=() => {
    const { project_members } = this.props;
    if (project_members) {
      this.setState({
        roles: project_members.map(
          (member) => (member.role),
        ),
        errors: new Array(project_members.length).fill(false),
      });
    }
    this.props.handleCloseManageModal();
  }

  render() {
    const {
      project_members,
      handleSubmitManageModal,
      manageModalIsOpen,
    } = this.props;
    const { roles, errors } = this.state;
    const isFormValid = errors.every((error) => error === false);
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
                      onChange={this.onMemberChanged}
                      error={errors[index]}
                      fullWidth
                      required
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
            disabled={!isFormValid}
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default ManageModal;
