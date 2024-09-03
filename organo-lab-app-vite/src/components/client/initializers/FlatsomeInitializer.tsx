import flatsomeVars from "../../../lib/head/js/client/flatsomeProps";
export default function FlatsomeInitializer(): JSX.Element {
  return (
    <script
      id="flatsome-js-js-extra"
      crossOrigin="anonymous"
      dangerouslySetInnerHTML={{
        __html: `window.flatsomeVars = ${JSON.stringify(flatsomeVars)};`,
      }}
    ></script>
  );
}
