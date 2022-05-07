import Link from "next/link";

const Post = ({ category, keyword, description, support, url }: any) => {
  function getBackground(support: any) {
    if (support === "full support") {
      return "bg-green-1000";
    } else if (support === "partial support") {
      return "bg-yellow-1000";
    } else if (support === "no support") {
      return "bg-red-1000";
    }
  }

  return (
    <Link href={`/blog/${url}/`}>
      <a
        href={`/blog/${url}/`}
        tabIndex={0}
        className={`p-0 mt-1 md:mt-0 cursor-pointer group ${support}`}
      >
        <div className="overflow-hidden relative py-2 px-1 h-full text-left rounded-md md:p-2 bg-bg-500">
          <div className="absolute right-0 bottom-0 z-0 w-4 h-3 transition-all transform scale-0 translate-x-4 translate-y-2 bg-gradient rotate-300 group-hover:scale-1500"></div>
          <div
            className={`px-2 inline-flex py-1 rounded-md text-tiny mb-2 text-white ${
              category !== "tutorials" && "hidden"
            } ${getBackground(support)}`}
          >
            {support}
          </div>
          <div className="relative mb-0 font-bold leading-snug text-white">
            {keyword || keyword || ""}
          </div>
          <div className="relative text-white text-tiny">{description}</div>
        </div>
      </a>
    </Link>
  );
};

export default Post;
