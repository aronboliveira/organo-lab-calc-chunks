import { useEffect, useRef } from "react";
let writing = false;
export default function Invite(): JSX.Element {
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (mainRef.current?.innerText === "" && !writing) {
      writing = true;
      const text = "E\u00A0aí,\u00A0bora\u00A0cultivar?";
      const timer = 120;
      const parts = text.split("");
      const timelimit = parts.length * timer * 1.5;
      let acc = 0;
      const interv = setInterval(() => {
        if (
          mainRef.current &&
          mainRef.current.innerText.length < parts.length &&
          acc < parts.length &&
          !mainRef.current.innerText.endsWith("?")
        ) {
          mainRef.current.innerText += parts[acc] === " " ? " " : parts[acc];
          acc++;
        }
      }, timer);
      setTimeout(() => {
        clearInterval(interv);
        if (mainRef.current) mainRef.current.innerText = text;
      }, timelimit);
    }
  }, [mainRef]);
  return <strong ref={mainRef} id="invite-logo-title"></strong>;
}
