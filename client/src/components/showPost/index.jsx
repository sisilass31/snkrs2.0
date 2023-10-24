import React, { useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from 'mdb-react-ui-kit';
import axios from 'axios';

export default function App() {
  const [posts, setPosts] = useState([]); 

  useEffect(() => {
    // Fetch the posts using Axios when the component mounts
    axios.get("http://localhost:3306/post/getAll")
      .then((response) => {
        setPosts(response.data.posts); 
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <MDBCard key={post.id}>
          <MDBCardBody>
            <MDBCardTitle>{post.title}</MDBCardTitle>
            <MDBCardText>{post.description}</MDBCardText>
          </MDBCardBody>
        </MDBCard>
      ))}
    </div>
  );
}
