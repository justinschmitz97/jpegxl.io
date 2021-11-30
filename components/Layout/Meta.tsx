import Head from "next/head";
import { jsonLdScriptProps } from "react-schemaorg";
import { BlogPosting } from "schema-dts";

export interface Props {
  title?: string;
  description?: string;
  url?: string;
  datePublished: string;
  dateModified: string;
  blog?: boolean;
}

export default function Meta(props: Props) {
  const { title, description, url, datePublished, dateModified, blog } = props;
  const publishedSplit = datePublished.split(".");
  const publishedDate =
    "20" +
    publishedSplit[2] +
    "-" +
    publishedSplit[1] +
    "-" +
    publishedSplit[0];

  const modifiedSplit = dateModified.split(".");
  const modifiedDate =
    "20" + modifiedSplit[2] + "-" + modifiedSplit[1] + "-" + modifiedSplit[0];

  return (
    <Head>
      <link rel="canonical" href={`https://justinschmitz.de/${url}`} />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <title>{title} | justinschmitz.de</title>
      <meta name="description" content={description} />
      <meta name="author" content="Justin Schmitz" />
      <meta
        property="og:site_name"
        content="Justin Schmitz - UX Consultant & Digital Designer"
      />
      <meta property="og:type" content={blog ? "article" : "website"} />
      <meta property="og:url" content={`https://justinschmitz.de/${url}`} />
      <meta property="og:title" content={title + " | " + "justinschmitz.de"} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://justinschmitz.de/apple-touch-icon.png"
      />
      <meta name="twitter:card" content="summary"></meta>
      <meta property="twitter:creator" content="@jschmitz97" />
      <meta property="twitter:site" content="@jschmitz97" />
      <meta property="twitter:url" content="https://twitter.com/jschmitz97" />
      <meta
        property="twitter:title"
        content={title + " | " + "justinschmitz.de ✨"}
      />
      <meta property="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://justinschmitz.de/apple-touch-icon.png"
      />
      <meta name="twitter:image:alt" content="Logo for justinschmitz.de" />
      <script
        {...jsonLdScriptProps<BlogPosting>({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://justinschmitz.de/" + url,
          },
          "headline": title,
          "description": description,
          "image": "https://justinschmitz.de/apple-touch-icon.png",
          "author": {
            "@type": "Person",
            "name": "Justin Schmitz",
            "url": "justinschmitz.de",
            "gender": "male",
            "jobTitle": "UX Consultant & Digital Designer",
            "email": "justin@justinschmitz.de",
            "telephone": "+4915738435060",
            "sameAs": [
              "https://twitter.com/jschmitz97",
              "https://dribbble.com/justinschmitz",
              "https://www.fiverr.com/zoayenemies",
              "https://www.upwork.com/freelancers/~014b24a2eaf9eac622",
              "https://www.xing.com/profile/Justin_Schmitz9/",
              "https://www.linkedin.com/in/justinschmitz97/",
            ],
          },
          "publisher": {
            "@type": "Person",
            "name": "Justin Schmitz",
            "jobTitle": "UX Consultant & Digital Designer",
            "url": "justinschmitz.de",
            "email": "justin@justinschmitz.de",
            "telephone": "+4915738435060",
          },
          "datePublished": publishedDate,
          "dateModified": modifiedDate,
          "isFamilyFriendly": true,
          "inLanguage": "de-DE",
        })}
      />
      )
    </Head>
  );
}
