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
    </div>
  );
}
