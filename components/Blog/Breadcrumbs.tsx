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
                "name": urlSplit[0],
                "item": "https://jpegxl.io/#" + urlSplit[0],
              },
            ],
          })}
        />
        )
      </Head>
      <div>
        <Link href={`/#${urlSplit[0]}`} text={`#${urlSplit[0]}`} />
      </div>
    </>
  );
}
