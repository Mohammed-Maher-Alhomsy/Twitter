import {
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

const Post = ({ post }) => {
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/* user Image */}
      <Image
        src={post.userImg}
        alt="userPhoto"
        className="h-11 w-11 rounded-full object-cover mr-4"
        width={200}
        height={200}
      />

      {/* Right Side */}
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* post user info */}

          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post.name}
            </h4>

            <span className="text-sm sm:text-[15px]">@{post.username} -</span>
            <span className="text-sm sm:text-[15px] hover:underline">
              {post.timestamp}
            </span>
          </div>

          {/* Icon */}
          <EllipsisHorizontalIcon className="hoverEffect h-10 w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>

        {/* Post Text */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
          {post.text}
        </p>

        {/* Post Image */}

        <Image
          width={500}
          height={500}
          src={post.img}
          className="rounded-2xl mr-2"
          alt="postImage"
        />

        {/* Icons */}

        <div className="flex items-center justify-between text-gray-500 p-2">
          <ChatBubbleOvalLeftEllipsisIcon className="hoverEffect w-9 h-9 p-2 hover:text-sky-500 hover:bg-sky-100" />
          <TrashIcon className="hoverEffect w-9 h-9 p-2 hover:text-red-600 hover:bg-red-100" />
          <HeartIcon className="hoverEffect w-9 h-9 p-2 hover:text-red-600 hover:bg-red-100" />
          <ShareIcon className="hoverEffect w-9 h-9 p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="hoverEffect w-9 h-9 p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
};

export default Post;
