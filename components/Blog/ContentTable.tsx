export interface ContentTableEntry {
  text: string;
  href: string;
}

export interface ContentTableProps {
  contentTable: ContentTableEntry[];
}

export default function ContentTable(props: ContentTableProps) {
  const contentItem = props.contentTable.map((entry) => (
    <li
      className="py-1 list-item"
      style={{ counterIncrement: "step-counter" }}
      key={entry.href}
    >
      <a className="text-teal-400 no-underline" href={entry.href}>
        {entry.text}
      </a>
    </li>
  ));

  return (
    <nav
      aria-label="chapters"
      className="p-2 mt-8 rounded-lg md:p-5 md:pt-2 bg-bg-400"
    >
      <h4 className="mb-4 bold">Table of Content</h4>
      <ol className="list-none">{contentItem}</ol>
    </nav>
  );
}
