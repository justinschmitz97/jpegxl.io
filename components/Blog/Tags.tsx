import _ from "lodash";

export interface TagsProps {
  tags: string[];
}

export default function Tags(props: TagsProps) {
  let tags = props.tags.map((original) => {
    original = original.replace(/\s+/g, "+").toLowerCase();
    let short = original.replace(/\/$/, "");
    original = `https://google.com/search?q=site%3Ajpegxl.io+${original}`;
    short = short.replace(/\+/g, " ");
    return { original, short };
  });
  tags = _.sortBy(tags, (s) => s.short);

  const listTags = tags.map((source: any) => (
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
    <div className="tags_container f0">
      <ol className="tags_wrapper">{listTags}</ol>
    </div>
  );
}
