import { metadata } from "../../App";
import EmojiInitializer from "../client/initializers/EmojiInitializer";
import FlatsomeInitializer from "../client/initializers/FlatsomeInitializer";
import GAnalyticsInitializer from "../client/initializers/GAnalyticsInitializer";
//@ts-ignore
import forminatorProps from "../../lib/head/js/client/forminatorProps";
export default function Scripts(): JSX.Element {
  return (
    <>
      <GAnalyticsInitializer />
      <FlatsomeInitializer />
      <EmojiInitializer />
      <script
        id="ldjson"
        type="application/ld+json"
        defer
        className="yoast-schema-graph"
        crossOrigin="anonymous"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": "https://blog.organolab.com.br/calculadora-de-solo/",
                url: origin,
                name: metadata.title,
                isPartOf: {
                  "@id": "https://blog.organolab.com.br/#website",
                },
                datePublished: "2023-12-03T17:23:06+00:00",
                dateModified: new Date().toISOString(),
                breadcrumb: {
                  "@id":
                    "https://blog.organolab.com.br/calculadora-de-solo/#breadcrumb",
                },
                inLanguage: "pt-BR",
                potentialAction: [
                  {
                    "@type": "ReadAction",
                    target: [origin],
                  },
                ],
              },
              {
                "@type": "BreadcrumbList",
                "@id":
                  "https://blog.organolab.com.br/calculadora-de-solo/#breadcrumb",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Início",
                    item: "https://blog.organolab.com.br/",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: metadata.title,
                  },
                ],
              },
              {
                "@type": "WebSite",
                "@id": "https://blog.organolab.com.br/#website",
                url: "https://blog.organolab.com.br/",
                name: "Organo Lab - Blog",
                description: "Cultive conhecimento.",
                potentialAction: [
                  {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate:
                        "https://blog.organolab.com.br/?s={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                ],
                inLanguage: "pt-BR",
              },
            ],
          }),
        }}
      ></script>
      <script
        type="text/javascript"
        defer
        src="https://blog.organolab.com.br/wp-includes/js/wp-emoji-release.min.js?ver=6.6.1"
        id="wp-emoji-release"
        // integrity="sha384-kb/iwIefTlNaT8PTyAdU3tFrLX08KYY4rC0RXn4ltVQiAdodvQ2Nnic5joZBljQW"
      ></script>
      <script
        type="text/javascript"
        defer
        id="forminator-front-scripts-js-extra"
        crossOrigin="anonymous"
        dangerouslySetInnerHTML={{
          __html: `const ForminatorFront = ${JSON.stringify(forminatorProps)}`,
        }}
      />
      <script
        type="text/javascript"
        defer
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossOrigin="anonymous"
        id="boostrap-script"
      ></script>
    </>
  );
}
