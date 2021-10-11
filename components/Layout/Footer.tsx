import Link from "@components/Link";

const FooterLink = (props: any) => {
  return (
    <Link
      className="block text-gray-400 hover:text-white"
      text={props.text}
      href={props.href}
    />
  );
};

export default function Footer() {
  return (
    <footer className="text-gray-400 bg-tenpercent body-font">
      <div className="container py-8 px-1 mx-auto">
        <div className="flex flex-wrap order-first text-left">
          <div className="flex flex-col px-4 mt-6 w-full md:w-1/2 lg:w-1/4">
            <Link
              className="flex justify-start items-center text-xl font-bold text-white font-display"
              text="avif.io"
              href="/"
            />

            <div className="my-4 text-gray-400">
              A tool by Justin Schmitz and Niksa Sporin that is now open-source.
              <Link text="- @jschmitz97" href="twitter.com/jschmitz97" />
            </div>
          </div>
          <div className="px-4 w-full md:w-1/2 lg:w-1/4">
            <h6 className="mt-6 mb-3 font-bold text-white">Categories</h6>
            <nav className="list-none">
              <FooterLink text="Blog" href="/blog/" />
              <FooterLink text="Tutorials" href="/blog/#tutorials" />
              <FooterLink text="Articles" href="/blog/#articles" />
              <FooterLink text="Comparisons" href="/blog/#comparisons" />
              <FooterLink text="Release Notes" href="/blog/#releasenotes" />
            </nav>
          </div>
          <div className="px-4 w-full md:w-1/2 lg:w-1/4">
            <h6 className="mt-6 mb-3 font-bold text-white">Most viewed</h6>
            <nav className="list-none">
              <FooterLink
                text="AVIF in Wordpress"
                href="/blog/tutorials/wordpress/"
              />
              <FooterLink
                text="AVIF in Safari"
                href="/blog/tutorials/safari/"
              />
              <FooterLink
                text="AVIF in JS Frameworks"
                href="/blog/tutorials/frameworks/"
              />
              <FooterLink text="AVIF in CSS" href="/blog/tutorials/css/" />
              <FooterLink
                text="Image Web Perf"
                href="/blog/articles/optimize-images-for-web-performance/"
              />
            </nav>
          </div>
          <div className="px-4 w-full md:w-1/2 lg:w-1/4">
            <h6 className="mt-6 mb-3 font-bold text-white">Other Pages</h6>
            <nav className="list-none">
              <FooterLink
                text="ProductHunt"
                href="www.producthunt.com/posts/avif-io-avif-image-converter"
                ext
              />
              <FooterLink
                text="Discord"
                href="discord.com/invite/6w42YpF5hm"
                ext
              />
              <FooterLink
                text="Github"
                href="github.com/justinschmitz97/avif.io/issues"
                ext
              />
              <FooterLink text="Sitemap" href="/sitemap.xml" />
              <FooterLink text="RSS Feed" href="/rss.xml" />
              <FooterLink text="Legal and Privacy" href="/privacy-policy/" />
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
