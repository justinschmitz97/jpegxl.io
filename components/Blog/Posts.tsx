import Link from "next/link";

export default function BlogPosts(props: any) {
  const posts = props.posts;

  function getDot(support: any) {
    if (support === "full support") {
      return "bg-teal-400";
    } else if (support === "partial support") {
      return "bg-yellow-700";
    } else if (support === "no support") {
      return "bg-red-400";
    }
  }
  function getBackground(support: any) {
    if (support === "full support") {
      return "bg-green-1000";
    } else if (support === "partial support") {
      return "bg-yellow-1000";
    } else if (support === "no support") {
      return "bg-red-1000";
    }
  }

  const listItems = posts.map(
    (
      { slug, keyword, description, url, subcategory, category, support }: any,
      index: any
    ) => (
      <Link href={slug ? `/${category}/${slug}/` : `/` + url} key={index}>
        <a
          href={slug ? `/${category}/${slug}/` : `/` + url}
          tabIndex={0}
          className={`p-2 cursor-pointer group ${support}`}
        >
          <div className="overflow-hidden relative p-3 h-full rounded-sm bg-bg-500">
            <div className="absolute right-0 bottom-0 z-0 w-4 h-3 transition-all transform scale-0 translate-x-4 translate-y-2 bg-gradient rotate-300 group-hover:scale-1500"></div>
            <div
              className={`relative mb-2 flex ${
                category !== "tutorials" && "hidden"
              }`}
            >
              <div
                className={`inline-flex items-center relative px-2 py-1 ${getBackground(
                  support
                )}
         rounded-md text-tiny text-white mr-1`}
              >
                <span
                  className={`w-1 h-1 rounded-full inline-block mr-1 ${getDot(
                    support
                  )}`}
                ></span>
                {support}
              </div>
              <div className="inline-flex relative py-1 px-2 mr-2 text-white rounded-md bg-bg-700 text-tiny">
                {subcategory}
              </div>
            </div>
            <div className="relative mb-0 ml-1 font-bold text-white">
              {keyword || keyword || ""}
            </div>
            <div className="relative ml-1 text-white text-tiny">
              {description}
            </div>
          </div>
        </a>
      </Link>
    )
  );
  return <>{listItems}</>;
}
