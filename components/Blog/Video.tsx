interface Props {
  id: string;
  title: string;
  length: string;
  description: string;
}

export default function Video(props: Props) {
  const { id, title, description, length } = props;
  return (
    <div className="my-6 border-8 border-bg-300 bg-bg-300 box-border rounded-md">
      <div className="rounded-md overflow-hidden bg-bg-300">
        <iframe
          width="752"
          height="423"
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="w-full bg-bg-300 text-white py-2 px-1">
        <div className="flex flex-col md:flex-row justify-between items-center mb-1">
          <h4 className="font-bold w-full m-0">{title}</h4>
          <p className="text-right w-8 md:mb-0 mr-2 ml-10 md:ml-0">{length}</p>
        </div>
        <div className="text-tiny mr-0 md:mr-12">{description}</div>
      </div>
    </div>
  );
}
