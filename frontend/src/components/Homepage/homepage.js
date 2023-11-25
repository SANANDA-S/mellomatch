import React, { useState, useEffect } from 'react';
import Sidebar from '../sidebar/sidebar';
import './homepage.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [commentText, setCommentText] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [comments, setComments] = useState({});

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          console.log('Decoded Token:', decodedToken);
          setCurrentUser(decodedToken);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    };

    const fetchAllPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/posts');
        
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchCurrentUser();
    fetchAllPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token || !currentUser || !currentUser.userId) {
        console.error('No current user or user ID available.');
        return;
      }

      const response = await axios.post('http://localhost:4000/posts', {
        user: currentUser.userId,
        content: newPost,
      });
      setPosts([response.data, ...posts]);
      setNewPost('');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  
  useEffect(() => {
    const fetchAllComments = async () => {
      try {
        const commentData = {};
        await Promise.all(
          posts.map(async (post) => {
            const response = await axios.get(
              `http://localhost:4000/posts/${post.id}/comments`
            );
            commentData[post.id] = response.data;
          })
        );
        setComments(commentData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
  
    fetchAllComments();
  }, [posts]);

  const handleCommentSubmit = async (postId) => {
    try {
      const response = await axios.post(`http://localhost:4000/posts/${postId}/comments`, {
      user: currentUser.userId,
      text: commentText,
      post: postId, // Ensure 'post' field is included with the correct postId
    });
  
      const updatedComments = { ...comments };
      updatedComments[postId] = [...(updatedComments[postId] || []), response.data];
  
      setComments(updatedComments);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };


  return (
    <div className="home-container">
      <Sidebar />
      <form onSubmit={handlePostSubmit}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Write your post here..."
          rows={4}
          cols={50}
        />
        <button type="submit">Post</button>
      </form>

      <div className="posts-container">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <p>User: {post.user ? post.user.name : 'Unknown'}</p>
            <p>Content: {post.content}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommentSubmit(post.id);
              }}
            >
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
              />
              <button type="submit">Comment</button>
            </form>
            <div>
              {Array.isArray(comments[post.id]) &&
                comments[post.id].map((comment) => (
                  <p key={comment.id}>{comment.text}</p>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
