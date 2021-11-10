interface Props {
  id: string;
  title: string;
  length: string;
  description: string;
}

export default function Video(props: Props) {
  const { id, title, description, length } = props;
  return (
    <div className="p-2 my-6 rounded-md border-8 border-bg-300 bg-bg-300 box-border">
      <div className="overflow-hidden rounded-md bg-bg-300">
        <iframe
          width="736"
          height="414"
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title="YouTube video player"
          frameBorder="0"
          allow="encrypted-media; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="py-2 px-1 w-full text-white bg-bg-300">
        <div className="flex flex-col justify-between items-center mb-1 md:flex-row">
          <h4 className="m-0 w-full font-bold">{title}</h4>
          <p className="mr-2 ml-10 w-8 text-right md:mb-0 md:ml-0">{length}</p>
        </div>
        <div className="mr-0 md:mr-12 text-tiny">{description}</div>
      </div>
    </div>
  );
}
