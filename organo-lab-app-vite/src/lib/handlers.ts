import { kitGroups, rMouseEvent, voidish } from "../declarations/types";

export const removeOverlay = (): void => {
  console.log("removing overlay...");
  document.querySelectorAll(".off-canvas").forEach(el => el.remove());
};
let prevClickAttempt: any, lastClickAttempt: any;
export function isClickOutside(event: rMouseEvent, query: string): boolean[] {
  try {
    lastClickAttempt = new Date();
    const el = document.querySelector(query);
    if (!el) {
      if (Math.abs(lastClickAttempt - prevClickAttempt) > 1000)
        throw new Error(`Element for checking click coordinates not found`);
      else return [false, false, false, false];
    }
    const rect = el.getBoundingClientRect();
    const { clientX, clientY } = event;
    prevClickAttempt = lastClickAttempt;
    return [
      clientX < rect.left,
      clientX > rect.right,
      clientY < rect.top,
      clientY > rect.bottom,
    ];
  } catch (e) {
    console.error(`Error executing isClickOutside:\n${(e as Error).message}`);
    prevClickAttempt = new Date();
    return [false, false, false, false];
  }
}
export function parseNotNaN(
  iniVal: string,
  def: number = 0,
  context: string = "float",
  fixed: number = 4
): number {
  let returnVal = 0;
  try {
    if (typeof iniVal !== "string")
      throw new Error("Failed to validate argument: iniVal must be a string.");
    if (typeof context !== "string")
      throw new Error("Failed to validate argument: context must be a string.");
    if (typeof def !== "number")
      throw new Error("Failed to validate argument: def must be a number.");
    if (typeof fixed !== "number")
      throw new Error("Failed to validate argument: fixed must be a number.");
    switch (context) {
      case "int":
        returnVal = parseInt(iniVal, 10) || def;
        if (
          !Number.isFinite(returnVal) ||
          Number.isNaN(returnVal) ||
          isNaN(returnVal)
        )
          returnVal = def;
        break;
      case "float":
        returnVal = parseFloat(parseFloat(iniVal).toFixed(fixed)) || def;
        if (!Number.isFinite(returnVal) || isNaN(returnVal)) returnVal = def;
        break;
      default:
        throw new Error(`Context of parsing invalid.`);
    }
    return returnVal || 0;
  } catch (e) {
    console.error(`Error executing parseNotNaN:\n${(e as Error).message}`);
    return returnVal || 0;
  }
}
export const defFontSize = 16;
export const factorsKits: Map<string, Map<string, number>> = new Map([
  [
    "coots",
    new Map([
      ["peat", 0.3],
      ["perlite", 0.3],
      ["earthworm_humus", 0.3],
      ["sw_flour", 0.01],
      ["neem_pie", 0.01],
      ["shell_ls", 0.01],
      ["agr_plaster", 0.01],
      ["basalt_rp", 0.03],
    ]),
  ],
  [
    "gynetcs",
    new Map([
      ["peat", 0.91],
      ["perlite", 0.091],
      ["earthworm_humus", 0.065],
      ["neem_pie", 0.00375],
      ["bokashi", 0.0638],
      ["basalt_rp", 0.0455],
      ["shell_ls", 0.0182],
      ["biochar", 0.0274],
      ["agr_plaster", 0.0184],
      ["nt_phosp", 0.0184],
    ]),
  ],
  [
    "matinho",
    new Map([
      ["peat", 0.35],
      ["perlite", 0.35],
      ["earthworm_humus", 0.35],
      ["neem_pie", 0.0084],
      ["bokashi", 0.025],
      ["basalt_rp", 0.0417],
      ["shell_ls", 0.0084],
      ["biochar", 0.025],
      ["sw_flour", 0.0042],
      ["cr_flour", 0.0042],
      ["agr_plaster", 0.0084],
    ]),
  ],
]);
export function calcKits(v: string = "0", g: kitGroups = "main") {
  try {
    if (typeof v !== "string")
      throw new Error(
        `Inadequate primitive type argumented to calcKits as value`
      );
    let err = "#ERRO";
    let v_n = 0;
    if (v.length === 0) {
      err = "Sem valor de solo!";
      v_n = 0;
    } else v_n = parseNotNaN(v.replace(/,/g, ".").replace(/[^0-9\.]/g, ""));
    console.log(v_n);
    if (!Number.isFinite(v_n)) {
      console.warn(`Value parsed as Not Finite. Defaulting to -1.`);
      v_n = -1;
      err = "Entrada inválida.";
    }
    if (typeof g !== "string")
      throw new Error(
        `Inadequate primitive type argumented to calcKits as group`
      );
    if (
      !(g === "main" || g === "coots" || g === "matinho" || g === "gynetcs")
    ) {
      console.error(
        `Inadequate string value argumented to calcKits as group. Defaulting to main.`
      );
      g = "main";
    }
    const handleOperations = (ks: Element | voidish, g: string): void => {
      try {
        if (!(ks instanceof HTMLElement))
          throw new Error(`Inadequate instance passed as Kit Section.`);
        if (typeof g !== "string")
          throw new Error(`Inadequate primitive type passed as group`);
        if (
          !(g === "main" || g === "coots" || g === "matinho" || g === "gynetcs")
        )
          throw new Error(
            `Inadequate string value argumented to calcKits as group. Defaulting to main.`
          );
        const gM = factorsKits.get(g);
        if (!gM) throw new Error(`Failed to get Map for Group ${g}`);
        const outps = ks.querySelectorAll(".calc-outp");
        if (outps.length === 0)
          throw new Error(`Failed to populate list of output elements`);
        outps.forEach((o, i) => {
          try {
            if (!(o instanceof HTMLElement))
              throw new Error(`Failed to validate instance of output element`);
            let rel = o.dataset.name;
            if (!rel || rel === "") {
              console.warn(
                `Dataset for Element ${
                  o.id || "unidentified"
                } has no name property. Fallbacking to name if available, but this is not the adequate assignment.`
              );
              rel = (o as any).name;
            }
            if (!rel || rel === "")
              throw new Error(`Failed to fetch operation name.`);
            const f = gM.get(rel);
            if (!f) throw new Error(`Failed to get factor in Group ${g} Map`);
            const res = Math.round(v_n * f * 10 ** 5) / 10 ** 5;
            const resV = res > 0 ? res : err;
            o.innerText = `${resV.toLocaleString("pt-BR") || err}`;
            if (o.innerText === err) {
              o.classList.add("calc-alert");
              const soil = document.getElementById("soilQuant");
              if (soil) {
                soil.style.borderColor = "#e52f1351";
                soil.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                  inline: "center",
                });
                soil.ariaInvalid = "true";
                setTimeout(() => {
                  const soil = document.getElementById("soilQuant");
                  if (soil) soil.ariaInvalid = "false";
                }, 200);
              }
              setTimeout(() => {
                if (o) o.classList.add("calc-fade");
              }, 100);
              setTimeout(() => {
                if (o) {
                  const soil = document.getElementById("soilQuant");
                  if (soil) soil.style.borderColor = "#ddd";
                  o.classList.remove("calc-alert", "calc-fade");
                  o.innerText = "";
                }
              }, 2000);
            }
          } catch (e) {
            console.error(
              `Error executing iteration ${i}, output ${
                o.id || "unidentified"
              }, ks ${ks.id || ks.className || ks.tagName}:\n${
                (e as Error).message
              }`
            );
            o instanceof HTMLElement
              ? (o.innerText = err)
              : (o.innerHTML = err);
            if (
              (o instanceof HTMLElement && o.innerText === err) ||
              o.innerHTML === err
            ) {
              o.classList.add("calc-alert");
              const soil = document.getElementById("soilQuant");
              if (soil) {
                soil.style.borderColor = "#e52f1351";
                soil.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                  inline: "center",
                });
                soil.ariaInvalid = "true";
                setTimeout(() => {
                  const soil = document.getElementById("soilQuant");
                  if (soil) soil.ariaInvalid = "false";
                }, 200);
              }
              setTimeout(() => {
                if (o) o.classList.add("calc-fade");
              }, 100);
              setTimeout(() => {
                if (o) o.classList.remove("calc-alert", "calc-fade");
                const soil = document.getElementById("soilQuant");
                if (soil) soil.style.borderColor = "#ddd";
                o instanceof HTMLElement
                  ? (o.innerText = "")
                  : (o.innerHTML = "");
              }, 2000);
            }
          }
        });
      } catch (e) {
        console.error(
          `Error executing handleOperations for ${
            ks?.id || ks?.className || ks?.tagName || "undefined"
          }:\m${(e as Error).message}`
        );
      }
    };
    if (g === "main") {
      const kitSects = document.querySelectorAll(".kit-sect");
      const kitsWrapper = document.getElementById("kits-wrapper");
      if (kitSects.length === 0)
        throw new Error(`Error populating list of Kits Sections.`);
      if (
        kitsWrapper &&
        kitsWrapper.querySelectorAll("section").length !== kitSects.length
      )
        console.warn(
          `Incompatible numer of sections in the Kits Wrapper and length of kit sections!`
        );
      const grps = Array.from(kitSects)
        .map(ks => {
          return ks instanceof HTMLElement && ks.dataset.group
            ? ks.dataset.group
            : "";
        })
        .filter(g => g !== "");
      if (grps.length === 0)
        throw new Error(`Error populating list of Group names.`);
      if (grps.length !== kitSects.length)
        console.warn(
          `Incompatible number of kit group names and length of kit sections list!`
        );
      grps.forEach((g, i) => {
        try {
          const relG = document.querySelector(`.kit-sect[data-group="${g}"]`);
          if (!(relG instanceof HTMLElement))
            throw new Error(`Failed to fetch related group.`);
          handleOperations(relG, g);
        } catch (e) {
          console.error(
            `Error executing iteration ${i}, group ${g} when handling calculations:\n${
              (e as Error).message
            }`
          );
        }
      });
    } else {
      const grp = document.querySelector(`.kit-sect[data-group="${g}"]`);
      if (!(grp instanceof HTMLElement))
        throw new Error(`Failed to fetch Kit Section using dataset group`);
      handleOperations(grp, g);
    }
  } catch (e) {
    console.error(`Error executing calcKits:\n${(e as Error).message}`);
  }
}
export function syncAriaStates(
  els: Array<Element> | NodeListOf<Element>
): void {
  if (els instanceof NodeList) els = Array.from(els);
  els = els.filter(el => el instanceof Element);
  if (
    Array.isArray(els) &&
    els.length > 0 &&
    Array.from(els).every(el => el instanceof Element)
  ) {
    els.forEach(el => {
      if (
        el instanceof HTMLHtmlElement ||
        el instanceof HTMLScriptElement ||
        el instanceof HTMLLinkElement ||
        el instanceof HTMLMetaElement ||
        el instanceof HTMLTitleElement ||
        el instanceof HTMLHeadElement ||
        (el.parentElement && el.parentElement instanceof HTMLHeadElement)
      )
        return;
      if (el instanceof HTMLElement) {
        el.hidden && !el.focus
          ? (el.ariaHidden = "true")
          : (el.ariaHidden = "false");
        el.addEventListener("click", () => {
          el.hidden && !el.focus
            ? (el.ariaHidden = "true")
            : (el.ariaHidden = "false");
        });
        if (el.classList.contains("poCaller")) {
          el.ariaHasPopup = "menu";
        }
        if (
          el instanceof HTMLSelectElement ||
          el instanceof HTMLInputElement ||
          el instanceof HTMLTextAreaElement
        ) {
          if (el instanceof HTMLSelectElement) {
            if (el.querySelectorAll("option").length > 0) {
              el.querySelectorAll("option").forEach(option => {
                option.selected
                  ? (option.ariaSelected = "true")
                  : (option.ariaSelected = "false");
              });
              el.addEventListener("change", () => {
                el.querySelectorAll("option").forEach(option => {
                  option.selected
                    ? (option.ariaSelected = "true")
                    : (option.ariaSelected = "false");
                });
              });
            }
            el.addEventListener("click", () => {
              if (el.ariaExpanded === "false") el.ariaExpanded = "true";
              if (el.ariaExpanded === "true") el.ariaExpanded = "false";
            });
          }
          if (
            el instanceof HTMLInputElement ||
            el instanceof HTMLTextAreaElement
          ) {
            if (el.placeholder && el.placeholder !== "")
              el.ariaPlaceholder = el.placeholder;
            if (el.type !== "radio") {
              el.required
                ? (el.ariaRequired = "true")
                : (el.ariaRequired = "false");
              !el.checkValidity()
                ? (el.ariaInvalid = "true")
                : (el.ariaInvalid = "false");
              el.closest("form")?.addEventListener("submit", () => {
                !el.checkValidity()
                  ? (el.ariaInvalid = "true")
                  : (el.ariaInvalid = "false");
              });
            }
            if (
              el instanceof HTMLTextAreaElement ||
              (el instanceof HTMLInputElement &&
                (el.type === "text" ||
                  el.type === "tel" ||
                  el.type === "email" ||
                  el.type === "number" ||
                  el.type === "date" ||
                  el.type === "time" ||
                  el.type === "password" ||
                  el.type === "search" ||
                  el.type === "month" ||
                  el.type === "week"))
            ) {
              if (
                el instanceof HTMLInputElement &&
                el.list &&
                el.list.id !== ""
              )
                el.ariaAutoComplete = "list";
              if (
                el instanceof HTMLInputElement &&
                (el.type === "number" ||
                  el.type === "date" ||
                  el.type === "time")
              ) {
                el.ariaValueMax = (el as HTMLInputElement).max;
                el.ariaValueMin = (el as HTMLInputElement).min;
              }
              if (el instanceof HTMLInputElement && el.type === "range") {
                el.addEventListener("change", () => {
                  el.ariaValueNow = el.value;
                  el.ariaValueText = el.value;
                });
              }
            } else if (
              el instanceof HTMLInputElement &&
              (el.type === "radio" || el.type === "checkbox")
            ) {
              el.checked
                ? (el.ariaChecked = "true")
                : (el.ariaChecked = "false");
              el.disabled
                ? (el.ariaDisabled = "true")
                : (el.ariaDisabled = "false");
              el.addEventListener("change", () => {
                el.checked
                  ? (el.ariaChecked = "true")
                  : (el.ariaChecked = "false");
                el.disabled
                  ? (el.ariaDisabled = "true")
                  : (el.ariaDisabled = "false");
              });
            } else if (
              el instanceof HTMLInputElement &&
              (el.type === "button" ||
                el.type === "submit" ||
                el.type === "reset")
            ) {
              el.addEventListener("mousedown", click => {
                if (click.button === 0) el.ariaPressed = "true";
              });
              el.addEventListener("mouseup", release => {
                if (release.button === 0) el.ariaPressed = "false";
              });
            }
          }
        }
        if (el instanceof HTMLLabelElement) {
          if (el.hasChildNodes() && el.firstChild instanceof Text) {
            el.ariaLabel = el.firstChild.nodeValue;
          }
        }
        if (el instanceof HTMLButtonElement) {
          el.addEventListener("mousedown", click => {
            if (click.button === 0) el.ariaPressed = "true";
          });
          el.addEventListener("mouseup", release => {
            if (release.button === 0) el.ariaPressed = "false";
          });
          if (el.textContent?.match(/consultar/gi)) {
            el.ariaHasPopup = "dialog";
          }
        }
        if (el instanceof HTMLDialogElement) el.ariaModal = "true";
      }
    });
  }
}
export function modelScripts(): void {
  const rex = /[\-\?\=\+\s\.\&\<\>\^\:~,\/\\@]/g;
  try {
    document.querySelectorAll("script").forEach((script, i) => {
      try {
        if (!(script instanceof HTMLScriptElement)) return;
        if (script.type === "" && script.src !== "")
          script.type = "text/javascript";
        if (script.id === "" && script.src !== "") {
          const url = new URL(script.src);
          script.id = url.pathname.replace(rex, "__");
        }
        if (script.crossOrigin === "") script.crossOrigin = "anonymous";
      } catch (e) {
        console.error(
          `Error executing iteration ${i} for <script> tags in modelScripts:\n${
            (e as Error).message
          }`
        );
      }
    });
    document.querySelectorAll("link").forEach((link, i) => {
      try {
        if (!(link instanceof HTMLLinkElement)) return;
        if (link.id === "" && link.href !== "") {
          const url = new URL(link.href);
          link.id = url.pathname.replace(rex, "__");
        }
        if (link.rel === "") link.rel = "alternate";
        if (link.crossOrigin === "") link.crossOrigin = "anonymous";
      } catch (e) {
        console.error(
          `Error executing iteration ${i} for <link> tags in modelScripts:\n${
            (e as Error).message
          }`
        );
      }
    });
    document.querySelectorAll("meta").forEach((meta, i) => {
      try {
        if (!(meta instanceof HTMLMetaElement)) return;
        if (meta.id === "") {
          if (meta.name && meta.name !== "") {
            meta.id = meta.name.replace(rex, "__");
            return;
          }
          if ((meta as any).property && (meta as any).property !== "") {
            meta.id = (meta as any).property.replace(rex, "__");
            return;
          }
          if (meta.httpEquiv && meta.httpEquiv !== "") {
            meta.id = meta.httpEquiv.replace(rex, "__");
            return;
          }
          if (meta.content && meta.content !== "") {
            meta.id = meta.content.replace(rex, "__");
            return;
          }
          if (/charset/g.test(meta.outerHTML)) meta.id = "charset";
        }
      } catch (e) {
        console.error(
          `Error executing iteration ${i} for identifying meta tag:\n${
            (e as Error).message
          }`
        );
      }
    });
    document.querySelectorAll("style").forEach((style, i) => {
      try {
        if (!(style instanceof HTMLStyleElement)) return;
        if (style.type !== "") style.type = "";
        if (style.media === "all") style.media = "";
        if (style.id === "") {
          style.id = document.getElementById("__next")
            ? `next_generated_style_${i}`
            : `automatically_generated_style_${i}`;
          style.dataset.group = "automatic_name";
        }
      } catch (e) {
        console.error(
          `Error executing iteration ${i} for <style> tags in modelScripts:\n${
            (e as Error).message
          }`
        );
      }
    });
    document.querySelectorAll("a").forEach((a, i) => {
      try {
        if (!(a instanceof HTMLAnchorElement)) return;
        if (
          a.href !== "" &&
          !(
            new RegExp(location.hostname, "g").test(a.href) ||
            /https/.test(a.href)
          )
        ) {
          if (!/noopener/g.test(a.rel)) a.rel += " noopener";
          if (!/noreferrer/g.test(a.rel)) a.rel += " noreferrer";
        }
      } catch (e) {
        console.error(
          `Error executing iteration ${i} for <a> tags in modelScripts:\n${
            (e as Error).message
          }`
        );
      }
    });
  } catch (e) {
    console.error(`Error executing modelScripts:\n${(e as Error).message}`);
  }
}
