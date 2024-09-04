import { Root, createRoot } from "react-dom/client";
import Footer from "./components/main/Footer";
import Main from "./components/main/Main";
import { useEffect } from "react";
import Scripts from "./components/wrappers/Scripts";
export const keyPhrase = "Organo Lab ©";
export const metadata = {
  title: `${keyPhrase} — Calculadora de Solo`,
  description: `Calculadora da ${keyPhrase} para que você tenha suas receitas de uma forma simples e comece a montar seu solo em casa!\nAqui você receber valores precisos para os seus kits de cultivo e preparação de solo, seguindo as nossas receitas!`,
};
export const roots: { [k: string]: Root } = {};
export default function App(): JSX.Element {
  useEffect(() => {
    const scripts = document.getElementById("scripts");
    if (scripts) {
      if (!roots.scripts) roots.scripts = createRoot(scripts);
      if (roots.scripts && !roots.scripts["_innerRoot"]) {
        roots.scripts.unmount();
        delete roots.scripts;
        roots.scripts = createRoot(scripts);
      }
      roots.scripts.render(<Scripts />);
    }
  }, []);
  return (
    <div id="wrapper">
      <Main />
      <Footer />
      <div id="developer-div">
        <h5 id="developed-title">Calculadora de Solo da Organo Lab© -</h5>
        <h5 id="development">Desenvolvimento:</h5>
        <a
          href="https://github.com/aronboliveira"
          target="_blank"
          rel="noopener noreferrer external"
          id="developer-repository"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-github"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}
