/* eslint-disable @next/next/no-img-element */
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import News from "./news";
import { useState } from "react";

const Widgets = ({ newsArticle, randomUsersResults }) => {
  const [articleNumber, setArticleNumber] = useState(3);
  const [randomUserNumber, setRandomUserNumber] = useState(3);

  return (
    <div className="bg-red-100 xl:w-[600px] lg:inline hidden ml-8 space-y-5">
      <div className="w-[90%] xl:w-[75%] sticky top-0 py-1.5 z-50">
        <div className="flex items-center p-3 rounded-full relative">
          <MagnifyingGlassCircleIcon className="h-5 z-50 text-gray-500" />
          <input
            type="text"
            placeholder="Search Twitter"
            className="absolute inset-0 rounded-full pl-11 border-gary-500 text-gray-700 focus:shadow-lg bg-gray-100 focus:bg-white focus:ring-0 focus:border-gray-500"
          />
        </div>
      </div>

      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">What&apos;s happening</h4>

        {newsArticle.slice(0, articleNumber).map((article) => (
          <News key={article.title} article={article} />
        ))}

        <button
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
          onClick={() => setArticleNumber((prevState) => prevState + 3)}
        >
          Show more
        </button>
      </div>

      <div className="sticky top-16 text-gray-700 space-y-3 bg-gray-100 pt-2 rounded-xl w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        {randomUsersResults.slice(0, randomUserNumber).map((randomUser) => (
          <div
            key={randomUser.login.username}
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200"
          >
            <img
              src={randomUser.picture.thumbnail}
              alt="user img"
              width={40}
              className="rounded-full"
            />

            <div className="truncate ml-4 leading-5">
              <h4 className="font-bold hover:underline text-[14px] truncate">
                {randomUser.login.username}
              </h4>
              <h5 className="text-[13px] text-gray-500 truncate">
                {randomUser.name.first + " " + randomUser.name.last}
              </h5>
            </div>

            <button className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold">
              Follow
            </button>
          </div>
        ))}
        <button
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
          onClick={() => setRandomUserNumber((prevState) => prevState + 3)}
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default Widgets;
// 250 948 7524
