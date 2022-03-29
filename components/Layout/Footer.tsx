import Link from "@components/Link";

const posts1 = [
  ["Blog", "/#blog"],
  ["Tutorials", "/#tutorials"],
  ["Release Notes", "/#changelog"],
];

const posts2 = [
  ["JPEG XL in Chrome", "/tutorials/chrome/"],
  ["JPEG XL in Firefox", "/tutorials/firefox/"],
  ["JPEG XL in Edge", "/tutorials/edge/"],
  ["JPEG XL in Opera", "/tutorials/opera/"],
  ["JPEG XL in CSS", "/tutorials/css/"],
];

const posts3 = [
  ["AVIF Converter", "avif.io"],
  [
    "ProductHunt",
    "www.producthunt.com/posts/jpegxl-io-a-free-jpeg-xl-converter",
  ],
  ["Discord", "discord.com/invite/6w42YpF5hm"],
  ["Sitemap", "/sitemap.xml"],
  ["RSS Feed", "/rss.xml"],
  ["Legal and Privacy", "/privacy-policy/"],
];

const Column = (props: any) => {
  return (
    <div className="px-2 w-full md:w-1/2 lg:w-1/4">
      <h6 className="mt-6 mb-3 font-bold text-white">{props.title}</h6>
      <nav className="list-none">
        {props.posts.map((item: any) => (
          <Link
            key={item}
            className="block text-gray-400 hover:text-white"
            text={item[0]}
            href={item[1]}
          />
        ))}
      </nav>
    </div>
  );
};

export default function Footer() {
  return (
    <footer className="flex flex-wrap order-first px-1 pt-4 pb-8 mx-auto text-left bg-bg-400">
      <div className="flex flex-col px-2 mt-6 w-full text-gray-400 md:w-1/2 lg:w-1/4">
        <Link
          className="mb-2 text-xl font-bold text-white"
          text="jpegxl.io"
          href="/"
        />
        Convert image formats like PNG, JPG, GIF, WEBP to JPEG XL.
        <Link text="@jschmitz97" href="twitter.com/jschmitz97" />
      </div>
      <Column posts={posts1} title="Categories" />
      <Column posts={posts2} title="Most viewed" />
      <Column posts={posts3} title="Other pages" />
    </footer>
  );
}
