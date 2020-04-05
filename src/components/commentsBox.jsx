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
    const {
      style,
      currentUser,
      handleMessageSend,
      project,
      comments,
    } = this.props;
    return (
      <Card
        style={{ ...style }}
      >
        <CardHeader
          style={{ paddingBottom: 0 }}
          title="Комментарии"
        />
        <CardContent style={{ paddingLeft: '16px', paddingRight: '16px' }}>
          {comments && (
            <>
              {comments.map((comment) => (
                <Comment
                  comment={comment}
                  key={comment.comment_id}
                />
              ))}
            </>
          )}
          <Divider />
          <CommentForm project={project} currentUser={currentUser} handleMessageSend={handleMessageSend} />
        </CardContent>
      </Card>
    );
  }
}

export default CommentsBox;
