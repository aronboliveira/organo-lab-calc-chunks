import { useEffect } from "react";
export default function JsInitializer(): JSX.Element {
  useEffect(() => {
    document.documentElement.className =
      document.documentElement.className.replace(/\bno-js\b/, "js");
  }, []);
  return (
    <script
      type="text/javascript"
      defer
      id="remove-no-js"
      crossOrigin="anonymous"
    ></script>
  );
}
