import tw from "@assets/twitter.svg";
import rd from "@assets/reddit.svg";
import fb from "@assets/facebook.svg";
import sh from "@assets/share.svg";

const ShareButton = (props: any) => {
  return (
    <button
      className="hidden p-1 m-1 w-5 h-5 bg-center bg-no-repeat bg-contain md:block"
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
    <div className="flex fixed right-4 bottom-4 z-50 justify-items-center content-center p-1 rounded-lg bg-bg-500">
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
        className="block p-1 m-1 w-5 h-5 bg-center bg-no-repeat bg-contain md:hidden"
        style={{ backgroundImage: `url(${sh})` }}
        onClick={() => share()}
        onKeyPress={() => share()}
        aria-label="share"
        title="share on social media"
        id="share"
      ></button>
    </div>
  );
}
