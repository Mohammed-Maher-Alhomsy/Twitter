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

import { HeartIcon as HeartIconFill } from "@heroicons/react/24/solid";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import Moment from "react-moment";
import { db, storage } from "../firebase";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { deleteObject, ref } from "firebase/storage";

const Post = ({ post }) => {
  const dateToFormat = post?.data()?.timestamp?.toDate();
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  const likePost = async () => {
    if (session === null) {
      signIn();
      return;
    }

    if (hasLiked) {
      deleteDoc(doc(db, "posts", post.id, "likes", session?.user.uid));
    } else {
      await setDoc(doc(db, "posts", post.id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const deletePost = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      await deleteDoc(doc(db, "posts", post.id));

      if (post.data().image) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        deleteObject(imageRef);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", post.id, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
  }, [post.id]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [session?.user.uid, likes]);

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

        {post.data().image && (
          <img
            src={post.data().image}
            className="rounded-2xl mr-2"
            loading="lazy"
            width={500}
            height={500}
          />
        )}

        {/* Icons */}

        <div className="flex items-center justify-between text-gray-500 p-2">
          <ChatBubbleOvalLeftEllipsisIcon className="hoverEffect w-9 h-9 p-2 hover:text-sky-500 hover:bg-sky-100" />

          {session?.user.uid === post?.data().id && (
            <TrashIcon
              onClick={deletePost}
              className="hoverEffect w-9 h-9 p-2 hover:text-red-600 hover:bg-red-100"
            />
          )}

          <div className="flex items-center">
            {hasLiked ? (
              <HeartIconFill
                onClick={likePost}
                className="w-9 h-9 p-2 text-red-500 hoverEffect hover:bg-red-100 "
              />
            ) : (
              <HeartIcon
                onClick={likePost}
                className="hoverEffect w-9 h-9 p-2 hover:text-red-600 hover:bg-red-100"
              />
            )}
            {likes.length > 0 && (
              <span className={`${hasLiked && "text-red-500"} text-sm`}>
                {likes.length}
              </span>
            )}
          </div>

          <ShareIcon className="hoverEffect w-9 h-9 p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="hoverEffect w-9 h-9 p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
};

export default Post;
