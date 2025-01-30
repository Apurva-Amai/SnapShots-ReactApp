import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { PostCard, Container } from "../components";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   service.getPosts([]).then((posts) => {
  //     if(posts) {
  //       setPosts(posts.documents)
  //     }
  //   })
  // }, [])

  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts && posts.documents) {
        const userPosts = posts.documents.filter(
          (post) => post.userID === userData.$id
        );
        setPosts(userPosts);
        setLoading(false)
      }
    });

    
  }, [userData]);

  if(loading) {
    return (
      // <div className="text-5xl text-center font-serif py-10 my-28">
      //   Loading....
      // </div>
      <div className="flex items-center justify-center h-screen">
        <svg viewBox="25 25 50 50" className=''>
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    )
  }

  if(posts.length === 0) {
    return (
      <div className="text-5xl text-center font-serif py-10 my-28">
        Create Your First Post
      </div>
    )
  }
  
  
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
