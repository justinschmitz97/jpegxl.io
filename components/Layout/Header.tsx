import Link from "@components/Link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isFixed, setIsFixed] = useState(true);
  const handleScroll = () => {
    window.pageYOffset > 60 ? setIsFixed(true) : setIsFixed(false);
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      <nav className="flex flex-wrap justify-center items-center py-2 px-1 text-base md:flex-row md:px-3 md:pl-4 md:mr-auto">
        <Link className="p-1 md:p-3" text="Startseite" href="/" />
        <Link className="p-1 md:p-3" text="Portfolio" href="/" />
        <Link className="p-1 md:p-3" text="Blog" href="/" />
        <Link className="p-1 md:p-3" text="Kontakt" href="/" />
      </nav>
    </header>
  );
}
