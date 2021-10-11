import Link from "next/link";

import img1 from "@assets/firefox.svg";
import img2 from "@assets/safari.svg";
import img3 from "@assets/edge.svg";
import img4 from "@assets/css.svg";
import img5 from "@assets/html.svg";
import img6 from "@assets/angular.svg";
import img7 from "@assets/react.svg";
import img8 from "@assets/vue.svg";
import img9 from "@assets/nextjs.svg";
import img10 from "@assets/netlify.svg";
import img11 from "@assets/cloudflare.svg";
import img12 from "@assets/wordpress.svg";
import img13 from "@assets/magento.svg";
import img14 from "@assets/windows.svg";
import img15 from "@assets/gimp.svg";

interface BoxProps {
  id: string;
  text: string;
  url: string;
  img?: any;
}

function Box(props: BoxProps) {
  return (
    <Link href={`/blog/tutorials/${props.url}/`}>
      <a href={`/blog/tutorials/${props.url}/`} tabIndex={0}>
        <div
          className={
            "py-7 md:p-rectangle group relative w-full cursor-pointer rounded-md md:rounded-xl lg:rounded-xl ease-in-out duration-300 overlay-before group transform hover:scale-105 hover:rotate-1 md:hover:rotate-6"
          }
          id={props.id}
        >
          <div className="absolute top-0 right-0 bottom-0 left-0 rounded-md opacity-50 md:rounded-xl lg:rounded-xl group-hover:opacity-100 bg-gradient"></div>
          <div
            className={
              "flex items-center pl-4 overflow-hidden rounded-md md:rounded-xl lg:rounded-xl absolute top-0 right-0 left-0 bottom-0"
            }
          >
            <div
              style={{ opacity: 0.05, backgroundImage: `url(${props.img})` }}
              className="absolute top-0 right-0 bottom-0 left-0 bg-center bg-no-repeat bg-cover group-hover:blur-sm"
            ></div>
            <span className="relative z-50 text-xl font-bold text-white">
              {props.text}
            </span>
          </div>
          <div className="absolute top-0 right-0 bottom-0 left-0 rounded-md md:rounded-xl lg:rounded-xl -z-1 bg-bg-400"></div>
        </div>
      </a>
    </Link>
  );
}

export default function Boxes() {
  return (
    <section className="container relative z-10 px-3 mt-12 max-w-screen-xl">
      <h2 className="text-center">How to use AVIF</h2>
      <div className="my-6 mx-auto max-w-screen-md text-center">
        Support is constantly rising across software and hardware. Thanks to
        being royalty-free, companies can include the format without having to
        deal with patents. We created articles for you on getting started on all
        different types of browsers, operating systems, and software. We didn't
        cover your software? Feel free to tell us on support@avif.io, and we
        will write an article about it.
      </div>
      <div className="grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4 tutorials">
        <Box id="firefox" text="Firefox" url="firefox" img={img1} />
        <Box id="safari" text="Safari" url="safari" img={img2} />
        <Box id="edge" text="Edge" url="edge" img={img3} />
        <Box id="css" text="CSS" url="css" img={img4} />
        <Box id="html" text="HTML" url="html" img={img5} />
        <Box id="angular" text="Angular" url="frameworks" img={img6} />
        <Box id="react" text="React" url="frameworks" img={img7} />
        <Box id="vue" text="Vue" url="frameworks" img={img8} />
        <Box id="nextjs" text="Next.JS" url="nextjs" img={img9} />
        <Box id="netlify" text="Netlify" url="netlify" img={img10} />
        <Box id="cloudflare" text="Cloudflare" url="cloudflare" img={img11} />
        <Box id="wordpress" text="WordPress" url="wordpress" img={img12} />
        <Box id="magento" text="Magento" url="magento" img={img13} />
        <Box id="windows" text="Windows" url="windows" img={img14} />
        <Box id="gimp" text="GIMP" url="gimp" img={img15} />
      </div>
    </section>
  );
}
