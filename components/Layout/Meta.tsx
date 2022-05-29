import Head from "next/head";
import { jsonLdScriptProps } from "react-schemaorg";
import { BlogPosting, Organization } from "schema-dts";

export interface Props {
  title: string;
  description: string;
  url: string;
  datePublished: Date;
  dateModified?: Date;
}

export default function Meta(props: Props) {
  const { title, description, url, datePublished, dateModified } = props;
  return (
    <Head>
      <link
        rel="canonical"
        href={`${process.env.NEXT_PUBLIC_SITE_URL}${url}/`}
      />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />

      <title>
        {title} | {process.env.NEXT_PUBLIC_SITE_NAME} ✨
      </title>

      <meta name="description" content={description} />
      <meta name="author" content="Justin Schmitz" />

      <meta
        property="og:site_name"
        content={`${process.env.NEXT_PUBLIC_FORMAT} Converter | ${process.env.NEXT_PUBLIC_SITE_NAME} ✨`}
      />
      <meta property="og:type" content={dateModified ? "article" : "website"} />
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_SITE_URL}${url}`}
      />
      <meta
        property="og:title"
        content={title + " | " + process.env.NEXT_PUBLIC_SITE_NAME}
      />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`${process.env.NEXT_PUBLIC_SITE_URL}logo.png`}
      />

      <meta name="twitter:card" content="summary"></meta>
      <meta property="twitter:creator" content="@jschmitz97" />
      <meta property="twitter:site" content="@jschmitz97" />
      <meta property="twitter:url" content="https://twitter.com/jschmitz97" />
      <meta
        property="twitter:title"
        content={title + " | " + process.env.NEXT_PUBLIC_SITE_NAME + "✨"}
      />
      <meta property="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={`${process.env.NEXT_PUBLIC_SITE_URL}twitter.png`}
      />

      <script
        {...jsonLdScriptProps<Organization>({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: process.env.NEXT_PUBLIC_SITE_NAME,
          url: process.env.NEXT_PUBLIC_SITE_URL,
          logo: `${process.env.NEXT_PUBLIC_SITE_URL}logo.png`,
          sameAs: [
            "https://github.com/justinschmitz97/jpegxl.io/",
            "https://discord.com/invite/6w42YpF5hm",
          ],
        })}
      />

      {dateModified && (
        <script
          {...jsonLdScriptProps<BlogPosting>({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": process.env.NEXT_PUBLIC_SITE_URL + url + "/",
            },
            headline: title,
            description: description,
            image: `${process.env.NEXT_PUBLIC_SITE_URL}logo.png`,
            author: {
              "@type": "Person",
              name: "Justin Schmitz",
              sameAs: [
                "https://twitter.com/jschmitz97",
                "https://dribbble.com/justinschmitz",
                "https://www.fiverr.com/zoayenemies",
                "https://www.upwork.com/freelancers/~014b24a2eaf9eac622",
                "https://www.xing.com/profile/Justin_Schmitz9/",
                "https://www.linkedin.com/in/justinschmitz97/",
              ],
            },
            publisher: {
              "@type": "Organization",
              name: process.env.NEXT_PUBLIC_SITE_NAME,
              logo: {
                "@type": "ImageObject",
                url: `${process.env.NEXT_PUBLIC_SITE_URL}logo.png`,
              },
              brand: process.env.NEXT_PUBLIC_SITE_NAME,
              url: process.env.NEXT_PUBLIC_SITE_URL,
              knowsAbout: [
                `${process.env.NEXT_PUBLIC_FORMAT}`,
                "image performance",
              ],
              email: process.env.NEXT_PUBLIC_SITE_MAIL,
            },
            datePublished: new Date(datePublished).toISOString(),
            dateModified: new Date(dateModified).toISOString(),
            isFamilyFriendly: true,
            isAccessibleForFree: true,
            inLanguage: "en-US",
          })}
        />
      )}
    </Head>
  );
}
