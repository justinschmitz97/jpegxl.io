export default function Tooltip(props: { text: string; children: any }) {
  return (
    <>
      <div
        tabIndex={0}
        role="button"
        className="inline-block relative p-1 mx-2 text-center text-white rounded-md min-w-4 tooltip bg-bg-300 group text-tiny"
      >
        {props.text}
        <div
          className="hidden absolute z-50 p-2 w-12 text-left text-white rounded-lg border-2 group-hover:block bg-bg-500 border-bg-300"
          style={{ top: "-20px", left: "120%" }}
        >
          {props.children}
        </div>
      </div>
    </>
  );
}
