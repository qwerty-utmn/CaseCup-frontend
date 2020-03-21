import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';

import {
  Card,
  CardHeader,
  Avatar,
  Typography,
  CardContent,
  List,
  ListItem,
  Grid,
} from '@material-ui/core';
import Label from './Label';
import getInitials from '../heplers/getInitials';

class ProjectSummary extends Component {
  render() {
    const { project } = this.props;
    return (
      <>
        {project && (
        <Card>
          <CardHeader
            style={{ paddingBottom: 0 }}
            avatar={(
              <Avatar
                component={RouterLink}
                to={`/profiles/${project.creator_id}`}
                alt={`${project.author.surname} ${project.author.name}  ${project.author.middlename}`}
                src={project.author.user_photo}
              >
                {!project.author.user_photo ? getInitials(project.author) : ''}
              </Avatar>
          )}
            disableTypography
            subheader={(
              <Typography
                component={RouterLink}
                to={`/profiles/${project.author.id}`}
                variant="h5"
              >
                {project.author.name}
              </Typography>
        )}
            title={(
              <Typography
                display="block"
                variant="overline"
              >
                Автор предложения
              </Typography>
        )}
          />
          <CardContent style={{ paddingTop: 0 }}>
            <List>
              <ListItem
                disableGutters
                divider
                style={{ justifyContent: 'space-between' }}
              >
                <Typography variant="subtitle2">Дата создания</Typography>
                <Typography variant="h6">
                  {moment(project.startDate).format('DD MM YYYY')}
                </Typography>
              </ListItem>
              <ListItem
                disableGutters
                divider
                style={{ justifyContent: 'space-between' }}
              >
                <Typography variant="subtitle2">Дедлайн</Typography>
                <Typography variant="h6">
                  {moment(project.endDate).format('DD MM YYYY')}
                </Typography>
              </ListItem>
              <ListItem
                disableGutters
                divider
                style={{ justifyContent: 'space-between' }}
              >
                <Typography variant="subtitle2">Оценочная стоимость</Typography>
                <Typography variant="h6">
                  {`${project.price} РУБ`}
                </Typography>
              </ListItem>
              <ListItem
                disableGutters
                divider
                style={{ justifyContent: 'space-between' }}
              >
                <Grid container>
                  <Grid item xs={5}>
                    <Typography variant="subtitle2">Категории</Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Grid container justify="flex-end">
                      {project.categories.map((category) => (
                        <Grid key={category.name} item>
                          <Label
                            color={category.color}
                            style={{ marginLeft: 3 }}
                          >
                            {category.name}
                          </Label>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem
                disableGutters
                divider
                style={{ justifyContent: 'space-between' }}
              >
                <Typography variant="subtitle2">Последнее обновление</Typography>
                <Typography variant="h6">
                  {moment(project.updatedAt).format('DD MM YYYY')}
                </Typography>
              </ListItem>
            </List>
          </CardContent>
        </Card>
        )}
      </>
    );
  }
}

export default ProjectSummary;
