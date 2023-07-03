/* eslint-disable @next/next/no-img-element */
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atom/modalAtom";
import Modal from "react-modal";
import {
  FaceSmileIcon,
  PhotoIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";
import { useSession } from "next-auth/react";

const CommentModal = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [post, setPost] = useState({});
  const [input, setInput] = useState("");

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (doc) => {
      setPost(doc.data());
    });
  }, [postId]);

  const sendComment = () => {};

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          ariaHideApp={false}
          className={
            "max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-300 rounded-xl shadow-md"
          }
        >
          <div className="p-1">
            <div className="border-b border-gray-200 py-2 px-1.5">
              <div
                onClick={() => setOpen(false)}
                className="hoverEffect w-9 h-9 flex justify-center items-center p-0"
              >
                <XCircleIcon className="h-[30px] w-[30px] text-gray-700" />
              </div>
            </div>

            <div className="p-2 flex items-center space-x-1 relative">
              <span className="w-0.5 h-full bg-gray-300 absolute top-[52px] left-8 -z-10" />
              <img
                src={post?.userImage}
                alt="userPhoto"
                className="h-11 w-11 rounded-full object-cover mr-4"
              />

              <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                {post?.name}
              </h4>

              <span className="text-sm sm:text-[15px]">
                @{post?.username} -{" "}
              </span>

              <span className="text-sm sm:text-[15px] hover:underline">
                <Moment date={post?.timestamp?.toDate()} fromNow />
              </span>
            </div>

            <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">
              {post?.text}
            </p>

            <div className="flex p-3 space-x-3">
              <img
                src={session?.user.image}
                width={100}
                height={100}
                alt="LOGO"
                className="w-11 h-11 rounded-full object-cover cursor-pointer hover:brightness-95"
              />

              <div className="w-full divide-y">
                <div className="">
                  <textarea
                    className="w-full border-none focus:ring-0 text-lg placeholder:text-gray-700 placeholder:tracking-wide min-h-[50px] text-gray-700"
                    rows="2"
                    placeholder="Tweet your reply"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2.5">
                  <div className="flex">
                    <div
                      className=""
                      // onClick={() => filePickerRef.current.click()}
                    >
                      <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      {/* <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      /> */}
                    </div>

                    <FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  </div>

                  <button
                    disabled={!input.trim()}
                    onClick={sendComment}
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CommentModal;

{
  /* {selectedFile && (
                    <div className="relative">
                      <XCircleIcon
                        className="h-7 text-red-500 absolute cursor-pointer"
                        onClick={() => setSelectedFile(null)}
                      />
                      <img
                        src={selectedFile}
                        alt=""
                        className={`${loading && "animate-pulse"}`}
                      />
                    </div>
                  )} */
}
