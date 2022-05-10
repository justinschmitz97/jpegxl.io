/* eslint-disable react/jsx-no-target-blank */
import NextLink from "next/link";

interface Props {
  href: string;
  text?: string;
  className?: string;
  children?: any;
}

export default function Quote(props: Props) {
  const { href, text, className, children } = props;
  const isInternal = href && (href.startsWith("/") || href.startsWith("#"));
  return (
    <NextLink passHref href={isInternal ? href : `https://` + href}>
      <a
        title={text}
        href={isInternal ? href : `https://` + href}
        rel={isInternal ? "prefetch" : "noopener noreferrer"}
        target={isInternal ? "_self" : "_blank"}
        className={className}
        tabIndex={0}
      >
        {text}
        {children}
      </a>
    </NextLink>
  );
}
