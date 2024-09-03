import { InpProps } from "../../../../declarations/componentsInterfaces";
import { nlDl } from "../../../../declarations/types";
import { parseNotNaN } from "../../../../lib/handlers";
import { useRef, useEffect } from "react";
const recent: { [k: string]: string[] } = {};
export default function LNumInp({
  title,
  group,
  id,
  name,
  large,
  s,
  d,
  r,
}: InpProps): JSX.Element {
  const pascalId = `${id?.charAt(0).toUpperCase() ?? ""}${id?.slice(1) ?? ""}`;
  const joinedTitle = title.replace(/[\s\|]/g, "");
  const optRef = useRef<HTMLElement | null>(null);
  const dlRef = useRef<nlDl>(null);
  const sanitazeValue = (n: string) => {
    if (/[^0-9,\.]/g.test(n)) n = n.replace(/[^0-9,\.]/g, "");
    if (n.length > 5) n = n.slice(0, 5);
    return n ?? "0";
  };
  useEffect(() => {
    const handleResize = (): void => {
      if (
        optRef.current instanceof HTMLElement &&
        r.current instanceof HTMLElement
      ) {
        const prevHeight = getComputedStyle(optRef.current).height;
        optRef.current.style.height = `${getComputedStyle(r.current)
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
  }, [r]);
  useEffect(() => {
    try {
      if (!(r.current instanceof HTMLInputElement)) return;
      if (!(dlRef.current instanceof HTMLDataListElement)) return;
      sessionStorage.setItem("v", s);
      if (s !== "") {
        if (!recent[`${r.current.id}`]) recent[`${r.current.id}`] = [];
        if (!recent[`${r.current.id}`].includes(s)) {
          recent[`${r.current.id}`].push(s);
          if (recent[`${r.current.id}`].length > 3)
            recent[`${r.current.id}`].shift();
          dlRef.current.innerHTML = "";
          recent[`${r.current.id}`].forEach(value => {
            dlRef.current?.appendChild(
              Object.assign(document.createElement("option"), {
                value: value,
              })
            );
          });
        }
      }
    } catch (e) {
      console.error(
        `Error executing interv for filling datalist at ${new Date().getMilliseconds()}:\n${
          (e as Error).message
        }`
      );
    }
  }, [s, r]);
  return (
    <fieldset
      id={`fs${pascalId}`}
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
        id={`div${pascalId}`}
        className="calc-inp-div"
        data-title={joinedTitle}
      >
        <input
          id={id}
          className="form-control calc-inp"
          name={name}
          title="Digite aqui o valor de solo para ser avaliado."
          placeholder="Digite aqui os litros de solo."
          data-title={joinedTitle}
          data-group={group}
          type="number"
          pattern="^[0-9]{1,}$"
          min={0}
          max={99999}
          minLength={1}
          maxLength={5}
          autoComplete="off"
          list={`dl${pascalId}`}
          ref={r}
          value={s}
          onKeyDown={k => {
            if (k.key === "+" || k.key === "-") k.preventDefault();
          }}
          onInput={ev => d(sanitazeValue(ev.currentTarget.value))}
          onChange={ev => d(sanitazeValue(ev.currentTarget.value))}
        />
        <datalist
          id={`dl${pascalId}`}
          data-title={joinedTitle}
          data-group={group}
          ref={dlRef}
        ></datalist>
        <abbr
          id={`select${pascalId}`}
          className="calc-measure"
          ref={optRef}
          data-title={joinedTitle}
        >
          L
        </abbr>
      </div>
    </fieldset>
  );
}
