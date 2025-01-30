import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import service from "../appwrite/config";
import { Container, PostForm } from "../components";

function EditPost() {
  const [post, setPost] = useState(null);
  const { articleID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (articleID) {
      service.getPost(articleID).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [articleID, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} articleID={articleID} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
