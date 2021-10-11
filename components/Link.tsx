/* eslint-disable react/jsx-no-target-blank */
import NextLink from "next/link";

export default function Link(props: {
  href: any;
  text: string;
  className?: string;
}) {
  const href = props.href;
  const isInternal = href && (href.startsWith("/") || href.startsWith("#"));

  return (
    <NextLink href={`https://` + href}>
      <a
        title={props.text}
        href={isInternal ? href : `https://` + href}
        rel={isInternal ? "prerender" : "noopener noreferrer"}
        target={isInternal ? "_self" : "_blank"}
        className={props.className}
      >
        {props.text}
      </a>
    </NextLink>
  );
}
