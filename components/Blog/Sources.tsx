import _ from "lodash";

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
  sources = _.sortBy(sources, (s) => s.short);

  const listItems = sources.map((source: any) => (
    <li
      key={source.original}
      className="inline-block p-1 m-1 text-teal-400 rounded-md text-tiny bg-green-1000"
    >
      <a target="_blank" rel="noreferrer" href={source.original}>
        {source.short}
      </a>
    </li>
  ));

  return (
    <div id="sources">
      <ol>{listItems}</ol>
    </div>
  );
}
