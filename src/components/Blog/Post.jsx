import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NotionRenderer } from "react-notion";
import "prismjs/themes/prism-tomorrow.css";
import "./Post.css";

export const Post = () => {
  const { pageId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`https://notion-api.splitbee.io/v1/page/${pageId}`);
      if (!response.ok) {
        console.error("Failed to fetch post content from Notion");
        return;
      }
      const postData = await response.json();
      console.log(post);
      setPost(postData);
    };

    fetchPost();
  }, [pageId]);

  return (
    <div className="post-container">
      {post ? (
        <NotionRenderer blockMap={post} fullPage={false} hideHeader={false}/>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};