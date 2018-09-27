import React, { Component } from 'react';
import { PostWrapper, Navigate, Post } from '../../components';
import * as service from '../../services/post';

class PostContainer extends Component {
  constructor(props){
    super();

    this.state={
      postId:1,
      fetching: false,
      post: {
        title:null,
        body:null
      },
      comments: []
    }
  };

  fetchPostInfo = async(postId) => {
    this.setState({
      fetching: true
    })

    try {
      // wait for two promises
      const info = await Promise.all([
        service.getPost(postId),
        service.getComments(postId)
      ]);
      console.log(info);

      // Object destructuring syntax,
      // take out required values and create references to them
      const {title, body} = info[0].data;

      const comments = info[1].data;

      this.setState({
        postId,
        post: {
          title,
          body
        },
        comments,
        fetching: false //done!
      });
    } catch(e) {
      // if err, stop at this point
      this.setState({
        fetching: false
      });
      console.log('error occurred', e);
    }
  }

  componentDidMount() {
    this.fetchPostInfo(1);
  }

  handleNavigateClick = (type) => {
    const postId = this.state.postId;

    if(type === 'NEXT') {
      this.fetchPostInfo(postId+1);
    } else {
      this.fetchPostInfo(postId-1);
    }
  }

  render() {
    const {postId, fetching, post, comments} = this.state;
    //console.log('comments')
    //console.log(comments)

    return(
      <PostWrapper>
        <Navigate
          postId={postId}
          disabled={fetching}
          onClick={this.handleNavigateClick}
        />
        <Post
          title={post.title}
          body={post.body}
          comments={comments}
        />
      </PostWrapper>
    );
  }
}

export default PostContainer;
