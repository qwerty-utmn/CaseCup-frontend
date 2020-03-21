import React, { Component } from 'react';
import {
  CardContent,
  Card,
  CardHeader,
  Divider,
} from '@material-ui/core';
import CommentForm from './commentForm';
import Comment from './comment';

class CommentsBox extends Component {
  render() {
    const { style, currentUser, handleMessageSend } = this.props;
    const comments = [{
      id: '0',
      creator_id: {
        user_photo: null,
        name: 'HUI',
        surname: 'HUEVII',
      },
      created_at: '2020-02-18 05:58:48',
      content: 'YA LOMAL STEKLOOOOO',
    },
    {
      id: '1',
      creator_id: {
        user_photo: null,
        name: 'HUI',
        surname: 'HUEVII',
      },
      created_at: '2020-02-18 05:58:48',
      content: 'YA LOMAL STEKLOOOOO',
    },
    {
      id: '2',
      creator_id: {
        user_photo: null,
        name: 'HUI',
        surname: 'HUEVII',
      },
      created_at: '2020-02-18 05:58:48',
      content: 'YA LOMAL STEKLOOOOO',
    },
    ];
    return (
      <Card
        style={{ ...style }}
      >
        <CardContent style={{ paddingLeft: '16px', paddingRight: '16px' }}>
          {comments && (
            <>
              {comments.map((comment) => (
                <Comment
                  comment={comment}
                  key={comment.id}
                />
              ))}
            </>
          )}
          <Divider />
          <CommentForm currentUser={currentUser} handleMessageSend={handleMessageSend} />
        </CardContent>
      </Card>
    );
  }
}

export default CommentsBox;
