/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Moment from "react-moment";

const Post = ({ post }) => {
  const dateToFormat = post.data().timestamp.toDate();

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/* user Image */}
      <img
        src={post.data().userImage}
        alt="userPhoto"
        className="h-11 w-11 rounded-full object-cover mr-4"
      />

      {/* Right Side */}
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* post user info */}

          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post.data().name}
            </h4>

            <span className="text-sm sm:text-[15px]">
              @{post.data().username} -
            </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment date={dateToFormat} fromNow />
            </span>
          </div>

          {/* Icon */}
          <EllipsisHorizontalIcon className="hoverEffect h-10 w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>

        {/* Post Text */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
          {post.data().text}
        </p>

        {/* Post Image */}

        <img
          src={post.data().image}
          className="rounded-2xl mr-2"
          loading="lazy"
          width={500}
          height={500}
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
