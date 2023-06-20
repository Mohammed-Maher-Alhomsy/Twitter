import Image from "next/image";
import Img from "../assets/images/React.png";
import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/outline";

const Input = () => {
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
      <Image
        src={Img}
        width={100}
        height={100}
        alt="LOGO"
        className="w-11 h-11 rounded-full object-cover cursor-pointer hover:brightness-95"
      />

      <div className="w-full divide-y ">
        <div className="">
          <textarea
            className="w-full border-none focus:ring-0 text-lg placeholder:text-gray-700 placeholder:tracking-wide min-h-[50px] text-gray-700"
            rows="2"
            placeholder="What's happening"
          ></textarea>
        </div>

        <div className="flex items-center justify-between pt-2.5">
          <div className="flex">
            <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
            <FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
          </div>
          <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
