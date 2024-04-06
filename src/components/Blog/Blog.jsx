import React, { useState, useEffect } from "react";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { NotionRenderer } from "react-notion-x";

export const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        const tableId = "df3d54a7716e4705b6b0cd4cacbc23e9";
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

    const handlePostClick = async (pageId) => {
        
        const response = await fetch(`https://notion-api.splitbee.io/v1/page/${pageId}`);
        if (!response.ok) {
            console.error("Failed to fetch post content from Notion");
            return;
        }
        const postData = await response.json();
        setSelectedPost(postData);
    };

    return (
        <div className='h-screen flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-bold mb-4'>Blog Posts</h1>
            {posts.length > 0 ? (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id} style={{marginBottom: "10px"}}>
                            <button onClick={() => handlePostClick(post.id)} style={{background: "none", border: "none", padding: "0", color: "blue", textDecoration: "underline", cursor: "pointer"}}>
                                {post.Name}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
            {selectedPost && (
                <div style={{marginTop: "20px"}}>
                    <NotionRenderer blockMap={selectedPost} />
                </div>
            )}
        </div>
    );
};
