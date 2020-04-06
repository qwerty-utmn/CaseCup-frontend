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
  render() {
    const {
      project_members,
      handleSubmitManageModal,
      handleCloseManageModal,
      manageModalIsOpen,
    } = this.props;
    return (
      <Dialog
        maxWidth="lg"
        onClose={handleCloseManageModal}
        open={manageModalIsOpen}
      >
        <DialogTitle>
          <Typography
            gutterBottom
            variant="h3"
          >
            Изменение ролей участников
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" spacing={2}>
            {project_members && project_members.map((member) => (
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
                      value={member.role}
                // onChange={(e) => {
                //   console.log(e.target.value);
                //   this.setState({ categoryForm: { ...categoryForm, category_id: e.target.value } });
                // }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseManageModal} color="primary">
            Отменить
          </Button>
          <Button
            onClick={handleSubmitManageModal}
            variant="contained"
          >
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default ManageModal;
