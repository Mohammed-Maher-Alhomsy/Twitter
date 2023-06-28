import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";

const Widgets = () => {
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
    </div>
  );
};

export default Widgets;
// 250 948 7524
