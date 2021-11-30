export interface SourcesProps {
  sources: string[];
}

export default function Sources(props: SourcesProps) {
  let sources = props.sources.map((original) => {
    original = original.replace(/^https?:\/\//, "");
    let short = original.replace(/\/$/, "");
    const split = short.split(/[/]/);
    const a = split[0];
    const c = a.replace(/^www./, "");
    short = `${c}`;
    original = `https://${original}`;
    return { original, short };
  });

  const listItems = sources.map((source: any) => (
    <li
      key={source.original}
      className="inline-block px-2 py-1 m-1 text-purple-800 rounded-sm text-tiny bg-purple-200"
    >
      <a target="_blank" rel="noreferrer" href={source.original}>
        {source.short}
      </a>
    </li>
  ));

  return (
    <>
      <h5 className="inline-block py-1 mt-5 font-bold rounded-md text-text-800">
        Sources
      </h5>
      <ol>{listItems}</ol>
    </>
  );
}
