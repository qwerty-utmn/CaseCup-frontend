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
import ShareIcon from '@material-ui/icons/Share';
import { Link as RouterLink } from 'react-router-dom';
import Label from './Label';
import getInitials from '../heplers/getInitials';

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
  constructor(props) {
    super(props);
  }

  handleThumbUpClick=(e) => {
    console.log(e);
  };

  handleThumbDownClick=(e) => {
    console.log(e);
  };

  render() {
    const { project } = this.props;

    return (
      <>
        {project && (
        <Card>
          {project.creator && (
          <CardHeader
            style={{ paddingBottom: 0 }}
            title={<Link href={`/projects/${project.project_id}`}>{project.name}</Link>}
            subheader={(
              <Typography variant="body2">
                от
                {' '}
                <Link
                  href={`/profiles/${project.creator.creator_id}`}
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
                src={project.creator.user_photo || ''}
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
                    key={category.name}
                    style={{ marginLeft: 3 }}
                  >
                    {category.name}
                  </Label>
                ))}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions disableSpacing style={{ paddingTop: 0 }}>
            <IconButton onClick={this.handleThumbUpClick}>
              <ThumbUpAlt style={project.reaction && project.reaction === 0 ? rateButtonsStyles.liked : rateButtonsStyles.none} />
            </IconButton>
            <Typography>{project.reactionsCount}</Typography>
            <IconButton onClick={this.handleThumbDownClick}>
              <ThumbDownAlt style={project.reaction && project.reaction === 1 ? rateButtonsStyles.disliked : rateButtonsStyles.none} />
            </IconButton>
            {/* <IconButton>
              <ShareIcon />
            </IconButton> */}
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
