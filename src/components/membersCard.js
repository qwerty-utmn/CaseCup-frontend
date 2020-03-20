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

class MembersCard extends Component {
  render() {
    const { members, style } = this.props;
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
            {members.map((member) => (
              <ListItem
                disableGutters
                key={member.id}
              >
                <ListItemAvatar>
                  <Avatar
                    component={RouterLink}
                    to={`/profiles/${member.id}`}
                    alt={`${member.surname} ${member.name}  ${member.middlename}`}
                    src={member.image}
                  >
                    {!member.image
                      ? (`${member.surname[0]}${member.name[0]}${member.middlename[0]}`)
                      : ''}
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
        <CardActions disableSpacing>
          <Button fullWidth>Управлять</Button>
        </CardActions>
      </Card>
    );
  }
}

export default MembersCard;
