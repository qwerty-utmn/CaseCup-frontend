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
              <Avatar alt={`${project.author.surname} ${project.author.name}  ${project.author.middlename}`} src="">
                {!project.author.user_photo ? getInitials(project.author) : ''}
              </Avatar>
            </Grid>
            <Grid item style={{ width: '150px' }}>
              {/* color="colorTextPrimary" */}
              <Typography variant="h5" noWrap>
                <Link href={`/projects/${project.id}`}>{project.name}</Link>
              </Typography>
              <Typography variant="body2">
                от
                {' '}
                <Link
                  href={`/profiles/${project.author.id}`}
                  variant="h6"
                >
                  {`${project.author.surname} ${project.author.name}`}
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
                {project.startDate}
              </Typography>
              <Typography variant="body2">
                Дата начала
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                {project.endDate}
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
