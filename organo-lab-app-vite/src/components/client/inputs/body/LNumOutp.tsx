import { IOProps } from "../../../../declarations/componentsInterfaces";
import { nOutp, nlSel } from "../../../../declarations/types";
import { parseNotNaN } from "../../../../lib/handlers";
import { removeAccents } from "../../../../lib/models";
import { useRef, useEffect } from "react";
export default function LNumOutp({
  title,
  group,
  iniValue = "kg",
  id,
  name,
  large,
}: IOProps): JSX.Element {
  const pascalId = `${id?.charAt(0) ?? ""}${id?.slice(1) ?? ""}`;
  const joinedTitle = removeAccents(title.replace(/[\s\|]/g, ""));
  const optRef = useRef<nlSel>(null);
  const outpRef = useRef<nOutp>(null);
  useEffect(() => {
    const handleResize = (): void => {
      if (
        optRef.current instanceof HTMLElement &&
        outpRef.current instanceof HTMLElement
      ) {
        const prevHeight = getComputedStyle(optRef.current).height;
        optRef.current.style.height = `${getComputedStyle(outpRef.current)
          .height.replace("px", "")
          .trim()}px`;
        if (
          parseNotNaN(
            getComputedStyle(optRef.current).height.replace("px", "").trim()
          ) <= 0
        )
          optRef.current.style.height = prevHeight;
      }
    };
    addEventListener("resize", handleResize);
    return () => removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      id={`group${pascalId}`}
      data-title={title}
      className={large ? "calc-group-large" : "calc-group"}
    >
      <label
        id={`lb${pascalId}`}
        htmlFor={id}
        className="calc-lab"
        data-title={title}
      >
        <b>
          {/__/g.test(title)
            ? `${title.slice(0, title.indexOf("__"))}:`
            : `${title}:`}
        </b>
      </label>
      <div
        id={`div${pascalId}}`}
        className="calc-outp-div"
        data-title={joinedTitle}
      >
        <output
          id={id}
          className="form-control calc-outp"
          data-name={name}
          data-title={joinedTitle}
          data-group={group}
          ref={outpRef}
        />
        <abbr
          id={`measure${pascalId}`}
          className="calc-measure"
          ref={optRef}
          data-title={joinedTitle}
        >
          {iniValue.length === 1
            ? iniValue.toUpperCase()
            : `${iniValue.charAt(0).toUpperCase()}${iniValue
                .slice(1)
                .toLowerCase()}`}
        </abbr>
      </div>
      {name === "cr_flour" ? (
        <small
          className="recommendation outp-recommendation"
          id={`cr-flour-${title}-recommendation`}
        >
          Indicamos substituir esse item por Farinha de Algas
        </small>
      ) : (
        <></>
      )}
    </div>
  );
}
