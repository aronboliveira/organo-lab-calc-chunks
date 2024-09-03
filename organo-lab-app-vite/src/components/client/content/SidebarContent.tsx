import { keyPhrase } from "../../../App";
import { SidebarProps } from "../../../declarations/componentsInterfaces";
import { nullishDiv } from "../../../declarations/types";
import { useRef, useEffect } from "react";
import { syncAriaStates } from "../../../lib/handlers";
export default function SidebarContent(props: SidebarProps): JSX.Element {
  console.log(props.toString().slice(1));
  const mainRef = useRef<nullishDiv>(null);
  useEffect(() => {
    try {
      const body = document.querySelector("body");
      if (body instanceof HTMLElement) body.style.width = "100vw";
      if (!mainRef.current) throw new Error(`Main reference voidish.`);
      const container = mainRef.current.closest(".mfp-container");
      if (!(container instanceof HTMLElement))
        throw new Error(`Mfp container not found.`);
      if (container.classList.contains("mfp-s-error")) {
        container.classList.remove("mfp-s-error");
        const content = mainRef.current.closest(".mfp-content");
        if (content instanceof HTMLElement)
          content.style.animation = `slideIn ease-in .2s`;
        container.classList.add("mfp-s-ready");
        syncAriaStates(container.querySelectorAll("*"));
      }
    } catch (e) {
      console.error(
        `Error executing callback for effects in ${
          SidebarContent.prototype.constructor.name
        }:\n${(e as Error).message}`
      );
    }
    return () => {
      const body = document.querySelector("body");
      if (body instanceof HTMLElement) body.style.width = "100%";
    };
  }, []);
  return (
    <div id="main-menu" className="mobile-sidebar no-scrollbar" ref={mainRef}>
      <div className="sidebar-menu no-scrollbar ">
        <ul className="nav nav-sidebar nav-vertical nav-uppercase" data-tab="1">
          <li className="html custom html_topbar_right">
            <a href="https://www.organolab.com.br/">
              <img
                alt={`${keyPhrase} — Loja`}
                src="https://blog.organolab.com.br/wp-content/uploads/2022/12/Sem-titulo-1.png"
                width={150}
                height={70}
              />
            </a>
          </li>
          <li className="html custom html_top_right_text">
            <a href="https://blog.organolab.com.br/blog">
              <img
                alt={`${keyPhrase} — Artigos`}
                src="https://blog.organolab.com.br/wp-content/uploads/2022/05/artigos.png"
                width={150}
                height={70}
              />
            </a>
          </li>
          <li className="html custom html_nav_position_text_top">
            <a href="https://blog.organolab.com.br/blog/">
              <img
                alt={`${keyPhrase} — Categorias`}
                src="https://blog.organolab.com.br/wp-content/uploads/2022/05/categorias.png"
                width={150}
                height={70}
              />
            </a>
          </li>
          <li className="html custom html_nav_position_text">
            <a href="https://blog.organolab.com.br/">
              <img
                alt={`${keyPhrase} — Downloads`}
                src="https://blog.organolab.com.br/wp-content/uploads/2022/05/downloads.png"
                width={150}
                height={70}
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
