import sortBy from "lodash/sortBy";

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
  tags = sortBy(tags, (s) => s.short);

  const listTags = tags.map((source: any) => (
    <li
      key={source.original}
      className="inline-block px-1 mr-1 text-teal-400 rounded-md text-tiny bg-green-1000"
    >
      <a target="_blank" rel="noreferrer" href={source.original}>
        {source.short}
      </a>
    </li>
  ));

  return (
    <>
      <h5 className="inline-block py-1 px-2 mt-4 mb-0 font-bold rounded-md">
        Topic clusters
      </h5>
      <ol>{listTags}</ol>
    </>
  );
}
