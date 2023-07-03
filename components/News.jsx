import Image from "next/image";

const News = ({ article }) => {
  return (
    <a href={article.url} target="_blank" className="block ">
      <div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-1000 ">
        <div className="space-y-0.5">
          <h6 className="text-sm font-bold">{article.title}</h6>
          <p className="text-xs font-medium text-gray-500">
            {article.source.name}
          </p>
        </div>

        <img
          src={article.urlToImage}
          alt="article image"
          className="rounded-xl"
          width={"70"}
        />
      </div>
    </a>
  );
};

export default News;
