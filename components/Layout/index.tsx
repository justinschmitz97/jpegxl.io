import dynamic from "next/dynamic";
import Header from "@components/Layout/Header";
import Meta from "@components/Layout/Meta";

const CookieBanner = dynamic(() => import("@components/Layout/CookieBanner"));
const Footer = dynamic(() => import("@components/Layout/Footer"));
const Share = dynamic(() => import("@components/Layout/Share"));
const CTA = dynamic(() => import("@components/Layout/CTA"));

interface LayoutProps {
  meta: any;
  children: any;
}

export default function Layout(props: LayoutProps) {
  return (
    <>
      <Meta {...props.meta} />
      <Header />
      {props.children}
      <CTA />
      <Footer />
      <CookieBanner />
      <Share />
    </>
  );
}
