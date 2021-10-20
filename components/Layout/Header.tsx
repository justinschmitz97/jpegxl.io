import Link from "@components/Link";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";

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
      className={`fixed w-100 right-0 left-0 top-0 z-50 ${
        isFixed ? "fixed-header" : undefined
      }`}
      style={
        isFixed
          ? {
              borderBottom: "2px solid hsla(0, 0%, 100%, 0.05)",
              backdropFilter: "blur(4px)",
              zIndex: 9999,
            }
          : {}
      }
    >
      <div
        className={`block text-center text-tiny p-1 ${
          isFixed ? "hidden" : ""
        } ${support ? "bg-gradient" : "bg-bg-200"}`}
      >
        {support
          ? "Your browser supports JPEG XL.🥳"
          : "Your browser does not support JPEG XL.😞"}
      </div>
      <div className="flex flex-wrap justify-between items-center md:flex-row">
        <nav className="flex flex-wrap justify-center items-center text-base md:pl-4 md:mr-auto">
          <Link className="block p-2 md:p-3" text="Blog" href="/#blog" />
          <Link
            className="hidden p-2 md:block md:p-3"
            text="Tutorials"
            href="/#tutorials"
          />
          <Link
            className="hidden p-2 md:block md:p-3"
            text="Comparisons"
            href="/#comparisons"
          />
          <Link
            className="hidden p-2 md:block md:p-3"
            text="Discord"
            href="discord.com/invite/6w42YpF5hm"
          />
        </nav>
        <NextLink href="/">
          <button className="inline-flex items-center py-1 px-2 text-base rounded border-0 md:mt-0 focus:outline-none bg-bg-200 hover:bg-bg-300">
            Convert images
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
        </NextLink>
      </div>
    </header>
  );
}
