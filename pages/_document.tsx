import Document, { Head, Html, Main, NextScript } from "next/document";

class Layout extends Document<Layout> {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html lang="de">
        <Head />
        <body className="overflow-x-hidden w-full text-base text-text-900">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Layout;
