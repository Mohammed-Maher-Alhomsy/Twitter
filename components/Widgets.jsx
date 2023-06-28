import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import News from "./news";
import { useState } from "react";

const Widgets = ({ newsResults }) => {
  const [articleNumber, setArticleNumber] = useState(3);

  return (
    <div className="bg-red-100 xl:w-[600px] lg:inline hidden ml-8 space-y-5">
      <div className="w-[90%] xl:w-[75%] sticky top-0 bg-green-100 py-1.5 z-50">
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

        {newsResults.slice(0, articleNumber).map((article) => (
          <News key={article.title} article={article} />
        ))}

        <button
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
          onClick={() => setArticleNumber((prevState) => prevState + 3)}
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default Widgets;
// 250 948 7524
