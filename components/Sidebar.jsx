import Image from "next/image";
import Img from "../assets/images/React.png";

import { HomeIcon } from "@heroicons/react/24/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import SidebarMenuItem from "./SidebarMenuItem";

const Sidebar = () => {
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full">
      <div className="hoverEffect p-0 hover:bg-blue-100">
        <Image
          src={
            "https://twitter-v3.vercel.app/_next/image?url=https%3A%2F%2Fhelp.twitter.com%2Fcontent%2Fdam%2Fhelp-twitter%2Fbrand%2Flogo.png&w=64&q=75"
          }
          alt="LOGO"
          width={50}
          height={50}
        />
      </div>

      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItem text="Home" Icon={HomeIcon} active />
        <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
        <SidebarMenuItem text="Notifications" Icon={BellIcon} />
        <SidebarMenuItem text="Messages" Icon={InboxIcon} />
        <SidebarMenuItem text="BookMark" Icon={BookmarkIcon} />
        <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
        <SidebarMenuItem text="Profile" Icon={UserIcon} />
        <SidebarMenuItem text="More" Icon={EllipsisHorizontalCircleIcon} />
      </div>

      <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
        Tweet
      </button>

      <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
        <Image
          className="w-10 h-10 rounded-full object-cover xl:mr-2"
          src={Img}
          alt="React Logo"
          width={100}
          height={100}
        />

        <div className="leading-5 hidden xl:inline">
          <h4 className="font-bold">Maher</h4>
          <p className="text-gray-500">@maher</p>
        </div>

        <EllipsisHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
      </div>
    </div>
  );
};

export default Sidebar;
