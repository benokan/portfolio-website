import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostCard } from "./PostCard";

export const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tableId = import.meta.env.VITE_APP_TABLE_ID;
    const fetchPosts = async () => {
      const response = await fetch(`https://notion-api.splitbee.io/v1/table/${tableId}`);
      if (!response.ok) {
        console.error("Failed to fetch posts from Notion");
        return;
      }
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Blog Posts</h1>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <PostCard key={post.id} index={index} title={post.Name} pageId={post.pageId} />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
