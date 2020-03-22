import React, { Component } from 'react';
import { connect } from 'react-redux';
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
      project: null,
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


  render() {
    // const{project,user=this.props;
    const project = {
      id: '2',
      title: 'SECOND PROJECTJECT dasdasd',
      reactionsCount: '1000',
      author: {
        id: '2',
        name: 'ALexey',
        surname: 'Baynov',
        middlename: 'Sergeevich',
        image: '',
      },
      price: '1000',
      members: [],
      startDate: '22.01.2019',
      updatedAt: '22.01.2019',
      endDate: '22.01.2019',
      currentState: {
        id: '0',
        title: 'Обсуждение',
        color: '#4CAF50',
      },
      description:
        'We looking for experienced Developers and Product Designers to come aboard and help us build succesful businesses through software.',
      categories: [
        { name: 'Компьютер', color: '#AAA' },
        { name: 'Компьютер', color: '#AAA' },
        { name: 'Компьютер', color: '#AAA' },
        { name: 'Компьютер', color: '#AAA' },
        { name: 'Компьютер', color: '#AAA' },
      ],
    };
    const currentUser = {
      id: '2',
      name: 'ALexey',
      surname: 'Baynov',
      middlename: 'Sergeevich',
      image: '',
    };
    const {
      applyModalIsOpen,
      currentTab,
    } = this.state;
    return (
      <Container>
        {project && (
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
                  color={project.currentState.color}
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
                <IconButton onClick={this.handleThumbUpClick}>
                  <ThumbUpAlt style={project.reaction && project.reaction === 0 ? rateButtonsStyles.liked : rateButtonsStyles.none} />
                </IconButton>
                <Typography>{project.reactionsCount}</Typography>
                <IconButton onClick={this.handleThumbDownClick}>
                  <ThumbDownAlt style={project.reaction && project.reaction === 1 ? rateButtonsStyles.disliked : rateButtonsStyles.none} />
                </IconButton>
                <Button
                  style={{ color: '#FFFFFF', backgroundColor: '#4CAF50' }}
                  onClick={this.handleOpenApplyModal}
                  variant="contained"
                >
                  Принять участие
                </Button>
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
                        <CommentsBox comments={project.comments} currentUser={currentUser} handleMessageSend={this.handleMessageSend} />
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
                      members={project.members}
                      style={{ marginTop: '24px' }}
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
                  label="Email Address"
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
            </Dialog>
          </>
        )}
      </Container>
    );
  }
}
const mapStateToProps = (store) => ({
  project: store.project,
  currentUser: store.currentUser,
});
const mapDispatchToProps = (/* dispatch */) => ({
  // getProject: (id) => dispatch(getProject(id)),
  // getProject: (id) => dispatch(getProject(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Project);
