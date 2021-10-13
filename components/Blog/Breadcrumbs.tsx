import Link from "@components/Link";
import Head from "next/head";
import { jsonLdScriptProps } from "react-schemaorg";
import { BreadcrumbList } from "schema-dts";

export default function Breadcrumbs(props: any) {
  const urlSplit = props.postMeta.url.split("/");
  return (
    <>
      <Head>
        <script
          {...jsonLdScriptProps<BreadcrumbList>({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": urlSplit[1],
                "item": "https://jpegxl.io/#" + urlSplit[1],
              },
            ],
          })}
        />
        )
      </Head>
      <div>
        <div
          data-transition-style="in:wipe:right"
          className="animation-delay-3"
        >
          <Link href={`/#${urlSplit[0]}`} text={`#${urlSplit[0]}`} />
        </div>
      </div>
    </>
  );
}
