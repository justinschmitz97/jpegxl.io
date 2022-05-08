import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import css from "react-syntax-highlighter/dist/cjs/languages/hljs/css";
import html from "react-syntax-highlighter/dist/cjs/languages/hljs/htmlbars";
import js from "react-syntax-highlighter/dist/cjs/languages/hljs/javascript";
import scss from "react-syntax-highlighter/dist/cjs/languages/hljs/scss";
import xml from "react-syntax-highlighter/dist/cjs/languages/hljs/xml";
import php from "react-syntax-highlighter/dist/cjs/languages/hljs/php";
import vs2015 from "react-syntax-highlighter/dist/cjs/styles/hljs/vs2015";

interface Props {
  language: string;
  children: any;
}

export default function Syntax(props: Props) {
  SyntaxHighlighter.registerLanguage("javascript", js);
  SyntaxHighlighter.registerLanguage("html", html);
  SyntaxHighlighter.registerLanguage("css", css);
  SyntaxHighlighter.registerLanguage("scss", scss);
  SyntaxHighlighter.registerLanguage("xml", xml);
  SyntaxHighlighter.registerLanguage("php", php);

  const { language, children } = props;

  function copyToClipboard(e: any) {
    navigator.clipboard.writeText(children);
    e.target.focus();
  }

  return (
    <div className="relative code group text-tiny">
      <SyntaxHighlighter
        language={language}
        style={vs2015}
        showLineNumbers={true}
      >
        {children}
      </SyntaxHighlighter>
      <div className="flex flex-col justify-center items-center">
        <button
          className="flex absolute top-0 left-full z-50 justify-center items-center py-1 px-2 text-white bg-teal-700 rounded-l-none rounded-r-md cursor-pointer hover:bg-teal-800 [word-break:keep-all] copycode group"
          onClick={copyToClipboard}
        >
          Copy
          <span className="flex absolute z-50 justify-center items-center p-2 w-4 h-4 bg-teal-700 rounded-full opacity-0 transition-all duration-200 ease-out origin-center scale-0 rotate-6 translate-x-0 group-hover:opacity-100 group-focus:scale-100 group-focus:rotate-0 group-focus:translate-x-6 check">
            ✓
          </span>
        </button>
      </div>
    </div>
  );
}
