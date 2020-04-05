import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
} from '@material-ui/core';
import moment from 'moment';
import ShareIcon from '@material-ui/icons/Share';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAlt from '@material-ui/icons/ThumbDownAlt';
import Label from '../components/Label';
import getTabProps from '../heplers/getTabProps';
import TabPanel from '../components/tabPanel';
import ProjectSummary from '../components/projectSummary';
import MembersCard from '../components/membersCard';
import CommentsBox from '../components/commentsBox';
import ProjectSocialFeed from './projectSocialFeed';
import { createComment } from '../actions/comments';
import {
  getProject, createReaction, updateReaction, deleteReaction,
} from '../actions/projects';
import { getUserByToken } from '../actions/user';
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
      currentTab: 0,
    };
  }

  handleOpenApplyModal=() => {
    this.setState({ applyModalIsOpen: true });
  };

  handleCloseApplyModal=() => {
    this.setState({ applyModalIsOpen: false });
  };

  handleApplyApplyModal=() => {
    this.setState({ applyModalIsOpen: false });
  };

  handleMessageSend=(content) => {
    console.log('this.props.project', this.props.project);
    this.props.createComment(content, this.props.currentUser.user_id, this.props.project.project_id, moment(Date.now()).format('YYYY-MM-DD'));
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
        this.props.deleteReaction(project.project_id, currentUser.user_id);
      } else {
        this.props.updateReaction(project.project_id, reaction, currentUser.user_id);
      }
    } else {
      this.props.createReaction(project.project_id, reaction, currentUser.user_id);
    }
    this.props.getProject(project.project_id);
  };

  handleBecomeMember = () => {
    const { project, currentUser } = this.props;
    this.props.becomeMember(project.project_id, currentUser);
  };

  render() {
    const {
      project,
      currentUser,
    } = this.props;
    const {
      applyModalIsOpen,
      currentTab,
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
                    {project.project_status}
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
                  {project.project_members && (!project.project_members.some((member) => member.user_id === currentUser.user_id)) && (
                  <Button
                    style={{ color: '#FFFFFF', backgroundColor: '#4CAF50' }}
                    onClick={this.handleBecomeMember}
                    // onClick={this.handleOpenApplyModal}
                    variant="contained"
                  >
                    Принять участие
                  </Button>
                  )}
                  {project.creator.user_id === currentUser.user_id && (
                  <Button
                    style={{ color: '#FFFFFF', backgroundColor: '#4CAF50' }}
                    onClick={this.handleOpenApplyModal}
                    variant="contained"
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
                <Tab label="Новости" {...getTabProps(1)} />
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
                              <Typography>{project.description}</Typography>
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
                      />
                    </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={currentTab} index={1}>
                  {/* <ProjectSocialFeed /> */}
                </TabPanel>
              </Box>
              {/* <Dialog
                maxWidth="lg"
                onClose={this.handleCloseApplyModal}
                open={applyModalIsOpen}
              >
                <DialogTitle>
                  <Typography
                    gutterBottom
                    variant="h3"
                  >
                    Подача заявки на участие
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    <Typography
                      variant="subtitle2"
                    >
                      Чтобы подать заявку на участие в проекте, вам необходимо заполнить данную форму.
                    </Typography>
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label=""
                    type="email"
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
                  >
                    Подать заявку
                  </Button>
                </DialogActions>
              </Dialog> */}
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
    becomeMember: (projectId, userId) => dispatch(becomeMember(projectId, userId)),
    createReaction: (id, reaction, user_id) => dispatch(createReaction(id, reaction, user_id)),
    updateReaction: (id, reaction, user_id) => dispatch(updateReaction(id, reaction, user_id)),
    deleteReaction: (id, user_id) => dispatch(deleteReaction(id, user_id)),
    getProject: (id) => dispatch(getProject(id)),
    getUserByToken: (token) => dispatch(getUserByToken(token)),
  }),
)(Project));
