/* eslint-disable react/jsx-no-target-blank */
import NextLink from "next/link";

interface Props {
  href: string;
  text: string;
  className?: string;
}

export default function Quote(props: Props) {
  const { href, text, className } = props;
  const isInternal = href && (href.startsWith("/") || href.startsWith("#"));

  return (
    <NextLink href={`https://` + href}>
      <a
        title={text}
        href={isInternal ? href : `https://` + href}
        rel={isInternal ? "prerender" : "noopener noreferrer"}
        target={isInternal ? "_self" : "_blank"}
        className={className}
      >
        {text}
      </a>
    </NextLink>
  );
}
