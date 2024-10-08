import React from "react";
import { HeartIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

interface Post {
    id: number;
    image: string;
    userProfile: string;
    userName: string;
    likes: number;
    comments: number;
    desc: string;
}

const PostCard = ({ post }: { post: Post }) => {
    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden ">
            <img
                src={post.image}
                alt="Post"
                className="w-full h-52 object-cover"
            />

            <div className="p-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <img
                            src={post.userProfile}
                            alt={`${post.userName}'s profile`}
                            className="w-10 h-10 rounded-full"
                        />
                        <span className="font-semibold text-gray-700">{post.userName}</span>
                    </div>

                    <div className="flex items-center space-x-4 text-gray-500">
                        <div className="flex items-center space-x-1">
                            <HeartIcon className="w-5 h-5 text-red-500" />
                            <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
                            <span>{post.comments}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-3 text-gray-700">
                    {post.desc}
                </div>
            </div>
        </div>
    );
};

export default PostCard
