import { isClickOutside } from "../../../lib/handlers";
import { useState, useEffect } from "react";
import { Root, createRoot } from "react-dom/client";
import SidebarContent from "../content/SidebarContent";
import { rMouseEvent } from "../../../declarations/types";
import { titles } from "../../main/Header";
import { keyPhrase } from "../../../App";
const menuRoots: { [k: string]: Root } = {};
function applyAttributesAndStyles(
  sideMenu: HTMLElement,
  altText: string,
  translateY: number,
  title: string
) {
  try {
    const element =
      sideMenu.querySelector(`[alt="${keyPhrase} — ${altText}"]`) ??
      sideMenu.querySelector(
        `[alt="${keyPhrase} — ${altText.toLowerCase()}"]`
      ) ??
      sideMenu.querySelector(`[alt="${altText}"]`) ??
      sideMenu.querySelector(`[alt="${altText.toLowerCase()}"]`);
    if (!(element instanceof HTMLElement))
      throw new Error(`Failed to fetch ${altText} image`);
    element.style.transition = "transform .5s ease-in-out";
    element.style.transform = `scale(1.3) translate(2px, ${translateY}px)`;
    const elementAnchor = element.closest("a") ?? element.querySelector("a");
    if (!(elementAnchor instanceof HTMLElement))
      throw new Error(`Failed to fetch ${altText} anchor`);
    elementAnchor.title = title;
    elementAnchor.classList.add("anchor-shop", "menu-external");
  } catch (e) {
    console.error(
      `Error executing procedures to apply attributes and styles to ${altText} elements:\n${
        (e as Error).message
      }`
    );
  }
}
export default function HeaderMenu(): JSX.Element {
  const [shouldOpenMenu, setMenu] = useState<boolean>(false);
  const handleClick = (c: rMouseEvent) => {
    c.stopPropagation();
    setTimeout(() => {
      if (
        document.querySelector(".off-canvas") &&
        isClickOutside(c, ".mfp-content").some(coord => coord === true) &&
        isClickOutside(c, ".mfp-wrap.off-canvas").every(
          coord => coord === false
        )
      ) {
        console.log("click setting to false...");
        setMenu(false);
      }
    }, 200);
  };
  useEffect(() => {
    const handleKeyPress = (k: KeyboardEvent): void => {
      if (document.querySelector(".off-canvas") && k.key === "Escape") {
        console.log("esc setting to false...");
        setMenu(false);
      }
    };
    addEventListener("keydown", handleKeyPress);
    return () => removeEventListener("keydown", handleKeyPress);
  }, []);
  useEffect(() => {
    const handleMenuUpdate = (): void => {
      const searchContent = (menuWrapper: HTMLElement): void => {
        menuWrapper.addEventListener("click", handleClick);
        const content = menuWrapper.querySelector(".mfp-content");
        if (!content) throw new Error(`Failed to fetch mfp-content element`);
        let idf = "mpf-content";
        if (content.id === "") {
          content.id = "sidebarContent";
          idf = content.id;
        }
        if (menuRoots[idf] && !(menuRoots[idf] as any)["_innerRoot"]) {
          setTimeout(() => {
            menuRoots[idf].unmount();
            delete menuRoots[idf];
          }, 200);
        }
        if (!menuRoots[idf]) menuRoots[idf] = createRoot(content);
        if (shouldOpenMenu) {
          menuRoots[idf].render(
            <SidebarContent s={shouldOpenMenu} d={setMenu} />
          );
          setTimeout(() => {
            if (!document.getElementById("main-menu")) {
              if (menuRoots[idf] && !(menuRoots[idf] as any)["_innerRoot"]) {
                menuRoots[idf].unmount();
                delete menuRoots[idf];
              }
              if (!menuRoots[idf]) menuRoots[idf] = createRoot(content);
              menuRoots[idf].render(
                <SidebarContent s={shouldOpenMenu} d={setMenu} />
              );
            }
            setTimeout(() => {
              const sideMenu = document.getElementById("main-menu");
              if (!(sideMenu instanceof Element)) {
                const message = "Failed o render menu. Try reloading!";
                alert(message);
                console.warn(`${message}\n
                Root: ${menuRoots[idf] ?? "Failed to define"}\n
                innerRoot: ${
                  (menuRoots[idf] as any)?._innerRoot
                } ?? 'Failed to define.`);
              } else {
                try {
                  applyAttributesAndStyles(sideMenu, "Loja", -10, titles.shop);
                  applyAttributesAndStyles(
                    sideMenu,
                    "Artigos",
                    0,
                    titles.articles
                  );
                  applyAttributesAndStyles(
                    sideMenu,
                    "Downloads",
                    10,
                    titles.downloads
                  );
                  applyAttributesAndStyles(
                    sideMenu,
                    "Categorias",
                    0,
                    titles.categories
                  );
                } catch (e) {
                  console.error(
                    `Error executing procedures to applying attributes and styles to menu elements:\n${
                      (e as Error).message
                    }`
                  );
                }
              }
            }, 200);
          }, 200);
        } else menuRoots[idf].render(<div></div>);
      };
      setTimeout(() => {
        const menuWrapper = document.querySelector(".mfp-wrap.off-canvas");
        if (!(menuWrapper instanceof HTMLElement)) {
          console.warn("Failed to search content at first attempt...");
          setTimeout(() => {
            const menuWrapper = document.querySelector(".mfp-wrap.off-canvas");
            if (!(menuWrapper instanceof HTMLElement)) {
              console.warn(`No wrapper found!`);
              return;
            }
            searchContent(menuWrapper);
          }, 300);
          return;
        }
        console.log("Searching content...");
        document.querySelector("body")!.style.display = "100vw";
        searchContent(menuWrapper);
      }, 200);
    };
    const preloader =
      document.querySelector(".mfp-preloader") ||
      document.querySelector(".mfp-preloader");
    if (preloader instanceof HTMLElement) preloader.innerText = "";
    setTimeout(() => {
      if (shouldOpenMenu && document.querySelector(".mfp-content")) {
        const preloader =
          document.querySelector(".mfp-preloader") ||
          document.querySelector(".mfp-preloader");
        if (preloader instanceof HTMLElement)
          preloader.innerHTML = `
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          `;
        handleMenuUpdate();
      }
    }, 100);
  }, [shouldOpenMenu]);
  return (
    <div className="header-button">
      <a
        href="#"
        id="headerButtonAnchor"
        data-open="#main-menu"
        data-pos="left"
        data-bg="main-menu-overlay"
        data-color=""
        className="icon primary button round is-small"
        aria-label="Menu"
        aria-controls="main-menu"
        aria-expanded="false"
        onClick={() => setMenu(true)}
      >
        <i className="icon-menu"></i>
      </a>
    </div>
  );
}
