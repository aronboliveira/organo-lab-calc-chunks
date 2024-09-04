import {
  kebabToCamel,
  regularToCamel,
  regularToPascal,
} from "../../lib/models";
import LNumOutp from "../client/inputs/body/LNumOutp";
import SoilDiv from "./SoilDiv";
import CalcBtn from "../client/buttons/CalcBtn";
import { keyPhrase } from "../../App";
import Invite from "../client/content/Invite";
const ap = {
  n: "agr_plaster",
  t: "Gesso Agrícola",
};
const swf = {
  n: "sw_flour",
  t: "Farinha de Algas",
};
const firstInpBlockDef = [
  {
    n: "peat",
    t: "Turfa",
  },
  {
    n: "perlite",
    t: "Perlita",
  },
  {
    n: "earthworm_humus",
    t: "Húmus de Minhoca",
  },
];
const secondInpBlockDef = [
  {
    n: "basalt_rp",
    t: "Pó de Rocha Basalto",
  },
  {
    n: "neem_pie",
    t: "Torta de Neem",
  },
  {
    n: "shell_ls",
    t: "Calcário de Conchas",
  },
  ap,
];
const secondInpBlockB = [
  ...secondInpBlockDef,
  {
    n: "bokashi",
    t: "Bokashi",
  },
  {
    n: "biochar",
    t: "Biochar",
  },
];
export default function Main(): JSX.Element {
  return (
    <main id="main">
      <img
        id="soilSacs"
        alt="Sacos de Solo"
        src="https://blog.organolab.com.br/wp-content/uploads/2024/09/sacos_solo_redc.png"
        width={527}
        height={197}
      />
      <hgroup id="calc-title-group">
        <h1 className="calc-title-parts" id="calc-title">
          Calculadora de Solo
        </h1>
        <h2 className="calc-title-parts" id="calc-title-brand">
          <strong>{keyPhrase.slice(0, -1)}</strong>
          <abbr className="copyright-icon">{keyPhrase.slice(-1)}</abbr>
        </h2>
      </hgroup>
      <div id="invite-logo-wrapper">
        <img
          id="invite-logo-img"
          alt="Logo para Anúncio"
          src="https://blog.organolab.com.br/wp-content/uploads/2024/09/org_lab_logo_favicon_96.png"
          width={86}
          height={84}
        />
        <Invite />
      </div>
      <SoilDiv />
      <div id="kits-wrapper">
        {[
          {
            kn: "Coots Soil",
            sub: [
              {
                o: "first",
                inps: firstInpBlockDef,
              },
              {
                o: "second",
                inps: [...secondInpBlockDef, swf],
              },
            ],
          },
          {
            kn: "Matinho Cheiroso | Solo Vivo",
            sub: [
              { o: "first", inps: firstInpBlockDef },
              {
                o: "second",
                inps: [
                  ...secondInpBlockB,
                  swf,
                  {
                    n: "cr_flour",
                    t: "Farinha de Crustáceos",
                  },
                ],
              },
            ],
          },
          {
            kn: "GYNETCS",
            sub: [
              { o: "first", inps: firstInpBlockDef },
              {
                o: "second",
                inps: [
                  ...secondInpBlockB,
                  {
                    n: "nt_phosp",
                    t: "Fosfato Natural",
                  },
                ],
              },
            ],
          },
        ].map((s, i) => {
          let normalizedKn = regularToCamel(
            s.kn.replace(/\|/g, " ").replace(/\s{2,}/g, " ")
          );
          const pascalKn = regularToPascal(
            s.kn.replace(/\|/g, " ").replace(/\s{2,}/g, " ")
          );
          if (/[A-Z]/g.test(normalizedKn)) {
            normalizedKn = /[A-Z]/g.test(normalizedKn.charAt(0))
              ? normalizedKn.slice(
                  0,
                  /[A-Z\_\-]/g.exec(normalizedKn.slice(1))!.index
                )
              : normalizedKn.slice(
                  0,
                  /[A-Z\_\-]/g.exec(normalizedKn.slice(0))!.index
                );
          }
          return (
            <section
              id={`sect${pascalKn}`}
              className="kit-sect"
              data-title={`Kit — ${s.kn}`}
              data-group={normalizedKn}
              key={`kit_sect__${i}`}
            >
              <h3
                className="kit-title"
                id={`title${pascalKn}`}
                data-group={normalizedKn}
              >
                Kit — {s.kn}
              </h3>
              {s.sub.map((sc, j) => (
                <div
                  className="kit-subsect coots-soil-subsect"
                  id={`div${j}${pascalKn}`}
                  key={`kit_sect__${i}__subsect__${j}`}
                  data-group={normalizedKn}
                >
                  {sc.inps.map((inp, k) => (
                    <LNumOutp
                      name={inp.n}
                      id={
                        /_/g.test(inp.n)
                          ? `${kebabToCamel(inp.n)}Sect${pascalKn}`
                          : `${inp.n}Sect${pascalKn}`
                      }
                      title={`${inp.t}__${s.kn}`}
                      iniValue={s.kn === "GYNETCS" && j === 1 ? "kg" : "l"}
                      group={normalizedKn}
                      key={`kit_sect__${i}__subsect__${j}__inp__${k}`}
                    />
                  ))}
                </div>
              ))}
              <CalcBtn id={pascalKn} group={normalizedKn} />
            </section>
          );
        })}
      </div>
    </main>
  );
}
