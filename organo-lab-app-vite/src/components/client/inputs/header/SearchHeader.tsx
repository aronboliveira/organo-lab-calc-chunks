import { useState } from "react";
export default function SearchHeader(): JSX.Element {
  const [search, setSearch] = useState("");
  return (
    <input
      type="search"
      className="search-field mb-0"
      name="s"
      value={search}
      id="s"
      placeholder="Search…"
      autoComplete="off"
      onChange={ev => {
        setSearch(ev.currentTarget.value);
        if (ev.currentTarget.value.length < 1)
          alert(
            "Esta é uma implantação estática do aplicativo de Calculadora.\nPesquisas no sistema ativo não funcionarão!\nPor favor visite https://www.organolab.com.br/ para mais informações."
          );
      }}
      onClick={() =>
        alert(
          "Esta é uma implantação estática do aplicativo de Calculadora.\nPesquisas no sistema ativo não funcionarão!\nPor favor visite https://www.organolab.com.br/ para mais informações."
        )
      }
    />
  );
}
