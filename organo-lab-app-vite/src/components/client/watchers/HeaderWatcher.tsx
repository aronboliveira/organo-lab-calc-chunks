import { parseNotNaN, syncAriaStates } from "../../../lib/handlers";
import { useEffect } from "react";
export default function HeaderWatcher(): JSX.Element {
  const handleScroll = () => {
    const headerWrapper = document
      .querySelector("header")
      ?.querySelector(".header-wrapper");
    if (
      scrollY === 0 &&
      headerWrapper instanceof HTMLElement &&
      headerWrapper.classList.contains("stuck") &&
      parseNotNaN(
        getComputedStyle(headerWrapper!).top.replace("px", "").trim()
      ) > 0
    )
      headerWrapper.classList.remove("stuck");
  };
  useEffect(() => {
    document.querySelectorAll(".kit-title").forEach(title => {
      if (!(title instanceof HTMLElement)) return;
      if (title.innerText.length < 35) {
        let acc = 0;
        const nCicles = 35 - title.innerText.length;
        for (let i = 0; i <= nCicles; i++) acc += 1.2;
        let prevPad =
          parseNotNaN(
            getComputedStyle(title).paddingRight.replace("px", "").trim()
          ) || 0;
        if (!Number.isFinite(prevPad)) {
          console.warn(
            `Previous title padding not validated as Finite. Defaulting to 0.`
          );
          prevPad = 0;
        }
        title.style.transition =
          getComputedStyle(title).transition !== ""
            ? `${
                getComputedStyle(title).transition ?? ""
              }, padding 0.25s ease-in-out`
            : "padding 0.25s ease-in-out";
        title.style.paddingRight = `${prevPad + acc}px`;
      }
    });
    handleScroll();
    syncAriaStates(document.querySelectorAll("*"));
    addEventListener("scroll", handleScroll);
    setTimeout(() => {
      document.querySelectorAll("img").forEach(img => {
        if (img instanceof HTMLImageElement && img.src.startsWith("/image"))
          img.src = img.src.replace("/image", "image");
      });
    }, 500);
    setTimeout(() => {
      alert(
        "Esta é uma implantação estática de teste feita com Vite + React.js para posterior integração no sistema WordPress da Organo Lab©.\n\nPor favor visite https://organolab.com.br/ para informações em produção.\n\n\nCódigo aberto disponível em: https://github.com/aronboliveira/organo-lab-teste"
      );
    }, 4100);
    return () => removeEventListener("scroll", handleScroll);
  }, []);
  return <div id="header-watcher"></div>;
}
