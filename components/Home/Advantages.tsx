import "atropos/css";
import Atropos from "atropos/react";

import visualizer1 from "@assets/visualizer-1.svg";
import visualizer3 from "@assets/visualizer-3.svg";
import visualizer4 from "@assets/visualizer-4.svg";
import visualizer6 from "@assets/visualizer-6.svg";
import visualizer7 from "@assets/visualizer-7.svg";
import visualizer8 from "@assets/visualizer-8.svg";
import visualizer9 from "@assets/visualizer-9.svg";
import visualizer11 from "@assets/visualizer-11.svg";
import visualizer12 from "@assets/visualizer-12.svg";

interface Advantages {
  number?: string;
  image?: any;
  children: any;
  url?: string;
}

function AdvantageItem(props: Advantages) {
  return (
    <Atropos
      activeOffset={20}
      shadowScale={1.01}
      rotateXMax={20}
      scaleClassName="rounded-lg h-full"
      rotateClassName="rounded-lg h-full"
      innerClassName="rounded-lg h-full"
      shadow={false}
      rotateTouch={false}
    >
      <a
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        className="grid overflow-hidden relative z-50 p-4 py-5 h-full text-center rounded-lg transition-all duration-200 ease-out transform-gpu hover:scale-105 group bg-bg-600"
        data-atropos-offset="0"
        href={props.url}
        target="_blank"
        rel="noreferrer"
      >
        <div
          className="z-0 mb-4 h-6 bg-center bg-no-repeat bg-contain rounded-lg transition-all duration-500 ease-out origin-center background-no-repeat group-hover:scale-200"
          data-atropos-offset="10"
          id={props.number}
          style={{
            backgroundImage: `url(${props.image})`,
          }}
        ></div>
        <div
          className="h-auto leading-snug ease-in md:h-7"
          data-atropos-offset="2"
        >
          {props.children}
        </div>
        <div
          className="absolute top-0 right-0 bottom-0 left-0 bg-center bg-cover md:bg-no-repeat"
          style={{
            backgroundImage: `url(${props.image})`,
            opacity: "0.025",
            filter: "blur(4px)",
          }}
        ></div>
      </a>
    </Atropos>
  );
}

export default function Advantages() {
  return (
    <section className="container relative p-4 lg:p-0" id="avifadvantages">
      <div className="grid grid-cols-1 gap-4 mb-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <AdvantageItem
          number="visualizer-1"
          image={visualizer1}
          url="https://www.spiedigitallibrary.org/conference-proceedings-of-spie/11353/2556264/Benchmarking-JPEG-XL-image-compression/10.1117/12.2556264.short?SSO=1"
        >
          <span className="font-bold leading-snug text-blue-400">
            reduces file size{" "}
          </span>
          of images by an average of 20-60%
        </AdvantageItem>
        <AdvantageItem
          number="visualizer-3"
          image={visualizer3}
          url="https://jpeg.org/jpegxl/"
        >
          <span className="font-bold leading-snug text-blue-400">
            developed by the JPEG committee{" "}
          </span>
          with a dedicated team
        </AdvantageItem>
        <AdvantageItem
          number="visualizer-6"
          image={visualizer6}
          url="https://www.youtube.com/watch?v=UphN1_7nP8U"
        >
          <span className="font-bold leading-snug text-blue-400">
            progressive decoding{" "}
          </span>
          for enhanced web experience
        </AdvantageItem>
        <AdvantageItem
          number="visualizer-7"
          image={visualizer7}
          url="https://cloudinary.com/blog/legacy_and_transition_creating_a_new_universal_image_codec"
        >
          legacy-friendly,{" "}
          <span className="font-bold leading-snug text-blue-400">
            lossless jpeg transcoding{" "}
          </span>
        </AdvantageItem>
        <AdvantageItem
          number="visualizer-8"
          image={visualizer8}
          url="https://cloudinary.com/blog/time_for_next_gen_codecs_to_dethrone_jpeg"
        >
          designed for{" "}
          <span className="font-bold leading-snug text-blue-400">
            photographic and synthetic images
          </span>
        </AdvantageItem>
        <AdvantageItem
          number="visualizer-9"
          image={visualizer9}
          url="https://cloudinary.com/blog/how_jpeg_xl_compares_to_other_image_codecs#universality"
        >
          embraces{" "}
          <span className="font-bold leading-snug text-blue-400">
            wide gamut / HDR and 32 bit depth
          </span>{" "}
          for stunning visuals
        </AdvantageItem>
        <AdvantageItem
          number="visualizer-10"
          image={visualizer4}
          url="https://cloudinary.com/blog/how_jpeg_xl_compares_to_other_image_codecs#computational_complexity"
        >
          <span className="font-bold leading-snug text-blue-400">
            fast encoding and decoding
          </span>{" "}
          through software
        </AdvantageItem>
        <AdvantageItem
          number="visualizer-11"
          image={visualizer11}
          url="http://ds.jpeg.org/documents/wg1n83043-REQ-JPEG_XL_Use_Cases_and_Requirements.pdf"
        >
          full of features{" "}
          <span className="font-bold leading-snug text-blue-400">
            for smartphones like overlays
          </span>
        </AdvantageItem>
        <AdvantageItem
          number="visualizer-11"
          image={visualizer8}
          url="https://gitlab.com/wg1/jpeg-xl/-/issues/68"
        >
          work in progress support for{" "}
          <span className="font-bold leading-snug text-blue-400">
            animated frames
          </span>
        </AdvantageItem>
        <AdvantageItem
          number="visualizer-12"
          image={visualizer12}
          url="https://gitlab.com/wg1/jpeg-xl/-/blob/main/LICENSE"
        >
          <span className="font-bold leading-snug text-blue-400">
            FOSS and{" "}
          </span>
          royalty-free license enables fast market adaptation
        </AdvantageItem>
      </div>
    </section>
  );
}
