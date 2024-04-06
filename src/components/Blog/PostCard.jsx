import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const PostCard = ({ index, title, pageId }) => {
  const navigate = useNavigate();

  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div
          className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          <h3
            className="text-white text-[20px] font-bold text-center cursor-pointer"
            onClick={() => navigate(`/blog/post/${pageId}`)} 
          >
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};
