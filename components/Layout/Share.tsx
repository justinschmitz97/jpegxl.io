import tw from "@assets/twitter.svg";
import rd from "@assets/reddit.svg";
import fb from "@assets/facebook.svg";
import sh from "@assets/share.svg";

const ShareButton = (props: any) => {
  return (
    <button
      className="hidden p-1 m-0 w-5 h-5 bg-center bg-no-repeat bg-contain md:block"
      style={{ backgroundImage: `url(${props.image})` }}
      onClick={() => window.open(`${props.url}`, "_blank")}
      onKeyPress={() => window.open(`${props.url}`, "_blank")}
      type="button"
      title={`Share on ${props.name}`}
      id={props.name}
      tabIndex={0}
    ></button>
  );
};

export default function Blog() {
  function share() {
    event!.preventDefault();
    navigator.share({ url: url });
  }

  const url = "https://jpegxl.io";
  return (
    <div className="bg-bg-500 fixed right-2 bottom-2 md:right-3 md:bottom-3 z-40 p-1 rounded-md border-2 border-bg-500 md:border-0">
    <div className="flex justify-items-center items-center content-center ">
    <div className="text-tiny ml-1 mr-2 hidden md:block">Share</div>
      <ShareButton
        url={`https://twitter.com/intent/tweet?text=${url}`}
        name="Twitter"
        image={tw}
      />
      <ShareButton
        url={`https://reddit.com/submit?url=${url}`}
        name="Reddit"
        image={rd}
      />
      <ShareButton
        url={`https://facebook.com/share.php?u=${url}`}
        name="Facebook"
        image={fb}
      />
      <button
        className="block p-1 w-5 h-5 bg-center bg-no-repeat bg-contain md:hidden"
        style={{ backgroundImage: `url(${sh})` }}
        onClick={() => share()}
        onKeyPress={() => share()}
        aria-label="share"
        title="share on social media"
        id="share"
      ></button>
    </div>
    </div>
  );
}
