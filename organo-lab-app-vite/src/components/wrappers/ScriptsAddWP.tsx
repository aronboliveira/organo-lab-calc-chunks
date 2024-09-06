import FlatsomeInitializer from "../client/initializers/FlatsomeInitializer";
import forminatorProps from "../../lib/head/js/client/forminatorProps";
import { useEffect } from "react";
import { modelScripts } from "../../lib/models";
export default function ScriptsAddWp(): JSX.Element {
  useEffect(() => {
    modelScripts();
    try {
      const schema =
        document.querySelector(".yoast-schema-graph") ??
        document.querySelector('[type="application/ld+json"]');
      if (!(schema instanceof HTMLElement))
        throw new Error(`Failed to fetch yoast schema element`);
      if (!/image/.test(schema.innerHTML)) {
        try {
          const schemaData = JSON.parse(schema.innerText);
          schemaData.image = {
            "@type": "ImageObject",
            url: "https://blog.organolab.com.br/images/orglab_logo_og_630.png",
            width: 630,
            height: 630,
          };
          schema.textContent = JSON.stringify(schemaData, null, 2);
        } catch (e) {
          console.error(`Failed to parse schema JSON: ${(e as Error).message}`);
        }
      }
    } catch (e) {
      console.error(
        `Error executing useEffect for Scripts:${(e as Error).message}`
      );
    }
  }, []);
  return (
    <>
      <FlatsomeInitializer />
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
