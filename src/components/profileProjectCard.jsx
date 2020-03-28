import React, { Component } from 'react';
import {
  Typography,
  Button,
  Avatar,
  CardContent,
  Grid,
  Link,
  Card,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import smartEnding from '../heplers/wordSmartEnding';
import getInitials from '../heplers/getInitials';


class ProfileProjectCard extends Component {
  render() {
    const { project } = this.props;

    return (
      <Card>
        <CardContent>
          <Grid container justify="space-between">
            <Grid item>
              <Avatar alt={`${project.creator.surname} ${project.creator.name}  ${project.creator.middlename}`} src="">
                {!project.creator.user_photo ? getInitials(project.creator) : ''}
              </Avatar>
            </Grid>
            <Grid item style={{ width: '150px' }}>
              {/* color="colorTextPrimary" */}
              <Typography variant="h5" noWrap>
                <Link href={`/projects/${project.project_id}`}>{project.title}</Link>
              </Typography>
              <Typography variant="body2">
                от
                {' '}
                <Link
                  href={`/profiles/${project.creator.creator_id}`}
                  variant="h6"
                >
                  {`${project.creator.surname} ${project.creator.name}`}
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                {project.price}
              </Typography>
              <Typography variant="body2">
                Цена проекта
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                {project.members ? project.members.length : '0'}
              </Typography>
              <Typography variant="body2">
                {smartEnding(
                  project.members.lenght,
                  ['', 'a', 'ов'],
                  'участник',
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                {moment(project.startDate).format('DD.MM.YYYY')}
              </Typography>
              <Typography variant="body2">
                Дата начала
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                {moment(project.endDate).format('DD.MM.YYYY')}
              </Typography>
              <Typography variant="body2">
                Дата окончания
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                {project.currentState}
              </Typography>
              <Typography variant="body2">
                Текущий этап(стадия?)
              </Typography>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                component={RouterLink}
                to={`/projects/${project.id}`}
              >
                Посмотреть
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        {/* <CardActions disableSpacing style={{ paddingTop: 0 }}>
          <IconButton>
            <FavoriteIcon />
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
          <Button component={RouterLink} to={`/projects/${project.id}`}>
            Узнать больше
          </Button>
        </CardActions> */}
      </Card>
    );
  }
}

export default ProfileProjectCard;
