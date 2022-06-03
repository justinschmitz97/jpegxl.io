import Link from "@components/Link";
import Head from "next/head";
import { jsonLdScriptProps } from "react-schemaorg";
import { BreadcrumbList } from "schema-dts";
import { useRouter } from "next/router";

export default function Breadcrumbs() {
  const { asPath } = useRouter();
  const url = asPath.split("/");
  const crumb1 = `${process.env.NEXT_PUBLIC_SITE_URL}#${url[1]}`;
  return (
    <>
      <Head>
        <script
          {...jsonLdScriptProps<BreadcrumbList>({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: `#${url[1]}`,
                item: crumb1,
              },
            ],
          })}
        />
        )
      </Head>
      <div>
        <Link href={`/#${url[1]}`} text={`#${url[1]}`} />
      </div>
    </>
  );
}
