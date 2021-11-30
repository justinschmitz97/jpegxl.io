import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";
import Meta from "@components/Layout/Meta";

interface Layout {
  meta: any;
  children: any;
}

export default function Layout(props: Layout) {
  return (
    <>
      <Meta {...props.meta} />
      <Header />
      {props.children}
      <Footer />
    </>
  );
}
