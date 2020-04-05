import React, { Component } from 'react';
import {
  Typography,
  Button,
  Avatar,
  CardActions,
  IconButton,
  CardContent,
  Grid,
  Link,
  Card,
  CardHeader,
} from '@material-ui/core';
import moment from 'moment';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAlt from '@material-ui/icons/ThumbDownAlt';
import { Link as RouterLink } from 'react-router-dom';
import Label from './Label';
import getInitials from '../heplers/getInitials';
import binaryArrayToBase64 from '../heplers/binaryArrayToBase64';

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

class ProjectCard extends Component {
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
    this.props.getProjects();
  };

  render() {
    const { project, currentUser } = this.props;
    const userReaction = project
      && project.project_reaction
      && project.project_reaction.find((reaction) => reaction.user_id === currentUser.user_id);

      return (
      <>
        {project && (
        <Card className={`${project.isBlocked ? 'blocked-card' : ''}`}>
          {project.creator && (
          <CardHeader
            style={{ paddingBottom: 0 }}
            title={(
              <Typography
                variant="h5"
                noWrap
              >
                <Link href={`/projects/${project.project_id}`}>{project.title}</Link>
              </Typography>
            )}
            subheader={(
              <Typography variant="body2">
                от
                {' '}
                <Link
                  href={`/profiles/${project.creator.user_id}`}
                  variant="h6"
                >
                  {`${project.creator.surname || ''} ${project.creator.name || ''}`}
                </Link>
                {' | '}
                {moment(project.start_datetime).format('DD.MM.YYYY')}
              </Typography>
          )}
            avatar={(
              <Avatar
                alt={`${project.creator.surname || ''}
                  ${project.creator.name || ''} 
                  ${project.creator.middlename || ''}`}
                src={binaryArrayToBase64(project.creator.user_photo)}
              >
                {!project.creator.user_photo ? getInitials(project.creator) : ''}
              </Avatar>
            )}
          />
          )}
          <CardContent>
            <Grid container spacing={1}>
              <Grid item>
                <Typography variant="subtitle2">{project.description}</Typography>
              </Grid>
              <Grid item>
                {project.categories.map((category) => (
                  <Label
                    color={category.color}
                    key={category.category_id}
                    style={{ marginLeft: 3 }}
                  >
                    {category.category_id}
                  </Label>
                ))}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions style={{ paddingTop: 0 }}>
            {!project.isBlocked && (
              <>
                <IconButton name="like" onClick={() => this.handleThumbClick(true)} size="small">
                  <ThumbUpAlt
                    style={userReaction && userReaction.reaction
                      ? rateButtonsStyles.liked
                      : rateButtonsStyles.none}
                  />
                </IconButton>
                <Typography>{project.likes - project.dislikes}</Typography>
                <IconButton name="dislike" onClick={() => this.handleThumbClick(false)} size="small">
                  <ThumbDownAlt
                    style={userReaction && !userReaction.reaction
                      ? rateButtonsStyles.disliked
                      : rateButtonsStyles.none}
                  />
                </IconButton>
              </>
            )}
            <Button component={RouterLink} to={`/projects/${project.project_id}`}>
              Узнать больше
            </Button>
          </CardActions>
        </Card>
        )}
      </>
    );
  }
}

export default ProjectCard;
