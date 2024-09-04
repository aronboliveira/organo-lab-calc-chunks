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
    const head = document.head;
    try {
      const kw = document.querySelector('meta[name="keywords"]');
      const kws =
        "Jardinagem, Cultivo, Solo, Compostagem, Horticultura, Fertilizantes, Agricultura sustentável, Substratos, Adubo orgânico, Solo nutritivo, Solo para jardinagem, Melhorador de solo, Composição de solo, Cultivo sustentável, Calculadora de solo, Montagem de solo, Kit de solo, Solo matinho cheiroso, Receita de solo, Receita matinho cheiroso, Solo vivo, Super solo, Solo orgânico, Gardening, Cultivation, Soil, Composting, Horticulture, Fertilizers, Sustainable agriculture, Substrates, Organic fertilizer, Nutritious soil, Gardening soil, Soil enhancer, Soil composition, Sustainable cultivation, Soil calculator, Soil assembly, Soil kit, Fragrant soil, Soil recipe, Fragrant soil recipe, Living soil, Super soil, Organic soil, Jardinería, Cultivo, Suelo, Compostaje, Horticultura, Fertilizantes, Agricultura sostenible, Sustratos, Fertilizante orgánico, Suelo nutritivo, Suelo para jardinería, Mejorador de suelo, Composición del suelo, Cultivo sostenible, Calculadora de suelo, Montaje de suelo, Kit de suelo, Suelo fragante, Receta de suelo, Receta de suelo fragante, Suelo vivo, Súper suelo, Suelo orgánico";
      if (!kw) {
        const metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        metaKeywords.setAttribute("content", kws);
        head.prepend(metaKeywords);
      } else if (kw instanceof HTMLMetaElement)
        kw.content = [
          ...new Set(kw.content.split(", ").concat(kws.split(", "))),
        ].join(", ");
      if (
        !(
          document.querySelector('meta[http-equiv="X-UA-Compatible"]') ??
          document.querySelector('meta[http-equiv="x-ua-compatible"]')
        )
      ) {
        const metaCompat = document.createElement("meta");
        metaCompat.setAttribute("http-equiv", "X-UA-Compatible");
        metaCompat.setAttribute("content", "IE=Edge");
        head.prepend(metaCompat);
      }
      if (!document.querySelector('meta[http-equiv="content-type"]')) {
        const metaCharset = document.createElement("meta");
        metaCharset.setAttribute("http-equiv", "content-type");
        metaCharset.setAttribute("content", "text/html; charset=UTF-8");
        head.prepend(metaCharset);
      }
    } catch (e) {
      console.error(
        `Error executing procedures for appending base meta tags:\n${
          (e as Error).message
        }`
      );
    }
    const metaOgTags = [
      {
        property: "og:image",
        content: "https://blog.organolab.com.br/images/orglab_logo_og_630.png",
      },
      { property: "og:image:width", content: "630" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Organo Lab © — Título: Calculadora de Solo",
      },
      {
        property: "article:author",
        content: "Aron Barbosa de Oliveira (https://github.com/aronboliveira)",
      },
      { property: "article:author", content: "Danilo Sakamoto" },
      { property: "article:section", content: "Science" },
    ];
    const lastOgTag = [...head.querySelectorAll('meta[property^="og:"]')].pop();
    metaOgTags.forEach(tag => {
      if (!document.querySelector(`meta[property="${tag.property}"]`)) {
        const meta = document.createElement("meta");
        meta.setAttribute("property", tag.property);
        meta.setAttribute("content", tag.content);
        lastOgTag ? lastOgTag.after(meta) : head.appendChild(meta);
      }
    });
    const metaTwitterTags = [
      { name: "twitter:title", content: "Organo Lab © — Calculadora de Solo" },
      {
        name: "twitter:image",
        content:
          "https://blog.organolab.com.br/images/orglab_logo_twitter_628.png",
      },
      {
        name: "twitter:description",
        content:
          "Calculadora da Organo Lab © para que você tenha suas receitas de uma forma simples e comece a montar seu solo em casa!",
      },
    ];
    const lastTwitterTag = [
      ...head.querySelectorAll('meta[name^="twitter:"]'),
    ].pop();
    metaTwitterTags.forEach(tag => {
      if (!document.querySelector(`meta[name="${tag.name}"]`)) {
        const meta = document.createElement("meta");
        meta.setAttribute("name", tag.name);
        meta.setAttribute("content", tag.content);
        lastTwitterTag ? lastTwitterTag.after(meta) : head.appendChild(meta);
      }
    });
    const iconLinks = [
      {
        href: "https://blog.organolab.com.br/wp-content/uploads/2024/09/org_lab_logo_favicon_16.png",
        id: "favicon_16",
        sizes: "16x16",
        rel: "icon",
        crossorigin: "anonymous",
        "data-icon-group": "favicon",
      },
      {
        href: "https://blog.organolab.com.br/wp-content/uploads/2024/09/org_lab_logo_safari.png",
        id: "safari_icon",
        sizes: "16x16",
        rel: "icon",
        crossorigin: "anonymous",
        "data-icon-group": "safari",
      },
      {
        href: "https://blog.organolab.com.br/wp-content/uploads/2024/09/org_lab_logo_favicon_64.png",
        id: "favicon_64",
        sizes: "64x64",
        rel: "icon",
        crossorigin: "anonymous",
        "data-icon-group": "favicon",
      },
      {
        href: "https://blog.organolab.com.br/wp-content/uploads/2024/09/org_lab_logo_ati_57.png",
        id: "ati_icon_57",
        sizes: "57x57",
        rel: "apple-touch-icon",
        crossorigin: "anonymous",
        "data-icon-group": "apple-touch-icon",
      },
      {
        href: "https://blog.organolab.com.br/wp-content/uploads/2024/09/org_lab_logo_ati_60.png",
        id: "ati_icon_60",
        sizes: "60x60",
        rel: "apple-touch-icon",
        crossorigin: "anonymous",
        "data-icon-group": "apple-touch-icon",
      },
      {
        href: "https://blog.organolab.com.br/wp-content/uploads/2024/09/org_lab_logo_ati_72.png",
        id: "ati_icon_72",
        sizes: "72x72",
        rel: "apple-touch-icon",
        crossorigin: "anonymous",
        "data-icon-group": "apple-touch-icon",
      },
      {
        href: "https://blog.organolab.com.br/wp-content/uploads/2024/09/org_lab_logo_ati_76.png",
        id: "ati_icon_76",
        sizes: "76x76",
        rel: "apple-touch-icon",
        crossorigin: "anonymous",
        "data-icon-group": "apple-touch-icon",
      },
      {
        href: "https://blog.organolab.com.br/wp-content/uploads/2024/09/org_lab_logo_favicon_96.png",
        id: "favicon_96",
        sizes: "96x96",
        rel: "icon",
        crossorigin: "anonymous",
        "data-icon-group": "favicon",
      },
      {
        href: "https://blog.organolab.com.br/wp-content/uploads/2024/09/org_lab_logo_ati_114.png",
        id: "ati_icon_114",
        sizes: "114x114",
        rel: "apple-touch-icon",
        crossorigin: "anonymous",
        "data-icon-group": "apple-touch-icon",
      },
      {
        href: "https://blog.organolab.com.br/wp-content/uploads/2024/09/org_lab_logo_ati_120.png",
        id: "ati_icon_120",
        sizes: "120x120",
        rel: "apple-touch-icon",
        crossorigin: "anonymous",
        "data-icon-group": "apple-touch-icon",
      },
      {
        href: "https://blog.organolab.com.br/wp-content/uploads/2024/09/org_lab_logo_ati_144.png",
        id: "ati_icon_144",
        sizes: "144x144",
        rel: "apple-touch-icon",
        crossorigin: "anonymous",
        "data-icon-group": "apple-touch-icon",
      },
      {
        href: "https://blog.organolab.com.br/wp-content/uploads/2024/09/org_lab_logo_ati_152.png",
        id: "ati_icon_152",
        sizes: "152x152",
        rel: "apple-touch-icon",
        crossorigin: "anonymous",
        "data-icon-group": "apple-touch-icon",
      },
      {
        href: "https://blog.organolab.com.br/wp-content/uploads/2024/09/org_lab_logo_ati_167.png",
        id: "ati_icon_167",
        sizes: "167x167",
        rel: "apple-touch-icon",
        crossorigin: "anonymous",
        "data-icon-group": "apple-touch-icon",
      },
      {
        href: "https://blog.organolab.com.br/wp-content/uploads/2022/05/cropped-ORGLAB_Logo-180x180.png",
        id: "ati_icon_180",
        sizes: "180x180",
        rel: "apple-touch-icon",
        crossorigin: "anonymous",
        "data-icon-group": "apple-touch-icon",
      },
      {
        href: "https://blog.organolab.com.br/wp-content/uploads/2024/09/org_lab_logo_and_196.png",
        id: "android_chrome_icon_196",
        sizes: "196x196",
        rel: "icon",
        crossorigin: "anonymous",
        "data-icon-group": "android-chrome",
      },
      {
        href: "https://blog.organolab.com.br/wp-content/uploads/2024/09/org_lab_logo_and_512.png",
        id: "android_chrome_icon_512",
        sizes: "512x512",
        rel: "icon",
        crossorigin: "anonymous",
        "data-icon-group": "android-chrome",
      },
    ];
    const lastIconLink = [...head.querySelectorAll('link[rel="icon"]')].pop();
    iconLinks.forEach(link => {
      if (
        !(
          document.querySelector(`link#${link.id}`) ||
          document.querySelector(`link[href="${link.href}"]`)
        )
      ) {
        const icon = document.createElement("link");
        icon.setAttribute("href", link.href);
        icon.setAttribute("id", link.id);
        icon.setAttribute("sizes", link.sizes);
        icon.setAttribute("rel", link.rel);
        icon.setAttribute("crossorigin", "anonymous");
        lastIconLink ? lastIconLink.after(icon) : head.appendChild(icon);
      }
    });
    if (!document.querySelector('meta[content*="browserConfig.xml"]')) {
      const meta = document.createElement("meta");
      meta.setAttribute(
        "content",
        "https://cdn.jsdelivr.net/gh/aronboliveira/organo-lab-calc-chunks@main/browserConfig.xml"
      );
      head.append(meta);
    }
    const additionalLinks = [
      {
        id: "google-fonts-api",
        href: "https://fonts.googleapis.com",
        rel: "preconnect",
        crossorigin: "anonymous",
      },
      {
        id: "google-fonts-static",
        href: "https://fonts.gstatic.com",
        rel: "preconnect",
        crossorigin: "anonymous",
      },
      {
        id: "google-fonts-poppins",
        href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&amp;display=swap",
        rel: "stylesheet",
        crossorigin: "anonymous",
      },
      {
        id: "bootstrap-link",
        href: "https://cdn.jsdelivr.net/gh/aronboliveira/organo-lab-calc-chunks@main/organo_lab_styles.1.0.11.3c0f17be2aed033afc99.min.css",
        rel: "stylesheet",
        integrity:
          "sha384-uJnkwiYL/tUwpfJ84Bh0RoKjkGJyCrgN8Cxax6IJ2I8ZwiU9U7y+r8UsyScfZ8aI",
        crossorigin: "anonymous",
      },
    ];
    additionalLinks.forEach(link => {
      if (
        !document.querySelector(`link#${link.id}`) ||
        !document.querySelector(`link[href="${link.href}"]`)
      ) {
        const linkElement = document.createElement("link");
        linkElement.setAttribute("href", link.href);
        linkElement.setAttribute("rel", link.rel);
        linkElement.setAttribute("crossorigin", link.crossorigin);
        if (link.integrity)
          linkElement.setAttribute("integrity", link.integrity);
        head.appendChild(linkElement);
      }
    });
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
      <script
        defer
        src="https://cdn.jsdelivr.net/gh/aronboliveira/organo-lab-calc-chunks@main/organo_lab_bundle.1.0.11.9b2c85e45bca45ad077c.min.js"
        integrity="sha384-6nEpaLg3VkSUqisbADOOwfCSdmjW48EQBitNFNm2VM8v/8rwV+4Xwh98XDLu7oKK"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}
