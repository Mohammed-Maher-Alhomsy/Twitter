/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

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

import { signIn, signOut, useSession } from "next-auth/react";
import SidebarMenuItem from "./SidebarMenuItem";
import { useRouter } from "next/router";

const Sidebar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const button = session ? (
    <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
      Tweet
    </button>
  ) : (
    <button
      onClick={signIn}
      className="bg-blue-400 text-white rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"
    >
      Sign in
    </button>
  );

  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
      <div className="hoverEffect p-0 hover:bg-blue-100">
        <Image
          src={
            "https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
          }
          alt="LOGO"
          width={50}
          height={50}
          onClick={() => router.push("/")}
        />
      </div>

      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarMenuItem text="Home" Icon={HomeIcon} active />
        <SidebarMenuItem text="Explore" Icon={HashtagIcon} />

        {session && (
          <>
            <SidebarMenuItem text="Notifications" Icon={BellIcon} />
            <SidebarMenuItem text="Messages" Icon={InboxIcon} />

            <SidebarMenuItem text="BookMark" Icon={BookmarkIcon} />
            <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />

            <SidebarMenuItem text="Profile" Icon={UserIcon} />
            <SidebarMenuItem text="More" Icon={EllipsisHorizontalCircleIcon} />
          </>
        )}
      </div>

      {button}

      {session && (
        <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
          <img
            onClick={signOut}
            className="w-10 h-10 rounded-full object-cover xl:mr-2"
            src={session.user.image}
            alt="React Logo"
            width={100}
            height={100}
          />

          <div className="leading-5 hidden xl:inline truncate">
            <h4 className="font-bold">{session.user.name}</h4>
            <p className="text-gray-500 truncate">@{session.user.username}</p>
          </div>

          <EllipsisHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
