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
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atom/modalAtom";
import { useRouter } from "next/router";

const Comment = ({ originalPostId, commentId, comment }) => {
  const dateToFormat = comment?.timestamp?.toDate();
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const router = useRouter();

  const likeComment = async () => {
    if (session === null) {
      signIn();
      return;
    }

    if (hasLiked) {
      deleteDoc(
        doc(
          db,
          "posts",
          originalPostId,
          "comments",
          commentId,
          "likes",
          session?.user.uid
        )
      );
    } else {
      await setDoc(
        doc(
          db,
          "posts",
          originalPostId,
          "comments",
          commentId,
          "likes",
          session.user.uid
        ),
        {
          username: session.user.username,
        }
      );
    }
  };

  const deleteComment = async () => {
    if (confirm("Are you sure you want to delete this comment?")) {
      await deleteDoc(doc(db, "posts", originalPostId, "comments", commentId));
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", originalPostId, "comments", commentId, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
  }, [originalPostId, commentId]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [session?.user.uid, likes]);

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200 pl-20">
      {/* user Image */}
      <img
        src={comment?.userImg}
        alt="userPhoto"
        className="h-11 w-11 rounded-full object-cover mr-4"
      />

      {/* Right Side */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center justify-between">
          {/* post user info */}

          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {comment?.name}
            </h4>

            <span className="text-sm sm:text-[15px]">
              @{comment?.username} -
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
          {comment?.comment}
        </p>

        {/* Icons */}
        <div className="flex items-center justify-between text-gray-500 p-2">
          <div className="flex items-center select-none">
            <ChatBubbleOvalLeftEllipsisIcon
              onClick={() => {
                if (!session) {
                  signIn();
                  return;
                }
                setPostId(originalPostId);
                setOpen((prevState) => !prevState);
              }}
              className="hoverEffect w-9 h-9 p-2 hover:text-sky-500 hover:bg-sky-100"
            />
          </div>

          {session?.user.uid === comment?.userId && (
            <TrashIcon
              onClick={deleteComment}
              className="hoverEffect w-9 h-9 p-2 hover:text-red-600 hover:bg-red-100"
            />
          )}

          <div className="flex items-center select-none">
            {hasLiked ? (
              <HeartIconFill
                onClick={likeComment}
                className="w-9 h-9 p-2 text-red-500 hoverEffect hover:bg-red-100 "
              />
            ) : (
              <HeartIcon
                onClick={likeComment}
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

export default Comment;
