import Header from "@components/Layout/Header";
import Meta from "@components/Layout/Meta";

import CookieBanner from "@components/Layout/CookieBanner";
import Footer from "@components/Layout/Footer";
import Share from "@components/Layout/Share";
import CTA from "@components/Layout/CTA";

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
