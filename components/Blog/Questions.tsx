export interface QuestionsProps {
  questions: string[];
}

export default function Questions(props: QuestionsProps) {
  let questions = props.questions.map((original) => {
    original = original.replace(/\s+/g, "+").toLowerCase();
    let short = original.replace(/\/$/, "");
    original = `https://google.com/search?q=site%3Ajustinschmitz.de+${original}`;
    short = short.replace(/\+/g, " ");
    return { original, short };
  });

  const listQuestions = questions.map((source: any) => (
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
        Related search terms
      </h5>
      <ol>{listQuestions}</ol>
    </>
  );
}
