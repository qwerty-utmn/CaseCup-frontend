import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link as RouterLink } from 'react-router-dom';

import {
  Typography,
  Grid,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  DialogContentText,
  Divider,
  Tabs,
  Tab,
  Card,
  CardContent,
  IconButton,
  CardHeader,
  Box,
  Avatar,
} from '@material-ui/core';
import moment from 'moment';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAlt from '@material-ui/icons/ThumbDownAlt';
import Label from '../components/Label';
import getTabProps from '../heplers/getTabProps';
import TabPanel from '../components/tabPanel';
import ProjectSummary from '../components/projectSummary';
import MembersCard from '../components/membersCard';
import CommentsBox from '../components/commentsBox';
import { createComment } from '../actions/comments';
import {
  getProject,
  createReaction,
  updateReaction,
  deleteReaction,
  updateProject,
  removeMember,
} from '../actions/projects';
import { getUserByToken } from '../actions/user';
import ManageModal from '../components/manageModal';

import { becomeMember } from '../actions/members';

const rateButtonsStyles = {
  liked: {
    color: 'rgba(0, 0, 0, 1)',
  },
  disliked: {
    color: 'rgba(0, 0, 0, 1)',
  },
  none: {
    color: 'rgba(0, 0, 0, 0.3)',
  },
};
class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applyModalIsOpen: false,
      role: '',
      currentTab: 0,
      manageModalIsOpen: false,
    };
  }

  handleSubmitManageModal=() => {
  };

  handleOpenManageModal=() => {
    this.setState({
      manageModalIsOpen: true,
    });
  };

  handleCloseManageModal=() => {
    this.setState({ manageModalIsOpen: false });
  };

  handleOpenApplyModal=() => {
    this.setState({ applyModalIsOpen: true });
  };

  handleCloseApplyModal=() => {
    this.setState({ applyModalIsOpen: false, role: '' });
  };

  handleApplyApplyModal=() => {
    this.setState({ applyModalIsOpen: false });
    const { project, currentUser } = this.props;
    const { role } = this.state;
    this.props.becomeMember(project.project_id, currentUser.user_id, role);
  };

  handleMessageSend=(content) => {
    const { project, currentUser } = this.props;
    this.props.createComment(content, currentUser.user_id, project.project_id, moment(Date.now()).format('YYYY-MM-DD'));
    this.props.getProject(project.project_id);
  };

  componentDidMount=() => {
    const token = localStorage.getItem('token');
    this.props.getUserByToken(token);

    const project_id = this.props.match.params.projectId;
    console.log(project_id);
    if (project_id) {
      this.props.getProject(project_id);
    } else {
      this.props.history.push('/projects');
    }
  }

  handleThumbClick = (reaction) => {
    const { project, currentUser } = this.props;
    const prevUserReaction = project.project_reaction.find((item) => item.user_id === currentUser.user_id);
    if (prevUserReaction) {
      if (prevUserReaction.reaction === +reaction) {
        this.props.deleteReaction(project.project_id, reaction, currentUser.user_id);
      } else {
        this.props.updateReaction(project.project_id, reaction, currentUser.user_id);
      }
    } else {
      this.props.createReaction(project.project_id, reaction, currentUser.user_id);
    }
  };

  render() {
    const {
      project,
      currentUser,
    } = this.props;
    const {
      applyModalIsOpen,
      currentTab,
      role,
      manageModalIsOpen,
    } = this.state;

    const userReaction = project
      && project.project_reaction
      && project.project_reaction.find((reaction) => reaction.user_id === 1);
    return (
      <Container>
        <>
          {project && project.project_id && (
            <>
              <Grid
                alignItems="flex-end"
                container
                justify="space-between"
                spacing={3}
              >
                <Grid item>
                  <Typography
                    component="h2"
                    gutterBottom
                    variant="overline"
                  >
                    Описание проекта
                  </Typography>
                  <Typography
                    component="h1"
                    gutterBottom
                    variant="h3"
                  >
                    {project.title}
                  </Typography>
                  <Label
                    color={project.project_status.color || '#AAA'}
                    variant="outlined"
                  >
                    {`${project._blocked ? 'Заблокирован' : 'Новый'}`}
                  </Label>
                </Grid>
                <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                  {/* <Button
                    style={{ marginRight: '8px', backgroundColor: '#FFFFFF' }}
                    variant="contained"
                  >
                    <ShareIcon
                      style={{ marginRight: '4px' }}
                    />
                    Поделиться
                  </Button> */}
                  {!project._blocked && (
                    <>
                      <IconButton style={{ marginRight: '8px' }} onClick={() => this.handleThumbClick(true)} size="small">
                        <ThumbUpAlt
                          style={userReaction && userReaction.reaction
                            ? rateButtonsStyles.liked
                            : rateButtonsStyles.none}
                        />
                      </IconButton>
                      <Typography style={{ marginRight: '8px' }}>{project.likes - project.dislikes}</Typography>
                      <IconButton style={{ marginRight: '8px' }} onClick={() => this.handleThumbClick(false)} size="small">
                        <ThumbDownAlt
                          style={userReaction && !userReaction.reaction
                            ? rateButtonsStyles.disliked
                            : rateButtonsStyles.none}
                        />
                      </IconButton>
                    </>
                  )}
                  {!project._blocked
                  && currentUser.user_id === 1
                  && (
                    <Button
                      style={{ color: '#FFFFFF', backgroundColor: '#8e1717', marginRight: '15px' }}
                      onClick={() => {
                        this.props.updateProject({
                          ...project,
                          categories: project.categories.map((item) => item.category_id),
                          _blocked: true,
                        // creator: { user_id: `${this.props.currentUser.user_id}` },
                        });
                        this.props.getProject(project.project_id);
                      }}
                      variant="contained"
                    >
                      Заблокировать
                    </Button>
                  )}
                  {project.project_members
                  && !project.project_members.some((member) => member.user.user_id === currentUser.user_id)
                  && !project._blocked
                  && (
                    <Button
                      style={{ color: '#FFFFFF', backgroundColor: '#4CAF50' }}
                      onClick={this.handleOpenApplyModal}
                      variant="contained"
                    >
                      Принять участие
                    </Button>
                  )}
                  {(project.creator.user_id !== currentUser.user_id) && project.project_members
                  && project.project_members.some((member) => member.user.user_id === currentUser.user_id)
                  && !project._blocked
                  && (
                    <Button
                      style={{ color: '#FFFFFF', backgroundColor: '#4CAF50' }}
                      onClick={() => {
                        this.props.removeMember(project.project_id, currentUser.user_id);
                        this.props.getProject(project.project_id);
                      }}
                      variant="contained"
                    >
                      Покинуть проект
                    </Button>
                  )}
                  {project.creator.user_id === currentUser.user_id
                  && !project._blocked
                  && (
                    <Button
                      style={{ color: '#FFFFFF', backgroundColor: '#4CAF50' }}
                      variant="contained"
                      component={RouterLink}
                      to={`/projects/edit/${project.project_id}`}
                    >
                      Изменить
                    </Button>
                  )}
                </Grid>
              </Grid>
              <Tabs
                value={currentTab}
                onChange={(e, newValue) => {
                  this.setState({ currentTab: newValue });
                }}
              >
                <Tab label="Основная информация" {...getTabProps(0)} />
              </Tabs>
              <Divider />
              <Box>
                <TabPanel value={currentTab} index={0}>
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid
                      item
                      lg={8}
                      xl={9}
                      xs={12}
                    >
                      <Grid
                        container
                        spacing={3}
                        direction="column"
                      >
                        <Grid
                          item
                        >
                          <Card>
                            <CardHeader
                              style={{ paddingBottom: 0 }}
                              title="Описание"
                            />
                            <CardContent>
                              <Typography style={{ wordBreak: 'break-all' }}>{project.description}</Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                        <Grid
                          item
                        >
                          <CommentsBox
                            project={project}
                            comments={project.comments}
                            currentUser={currentUser}
                            handleMessageSend={this.handleMessageSend}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      lg={4}
                      xl={3}
                      xs={12}
                    >
                      <ProjectSummary project={project} />
                      <MembersCard
                        currentUser={currentUser}
                        project={project}
                        project_members={project.project_members}
                        style={{ marginTop: '24px' }}
                        handleManageClick={this.handleOpenManageModal}
                      />
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={currentTab} index={1}>
                  {/* <ProjectSocialFeed /> */}
                </TabPanel>
              </Box>
              <Dialog
                maxWidth="lg"
                onClose={this.handleCloseApplyModal}
                open={applyModalIsOpen}
              >
                <DialogTitle disableTypography>
                  <Typography
                    gutterBottom
                    variant="h3"
                  >
                    Подача заявки на участие
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText variant="subtitle2">
                    Чтобы подать заявку на участие в проекте, вам необходимо заполнить данную форму.
                  </DialogContentText>
                  <TextField
                    label="Желаемая роль"
                    name="role"
                    value={role}
                    onChange={(e) => this.setState({ role: e.target.value })}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleCloseApplyModal} color="primary">
                    Отменить
                  </Button>
                  <Button
                    onClick={this.handleApplyApplyModal}
                    variant="contained"
                    style={{ color: '#FFFFFF', backgroundColor: '#4CAF50' }}
                  >
                    Подать заявку
                  </Button>
                </DialogActions>
              </Dialog>
              <ManageModal
                handleSubmitManageModal={this.handleSubmitManageModal}
                handleCloseManageModal={this.handleCloseManageModal}
                manageModalIsOpen={manageModalIsOpen}
                project_members={project.project_members}
              />
            </>
          )}
        </>
      </Container>
    );
  }
}

export default withRouter(connect(
  (state) => ({
    project: state.project,
    currentUser: state.currentUser,
  }),
  (dispatch) => ({
    createComment: (content, userId, projectId, datetime) => dispatch(createComment(content, userId, projectId, datetime)),
    becomeMember: (projectId, userId, role) => dispatch(becomeMember(projectId, userId, role)),
    createReaction: (id, reaction, user_id) => dispatch(createReaction(id, reaction, user_id)),
    updateReaction: (id, reaction, user_id) => dispatch(updateReaction(id, reaction, user_id)),
    deleteReaction: (id, reaction, user_id) => dispatch(deleteReaction(id, reaction, user_id)),
    getProject: (id) => dispatch(getProject(id)),
    updateProject: (project) => dispatch(updateProject(project)),
    getUserByToken: (token) => dispatch(getUserByToken(token)),
    removeMember: (project_id, user_id) => dispatch(removeMember(project_id, user_id)),
  }),
)(Project));
