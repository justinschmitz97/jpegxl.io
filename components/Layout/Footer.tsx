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
              text="jpegxl.io"
              href="/"
            />
            <div className="my-4 text-gray-400">
              A tool by Justin Schmitz to convert JPG, PNG, WebP and AVIF to
              JPEG XL.
              <Link text="- @jschmitz97" href="twitter.com/jschmitz97" />
            </div>
          </div>
          <div className="px-4 w-full md:w-1/2 lg:w-1/4">
            <h6 className="mt-6 mb-3 font-bold text-white">Categories</h6>
            <nav className="list-none">
              <FooterLink text="Blog" href="/#blog" />
              <FooterLink text="Tutorials" href="/b#tutorials" />
              <FooterLink text="Release Notes" href="/#releasenotes" />
            </nav>
          </div>
          <div className="px-4 w-full md:w-1/2 lg:w-1/4">
            <h6 className="mt-6 mb-3 font-bold text-white">Most viewed</h6>
            <nav className="list-none">
              <FooterLink text="JpegXL in Chrome" href="/tutorials/chrome/" />
              <FooterLink text="JpegXL in Firefox" href="/tutorials/firefox/" />
              <FooterLink text="JpegXL in Edge" href="/tutorials/edge/" />
              <FooterLink text="JpegXL in opera" href="/tutorials/opera/" />
              <FooterLink text="JpegXL in CSS" href="/tutorials/css/" />
            </nav>
          </div>
          <div className="px-4 w-full md:w-1/2 lg:w-1/4">
            <h6 className="mt-6 mb-3 font-bold text-white">Other Pages</h6>
            <nav className="list-none">
              <FooterLink text="ProductHunt" href="www.producthunt.com/" ext />
              <FooterLink
                text="Discord"
                href="discord.com/invite/6w42YpF5hm"
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
