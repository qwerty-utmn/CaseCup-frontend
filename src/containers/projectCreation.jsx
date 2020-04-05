import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

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
import { white } from 'material-ui/styles/colors';
import MembersCard from '../components/membersCard';
import { getCategories, createCategory, deleteCategory } from '../actions/categories';
import { createProject } from '../actions/projects';

class ProjectCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectForm: {
        project_members: [],
        title: '',
        description: '',
        start_datetime: '',
        end_datetime: '',
        // project_status: '',
        price: '',
        selectedCategories: [],
        files: [],
      },
      categoryForm: {
        category_id: '',
        description: '',
      },
      createCategoryModalIsOpen: false,
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

  handleCloseCreateCategoryModal=() => {
    this.setState({ createCategoryModalIsOpen: false });
  };

  handleSubmitCreateCategoryModal=() => {
    this.props.createCategory(this.state.categoryForm);
    this.setState({ createCategoryModalIsOpen: false });
  };

  handleCreateProjectButtonClick=() => {
    this.props.createProject({ ...this.state.projectForm, creator: { user_id: `${this.props.currentUser.user_id}` } });
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
    this.setState((prevState) => ({
      projectForm: {
        ...prevState.projectForm,
        [e.target.name]: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
      },
    }));
  }

  componentDidMount=() => {
    this.props.getCategories();
  }

  render() {
    const {
      projectForm,
      createCategoryModalIsOpen,
      categoryForm,
    } = this.state;
    const {
      categories,
    } = this.props;
    const categoriesId = categories && categories.map((cat) => cat.category_id);

    return (
      <Container>
        <Grid container direction="column" spacing={3}>
          <Grid item sm>
            <Typography variant="overline" gutterBottom>
              Новый проект
            </Typography>
            <Typography variant="h3">Cоздание проекта</Typography>
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
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth variant="outlined" margin="dense">
                      <InputLabel id="label" shrink>
                        Категории
                      </InputLabel>
                      <Select
                        multiple
                        labelId="label"
                        value={projectForm.selectedCategories}
                        input={(
                          <OutlinedInput
                            notched
                            labelWidth={73}
                          />
                        )}
                        onChange={(e, menuItem) => {
                          menuItem.props.value
                          && this.setState({
                            projectForm: {
                              ...projectForm,
                              selectedCategories: e.target.value,
                            },
                          });
                        }}
                                                // renderValue={selected => selected.join(', ')}
                        renderValue={(selectedCategories) => (
                          <div>
                            {selectedCategories.map((cat) => (
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
                              checked={projectForm.selectedCategories.indexOf(cat) > -1}
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
                      fullWidth
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
                        fullWidth
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
                        fullWidth
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
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Grid container item spacing={2}>
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
                        {/* <label htmlFor="raised-button-file">
                                                    <Button variant="raised" component="span" >
                                                        Upload
                                                    </Button>
                                                </label> */}
                      </FormControl>
                      {/* <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="raised-button-file"
                                                multiple
                                                type="file"
                                            />
                                            <label htmlFor="raised-button-file">
                                                <Button variant="raised" component="span" >
                                                    Upload
                                            </Button>
                                            </label> */}
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
                        {/* <label htmlFor="raised-button-file">
                                                    <Button variant="raised" component="span" >
                                                        Upload
                                                    </Button>
                                                </label> */}
                      </FormControl>
                      {/* <input
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="raised-button-file"
                                                multiple
                                                type="file"
                                            />
                                            <label htmlFor="raised-button-file">
                                                <Button variant="raised" component="span" >
                                                    Upload
                                            </Button>
                                            </label> */}
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions style={{ paddingTop: 0 }}>
                <Grid item>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={this.handleCreateProjectButtonClick}
                  >
                    Создать
                  </Button>
                </Grid>
              </CardActions>
            </Card>
          </Grid>
          <Grid item>
            <MembersCard members={projectForm.project_members} /* handleMemberAdd *//>
          </Grid>
        </Grid>
        <Dialog
          maxWidth="lg"
          onClose={this.handleCloseCreateCategoryModal}
          open={createCategoryModalIsOpen}
        >
          <DialogTitle>
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
              value={categoryForm.category_id}
              onChange={(e) => {
                console.log(e.target.value);
                this.setState({ categoryForm: { ...categoryForm, category_id: e.target.value } });
              }}
              fullWidth
            />
            <TextField
              label="Описание"
              InputLabelProps={{
                shrink: true,
              }}
              margin="dense"
              variant="outlined"
              size="small"
              value={categoryForm.description}
              onChange={(e) => {
                console.log(e.target.value);
                this.setState({ categoryForm: { ...categoryForm, description: e.target.value } });
              }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseCreateCategoryModal} color="primary">
              Отменить
            </Button>
            <Button
              onClick={this.handleSubmitCreateCategoryModal}
              variant="contained"
            >
              Создать
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
}
const mapStateToProps = (store) => ({
  categories: store.categories,
  currentUser: store.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategories()),
  createProject: (project) => dispatch(createProject(project)),
  createCategory: (category) => dispatch(createCategory(category)),
  deleteCategory: (categoryId) => dispatch(deleteCategory(categoryId)),
  // logout: () => dispatch(logout()),
  // removeErrors: () => dispatch(removeErrors())

});
export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreation);
