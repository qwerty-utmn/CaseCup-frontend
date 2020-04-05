import React, { Component } from 'react';
import {
  Button,
  Avatar,
  CardActions,
  CardContent,
  Card,
  CardHeader,
  ListItemAvatar,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import getInitials from '../heplers/getInitials';
import binaryArrayToBase64 from '../heplers/binaryArrayToBase64';

class MembersCard extends Component {
  render() {
    const {
      project_members,
      style,
      currentUser,
      project,
    } = this.props;
    return (
      <Card
        style={{ ...style }}
        margin="dense"
      >
        <CardHeader
          style={{ paddingBottom: 0 }}
          title="Участники"
          titleTypographyProps={{
            variant: 'overline',
          }}
        />
        <CardContent>
          <List>
            {project_members && project_members.map((member) => (
              <ListItem
                disableGutters
                key={member.user_id}
              >
                <ListItemAvatar>
                  <Avatar
                    component={RouterLink}
                    to={`/profiles/${member.user_id}`}
                    alt={`${member.surname} ${member.name}  ${member.middlename}`}
                    src={binaryArrayToBase64(member.user_photo)}
                  >
                    {!member.user_photo ? getInitials(member) : ''}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={member.name}
                  primaryTypographyProps={{ variant: 'h6' }}
                  secondary={member.role}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
        {currentUser && currentUser.user_id === project.creator.user_id && (
        <CardActions disableSpacing>
          <Button fullWidth>Управлять</Button>
        </CardActions>
        )}
      </Card>
    );
  }
}

export default MembersCard;
