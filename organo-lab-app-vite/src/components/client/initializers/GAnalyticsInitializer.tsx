import { useEffect, useState } from "react";
import gTagJsAfterStr from "../../../lib/head/js/client/gtagJsAfter";
export default function GAnalyticsInitializer(): JSX.Element {
  const [fooStr, setFoo] = useState<string>("");
  useEffect(() => {
    setFoo(gTagJsAfterStr ?? "");
  }, []);
  return (
    <script
      type="text/javascript"
      async
      id="google_gtagjs-js-after"
      crossOrigin="anonymous"
      dangerouslySetInnerHTML={{
        __html: fooStr,
      }}
    ></script>
  );
}
