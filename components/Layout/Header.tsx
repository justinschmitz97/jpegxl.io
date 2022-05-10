import Link from "@components/Link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isFixed, setIsFixed] = useState(true);
  const [support, setSupport] = useState(false);
  const handleScroll = () => {
    window.pageYOffset > 60 ? setIsFixed(true) : setIsFixed(false);
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  new Promise(() => {
    const image = new Image();
    image.onerror = () => setSupport(false);
    image.onload = () => setSupport(true);
    image.src =
      "data:image/jxl;base64,/woIELASCAgQAFwASxLFgkWAHL0xqnCBCV0qDp901Te/5QM=";
  }).catch(() => false);

  return (
    <header
      className={`fixed w-100 right-0 left-0 top-0 z-50 transition-all duration-150 ${
        isFixed ? "md:translate-y-[-32px]" : undefined
      }`}
      style={
        isFixed
          ? {
              borderBottom: "2px solid hsla(0, 0%, 100%, 0.05)",
              backdropFilter: "blur(4px)",
              zIndex: 9999,
            }
          : { borderBottom: "2px solid hsla(0, 0%, 100%, 0.05)" }
      }
    >
      <div
        className={`hidden md:block text-center text-tiny p-1  ${
          support ? "bg-gradient" : "bg-bg-200"
        }`}
      >
        {support
          ? "Your browser supports JPEG XL.🥳"
          : "Your browser does not support JPEG XL.😞"}
      </div>

      <div className="flex flex-wrap justify-between items-center py-2 px-1 md:flex-row md:px-1">
        <nav className="flex flex-wrap justify-center items-center text-base md:mr-auto">
          <Link className="p-1 md:p-3" text="Blog" href="/#blog" />
          <Link
            className="hidden p-2 md:block md:p-3"
            text="Tutorials"
            href="/#tutorials"
          />
        </nav>
        <nav className="flex flex-wrap justify-between items-center">
          <a
            className="hidden w-4 h-4 bg-center bg-no-repeat md:block md:py-1 md:px-4 md:mr-4"
            style={{
              backgroundImage: `url(/assets/discord.svg)`,
              backgroundSize: 24,
            }}
            href="https://discord.com/invite/6w42YpF5hm"
          />
          <Link href="/">
            <button className="inline-flex items-center py-1 px-2 mr-1 text-base rounded border-0 md:mt-0 focus:outline-none bg-bg-200 hover:bg-bg-300">
              Convert to JPEG XL
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="ml-1 w-3 h-3"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
