import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import css from "react-syntax-highlighter/dist/cjs/languages/hljs/css";
import html from "react-syntax-highlighter/dist/cjs/languages/hljs/htmlbars";
import js from "react-syntax-highlighter/dist/cjs/languages/hljs/javascript";
import scss from "react-syntax-highlighter/dist/cjs/languages/hljs/scss";
import xml from "react-syntax-highlighter/dist/cjs/languages/hljs/xml";
import vs2015 from "react-syntax-highlighter/dist/cjs/styles/hljs/vs2015";

SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("html", html);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("xml", xml);

interface Props {
  language: string;
  children: any;
}

export default function Syntax(props: Props) {
  const { language, children } = props;

  function copyToClipboard(e: any) {
    navigator.clipboard.writeText(children);
    e.target.focus();
  }

  return (
    <div className="relative code group">
      <SyntaxHighlighter
        language={language}
        style={vs2015}
        showLineNumbers={true}
      >
        {children}
      </SyntaxHighlighter>
      <button
        className="absolute top-0 left-full z-50 py-2 px-1 w-8 text-blue-400 rounded-l-none rounded-r-md opacity-0 cursor-pointer group-hover:opacity-100 hover:text-white hover:bg-pink-700 copycode bg-bg-800 bg-pink-1000 group"
        onClick={copyToClipboard}
      >
        <span>Copy</span>
        <span
          className="flex absolute z-50 justify-center items-center p-2 w-5 h-5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 check"
          style={{ top: "10%", right: "-40px" }}
        >
          ✓
        </span>
      </button>
    </div>
  );
}
