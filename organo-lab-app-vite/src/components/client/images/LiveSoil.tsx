import { keyPhrase } from "../../../App";
export default function LiveSoil(): JSX.Element {
  return (
    <img
      id="soilPackage"
      alt={`${keyPhrase} — Pacote de Solo Vivo`}
      src="https://blog.organolab.com.br/wp-content/uploads/2024/09/kit_super_solo.jpg"
      width={375}
      height={480}
      title="Clique aqui para acessar a página do produto!"
      onClick={() => {
        open(
          "https://www.organolab.com.br/kit-solo-vivo",
          "_self",
          "noreferrer"
        );
      }}
    />
  );
}
