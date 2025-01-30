import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import service from "../appwrite/config";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function Post() {
  const [post, setPost] = useState(null);
  const { articleID } = useParams();
  const navigate = useNavigate();   

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userID === userData.$id : false;

  useEffect(() => {
    if (articleID) {
      service.getPost(articleID).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    }
  }, [articleID, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.imageID);
        navigate("/");
      }
    });
  };
  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={service.getFilePreview(post.imageID)}
            alt={post.title}
            className=""
          />
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${articleID}`}>
                <Button className="mr-3" bgColor="bg-green-500">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full border rounded-xl p-2">
          <div className="w-full mb-6">
            <h1 className="text-3xl">{post.title}</h1>
          </div>
          <div className="browser-css text-xl">{parse(post.description)}</div>
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
