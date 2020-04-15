import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import {
  Grid,
  Typography,
  OutlinedInput,
  FormControl,
  TextField,
  CardHeader,
  Card,
  CardContent,
  InputLabel,
  Select,
  Chip,
  ListItemText,
  Checkbox,
  MenuItem,
  Container,
  CardActions,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import MembersCard from '../components/membersCard';
import ManageModal from '../components/manageModal';

import { getCategories, createCategory, deleteCategory } from '../actions/categories';
import { updateProject, getProject, updateMember } from '../actions/projects';
import { getUserByToken } from '../actions/user';


class ProjectEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectForm: {
        project_id: '',
        project_members: [],
        title: '',
        description: '',
        start_datetime: '',
        end_datetime: '',
        // project_status: '',
        price: '',
        categories: [],
        files: [],
      },
      projectFormErrors: {
        title: false,
        description: false,
        start_datetime: false,
        end_datetime: false,
        price: false,
        categories: false,
        files: false,
      },
      categoryForm: {
        category_id: '',
        description: '',
      },
      categoryFormErrors: {
        category_id: true,
        description: true,
      },
      createCategoryModalIsOpen: false,
      manageModalIsOpen: false,
    };
  }

  handleOpenCreateCategoryModal=() => {
    this.setState((prevState) => ({
      ...prevState,
      categoryForm: {
        title: '',
        description: '',
      },
      createCategoryModalIsOpen: true,
    }));
  };

  handleOpenManageModal=() => {
    this.setState({
      manageModalIsOpen: true,
    });
  };

  handleSubmitManageModal=(roles) => {
    const { project_members } = this.props.project;
    const membersToUpdate = project_members.map(
      (member, index) => ({ ...member, role: roles[index] }),
    ).filter((member, index) => (project_members[index].role !== roles[index]));
    membersToUpdate.forEach((member) => {
      this.props.updateMember(this.props.project.project_id, member.user_id, member.role);
    });
    this.setState({
      manageModalIsOpen: false,
    });
  };

  handleCloseManageModal=() => {
    this.setState({ manageModalIsOpen: false });
  };

  handleCloseCreateCategoryModal=() => {
    this.setState({ createCategoryModalIsOpen: false });
  };

  handleSubmitCreateCategoryModal=() => {
    this.props.createCategory(this.state.categoryForm);
    this.setState({ createCategoryModalIsOpen: false });
  };

  handleUpdateProjectButtonClick=() => {
    this.props.updateProject({ ...this.state.projectForm, creator: { user_id: `${this.props.currentUser.user_id}` } });
    this.props.history.push(`/projects/${this.state.projectForm.project_id}`);
  }

  readURL = (url) => {
    const reader = new FileReader();
    reader.onload = () => reader.result;

    reader.readAsDataURL(url); // convert to base64 string
  }

  handleFilesChange=(e) => {
    e.persist();
    this.setState((prevState) => ({
      projectForm: {
        ...prevState.projectForm,
        files: e.target.files,
      },
    }));
  }

  handleProjectFormChange=(e) => {
    e.persist();
    const error = e.target.value.length === 0;
    this.setState((prevState) => ({
      projectForm: {
        ...prevState.projectForm,
        [e.target.name]: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
      },
      projectFormErrors: {
        ...prevState.projectFormErrors,
        [e.target.name]: error,
      },
    }));
  }

  handleCategoryFormChange=(e) => {
    e.persist();
    const error = e.target.value.length === 0;
    this.setState((prevState) => ({
      categoryForm: {
        ...prevState.categoryForm,
        [e.target.name]: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
      },
      projectFormErrors: {
        ...prevState.categoryFormErrors,
        [e.target.name]: error,
      },
    }));
  }

  componentDidMount=() => {
    this.props.getCategories();
    this.props.getProject(this.props.match.params.projectId);
  }

  componentDidUpdate=() => {
    if (!this.props.currentUser.user_id) {
      const token = localStorage.getItem('token');
      this.props.getUserByToken(token);
    }
    if (!this.props.project) {
      this.props.getProject(this.props.match.params.projectId);
    }
    if (this.props.project
      && this.props.project.project_id
      && this.state.projectForm.project_id !== this.props.project.project_id) {
      const {
        role,
        categories,
        ...rest
      } = this.props.project;
      const processedCategories = categories.map((cat) => (cat.category_id));
      this.setState({ projectForm: { ...rest, categories: processedCategories } });
    }
  }

  render() {
    const {
      projectForm,
      createCategoryModalIsOpen,
      manageModalIsOpen,
      categoryForm,
      projectFormErrors,
      categoryFormErrors,
    } = this.state;
    const {
      categories,
      project,
      currentUser,
    } = this.props;
    console.log('projectForm.members', projectForm.project_members);
    const categoriesId = categories && categories.map((cat) => cat.category_id);
    const isProjectFormValid = Object.values(projectFormErrors).every((error) => error === false);
    const isCategoryFormValid = Object.values(categoryFormErrors).every((error) => error === false);
    return (
      <Container>
        <Grid container direction="column" spacing={3}>
          <Grid item sm>
            <Typography variant="overline" gutterBottom>
              {`Проект №${project.project_id}`}
            </Typography>
            <Typography variant="h3">Изменение проекта</Typography>
          </Grid>
          <Grid item>
            <Card>
              <CardHeader title="Информация" />
              <CardContent>
                <Grid container item direction="column" spacing={3}>
                  <Grid item>
                    <TextField
                      label="Название"
                      name="title"
                      value={projectForm.title}
                      onChange={this.handleProjectFormChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      size="small"
                      error={projectFormErrors.title}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth variant="outlined" margin="dense" error={projectFormErrors.categories} required>
                      <InputLabel id="label" shrink>
                        Категории
                      </InputLabel>
                      <Select
                        multiple
                        labelId="label"
                        value={projectForm.categories}
                        input={(
                          <OutlinedInput
                            notched
                            labelWidth={73}
                          />
                        )}
                        onChange={(e, menuItem) => {
                          if (menuItem.props.value) {
                            const error = e.target.value.length === 0;
                            this.setState((prevState) => ({
                              projectForm: {
                                ...prevState.projectForm,
                                categories: e.target.value,
                              },
                              projectFormErrors: {
                                ...prevState.projectFormErrors,
                                categories: error,
                              },
                            }));
                          }
                        }}
                                                // renderValue={selected => selected.join(', ')}
                        renderValue={(categories) => (
                          <div>
                            {categories.map((cat) => (
                              <Chip key={cat} label={cat} size="small" variant="outlined" style={{ marginRight: '2px' }} />
                            ))}
                          </div>
                        )}
                        MenuProps={{
                          MenuListProps: {
                            style: {
                              maxHeight: 250,
                              padding: 0,
                            },
                          },
                          getContentAnchorEl: null,
                          anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left',
                          },
                          transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                          },
                        }}
                      >
                        {categoriesId && categoriesId.map((cat) => (
                          <MenuItem key={cat} value={cat}>
                            <Checkbox
                              checked={projectForm.categories.indexOf(cat) > -1}
                            />
                            <ListItemText primary={cat} />
                          </MenuItem>
                        ))}
                        <MenuItem key="button" button={false} style={{ justifyContent: 'center' }}>
                          <Button
                            style={{ color: '#FFFFFF', backgroundColor: '#4CAF50' }}
                            onClick={this.handleOpenCreateCategoryModal}
                            variant="contained"
                          >
                            Добавить свою категорию
                          </Button>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Описание"
                      name="description"
                      value={projectForm.description}
                      onChange={this.handleProjectFormChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      size="small"
                      error={projectFormErrors.description}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid container item spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        label="Дата начала"
                        name="start_datetime"
                        value={projectForm.start_datetime ? moment(projectForm.start_datetime).format('YYYY-MM-DD') : ''}
                        onChange={this.handleProjectFormChange}
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        error={projectFormErrors.start_datetime}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        label="Дата конца"
                        name="end_datetime"
                        value={projectForm.end_datetime ? moment(projectForm.end_datetime).format('YYYY-MM-DD') : ''}
                        onChange={this.handleProjectFormChange}
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        error={projectFormErrors.end_datetime}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <TextField
                        label="Стоимость"
                        name="price"
                        value={projectForm.price || ''}
                        onChange={this.handleProjectFormChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        error={projectFormErrors.price}
                        fullWidth
                        required
                      />
                    </Grid>
                  </Grid>
                  {/* <Grid container item spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl variant="outlined" margin="dense" fullWidth>
                        <InputLabel shrink>Обложка проекта</InputLabel>
                        <OutlinedInput
                          type="file"
                          notched
                          labelWidth={120}
                          inputProps={{
                            accept: 'image/*',
                            id: 'raised-button-file',
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl variant="outlined" margin="dense" fullWidth>
                        <InputLabel shrink>Дополнительные файлы</InputLabel>
                        <OutlinedInput
                          type="file"
                          notched
                          labelWidth={160}
                          onChange={this.handleFilesChange}
                          inputProps={{
                            accept: '.doc,.pdf,.excel,.csv,.xml',
                            id: 'raised-button-file',
                            multiple: true,
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid> */}
                </Grid>
              </CardContent>
              <CardActions style={{ paddingTop: 0 }}>
                <Grid item>
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={!isProjectFormValid}
                    onClick={this.handleUpdateProjectButtonClick}
                  >
                    Сохранить
                  </Button>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
          <Grid item>
            <MembersCard
              project_members={projectForm.project_members}
              project={project}
              currentUser={currentUser}
              handleManageClick={this.handleOpenManageModal}
            />
          </Grid>
        </Grid>
        <Dialog
          maxWidth="lg"
          onClose={this.handleCloseCreateCategoryModal}
          open={createCategoryModalIsOpen}
        >
          <DialogTitle disableTypography>
            <Typography
              gutterBottom
              variant="h3"
            >
              Создание новой категории
            </Typography>
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Название"
              InputLabelProps={{
                shrink: true,
              }}
              margin="dense"
              variant="outlined"
              helperText="Одно слово"
              size="small"
              name="category_id"
              value={categoryForm.category_id}
              onChange={this.handleCategoryFormChange}
              error={categoryFormErrors.category_id}
              fullWidth
              required
            />
            <TextField
              label="Описание"
              InputLabelProps={{
                shrink: true,
              }}
              margin="dense"
              variant="outlined"
              size="small"
              name="description"
              value={categoryForm.description}
              onChange={this.handleCategoryFormChange}
              error={categoryFormErrors.description}
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseCreateCategoryModal} color="primary">
              Отменить
            </Button>
            <Button
              onClick={this.handleSubmitCreateCategoryModal}
              variant="contained"
              disabled={!isCategoryFormValid}
            >
              Создать
            </Button>
          </DialogActions>
        </Dialog>
        <ManageModal
          handleSubmitManageModal={this.handleSubmitManageModal}
          handleCloseManageModal={this.handleCloseManageModal}
          manageModalIsOpen={manageModalIsOpen}
          project_members={projectForm.project_members}
        />
      </Container>
    );
  }
}
const mapStateToProps = (store) => ({
  categories: store.categories,
  project: store.project,
  currentUser: store.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  getUserByToken: (token) => dispatch(getUserByToken(token)),
  getCategories: () => dispatch(getCategories()),
  getProject: (id) => dispatch(getProject(id)),
  updateMember: (project_id, user_id, role) => dispatch(updateMember(project_id, user_id, role)),
  updateProject: (project) => dispatch(updateProject(project)),
  createCategory: (category) => dispatch(createCategory(category)),
  deleteCategory: (categoryId) => dispatch(deleteCategory(categoryId)),
  // logout: () => dispatch(logout()),
  // removeErrors: () => dispatch(removeErrors())

});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectEdit));
