import { ReactNode } from "react";
import Link from "@components/Link";
import Heading from "@components/Blog/Heading";
import Image from "@components/Blog/Image";
import Video from "@components/Blog/Video";
import Quote from "@components/Blog/Quote";

interface ChildrenProps {
  children: ReactNode;
}

const MDXComponents = {
  Link,
  Image,
  Video,
  Quote,
  h1: ({ children }: ChildrenProps) => (
    <Heading level={1} text={children as string} />
  ),
  h2: ({ children }: ChildrenProps) => (
    <Heading level={2} text={children as string} />
  ),
  h3: ({ children }: ChildrenProps) => (
    <Heading level={3} text={children as string} />
  ),
  h4: ({ children }: ChildrenProps) => (
    <Heading level={4} text={children as string} />
  ),
  h5: ({ children }: ChildrenProps) => (
    <Heading level={5} text={children as string} />
  ),
  h6: ({ children }: ChildrenProps) => (
    <Heading level={6} text={children as string} />
  ),
};

export default MDXComponents;
