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
import binaryArrayToBase64 from '../heplers/binaryArrayToBase64';

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
                to={`/profiles/${project.creator.user_id}`}
                alt={`${project.creator.surname} ${project.creator.name}  ${project.creator.middlename}`}
                src={binaryArrayToBase64(project.creator.user_photo)}
              >
                {!project.creator.user_photo ? getInitials(project.creator) : ''}
              </Avatar>
            )}
            disableTypography
            subheader={(
              <Typography
                component={RouterLink}
                to={`/profiles/${project.creator.user_id}`}
                variant="h5"
              >
                {`${project.creator.surname} ${project.creator.name}`}
              </Typography>
            )}
            title={(
              <Typography
                display="block"
                variant="overline"
              >
                Автор проекта
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
                  {moment(project.start_datetime).format('DD MM YYYY')}
                </Typography>
              </ListItem>
              <ListItem
                disableGutters
                divider
                style={{ justifyContent: 'space-between' }}
              >
                <Typography variant="subtitle2">Дедлайн</Typography>
                <Typography variant="h6">
                  {moment(project.end_datetime).format('DD MM YYYY')}
                </Typography>
              </ListItem>
              <ListItem
                disableGutters
                divider
                style={{ justifyContent: 'space-between' }}
              >
                <Typography variant="subtitle2">Оценочная стоимость</Typography>
                <Typography variant="h6">
                  {`${+project.price} РУБ`}
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
                            // color={category.color}
                            color="#4CAF50"
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
