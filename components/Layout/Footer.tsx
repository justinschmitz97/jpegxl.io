import Link from "@components/Link";


export default function Footer() {
  return (
    <>
      <aside>
        <div className="container px-2 my-8 mx-auto text-center">
          <Link href="/">
            <div className="container inline-block max-w-screen-lg text-left">
              <div
                className="relative p-3 rounded-md cursor-pointer md:p-6 bg-gradient bg-300"
                data-transition-style="gradientAnimation"
              >
                <div className="relative z-10 opacity-80">
                  Profit from a faster website, higher ranking and better
                  conversions.
                </div>
                <div className="relative z-10 mt-4 text-2xl font-bold leading-snug">
                  Convert your images to JPEG XL for free.
                </div>
              </div>
            </div>
          </Link>
        </div>
      </aside>
      <footer className="flex flex-wrap order-first px-1 pt-4 pb-8 mx-auto text-left bg-bg-400">
          <Link text="@jschmitz97" href="twitter.com/jschmitz97" />
      </footer>
    </>
  );
}
