import Link from "@components/Link";
import Ad from "@components/Blog/Ad";

export default function CTA() {
  return (
    <>
      {" "}
      <aside className="px-2 mx-auto max-w-screen-md">
        <Ad />
      </aside>
      <div className="container px-2 my-8 mx-auto text-center duration-200 hover:scale-105">
        <Link
          href="/"
          className="container inline-block max-w-screen-lg text-left"
        >
          <div
            className="relative p-3 rounded-md cursor-pointer md:p-6 bg-gradient"
            data-transition-style="gradientAnimation"
          >
            <div className="relative z-10 opacity-80">
              Profit from a faster website, higher ranking and better
              conversions.
            </div>
            <div className="relative z-10 text-2xl font-bold leading-snug">
              Convert your images to JPEGXL for free.
            </div>
            <div
              className="absolute right-0 left-0 top-1 bottom-1 w-full h-full rounded-md opacity-25 transform scale-105 -z-10 bg-gradient blur-xl"
              data-transition-style="gradientAnimation"
            />
          </div>
        </Link>
      </div>
    </>
  );
}
