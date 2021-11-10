import Link from "next/link";

export default function CTA() {
  return (
    <div className="container px-2 my-8 mx-auto text-center">
      <Link href="/" passHref>
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
              Convert your images to JXL.
            </div>
            <div
              className="absolute right-0 left-0 top-1 bottom-1 w-full h-full rounded-md opacity-25 transform scale-105 -z-1 bg-gradient blur-xl bg-300"
              data-transition-style="gradientAnimation"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
