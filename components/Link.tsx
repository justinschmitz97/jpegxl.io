/* eslint-disable react/jsx-no-target-blank */
import NextLink from "next/link";

interface Props {
  href: string;
  text?: string;
  className?: string;
  lazy?: boolean;
  style?: any;
  children?: any;
}

export default function Quote(props: Props) {
  const { href, text, className, lazy, style, children } = props;
  const isInternal = href && (href.startsWith("/") || href.startsWith("#"));

  return (
    <NextLink href={`https://` + href}>
      <a
        title={text}
        href={isInternal ? href : `https://` + href}
        rel={
          !lazy
            ? isInternal
              ? "preload prerender"
              : "noopener noreferrer"
            : "preconnect"
        }
        target={isInternal ? "_self" : "_blank"}
        className={className}
        style={style}
      >
        {text}
        {children}
      </a>
    </NextLink>
  );
}
