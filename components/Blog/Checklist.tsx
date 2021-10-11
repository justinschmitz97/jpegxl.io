export default function Checklist(props: any) {
  const listItems = props.items.map((item: any) => (
    <li className="flex items-baseline mb-2" key={item}>
      <span className="flex justify-center items-center p-1 mr-3 w-4 h-4 bg-teal-400 rounded-md min-w-4 min-h-4 text-tiny">
        ✓
      </span>
      {item}
    </li>
  ));
  return <ul className="my-3">{listItems}</ul>;
}
