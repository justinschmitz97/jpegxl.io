import "atropos/css";
import Atropos from "atropos/react";

import visualizer1 from "@assets/visualizer-1.svg";
import visualizer3 from "@assets/visualizer-3.svg";
import visualizer4 from "@assets/visualizer-4.svg";
import visualizer6 from "@assets/visualizer-6.svg";
import visualizer7 from "@assets/visualizer-7.svg";
import visualizer8 from "@assets/visualizer-8.svg";
import visualizer9 from "@assets/visualizer-9.svg";
import visualizer10 from "@assets/visualizer-10.svg";
import visualizer11 from "@assets/visualizer-11.svg";
import visualizer12 from "@assets/visualizer-12.svg";

interface Advantages {
  pre?: string;
  text?: string;
  post?: string;
  number?: string;
  image?: any;
  children: any;
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
      durationEnter={200}
      shadow={false}
    >
      <div
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        className="grid overflow-hidden relative z-50 p-4 h-full text-center rounded-lg transition-all duration-200 ease-out transform-gpu hover:scale-105 group bg-bg-600"
        data-atropos-offset="0"
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
      </div>
    </Atropos>
  );
}

export default function Advantages() {
  return (
    <section className="container relative p-4 lg:p-0" id="avifadvantages">
      <div className="grid grid-cols-1 gap-4 mb-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <AdvantageItem number="visualizer-1" image={visualizer1}>
          <span className="font-bold leading-snug text-blue-400">
            reduces file size{" "}
          </span>
          of images by 20-60%
        </AdvantageItem>
        <AdvantageItem number="visualizer-3" image={visualizer3}>
          <span className="font-bold leading-snug text-blue-400">
            developed by the JPEG committee{" "}
          </span>
        </AdvantageItem>
        <AdvantageItem number="visualizer-4" image={visualizer4}>
          {" "}
          <span className="font-bold leading-snug text-blue-400">
            high fidelity{" "}
          </span>
          lossy image compression
        </AdvantageItem>
        <AdvantageItem number="visualizer-6" image={visualizer6}>
          <span className="font-bold leading-snug text-blue-400">
            progressive decoding
          </span>
        </AdvantageItem>
        <AdvantageItem number="visualizer-7" image={visualizer7}>
          <span className="font-bold leading-snug text-blue-400">
            lossless jpeg transcoding{" "}
          </span>
        </AdvantageItem>
        <AdvantageItem number="visualizer-8" image={visualizer8}>
          designed for{" "}
          <span className="font-bold leading-snug text-blue-400">
            photographic and synthetic images
          </span>
        </AdvantageItem>
        <AdvantageItem number="visualizer-9" image={visualizer9}>
          embraces{" "}
          <span className="font-bold leading-snug text-blue-400">
            wide gamut / HDR and 32 bit depth
          </span>
        </AdvantageItem>
        <AdvantageItem number="visualizer-10" image={visualizer9}>
          <span className="font-bold leading-snug text-blue-400">
            fast encoding and decoding
          </span>
        </AdvantageItem>
        <AdvantageItem number="visualizer-11" image={visualizer11}>
          full of features
          <span className="font-bold leading-snug text-blue-400">
            for smartphones like overlays
          </span>
        </AdvantageItem>
        <AdvantageItem number="visualizer-11" image={visualizer11}>
          supports
          <span className="font-bold leading-snug text-blue-400">
            fanimated frames
          </span>
        </AdvantageItem>
        <AdvantageItem number="visualizer-12" image={visualizer12}>
          <span className="font-bold leading-snug text-blue-400">
            FOSS and{" "}
          </span>
          royalty-free
        </AdvantageItem>
      </div>
    </section>
  );
}
