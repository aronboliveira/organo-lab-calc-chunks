import { CalcBtnProps } from "../../../declarations/componentsInterfaces";
import { kitGroups } from "../../../declarations/types";
import { calcKits } from "../../../lib/handlers";
export default function CalcBtn({ group, id }: CalcBtnProps): JSX.Element {
  return (
    <button
      className="btn btn-secondary calc-btn"
      data-group={group}
      title={`Clique aqui para realizar os cálculos para o grupo ${
        group === "main" ? "geral" : group
      }`}
      id={`btn${id}`}
      onClick={ev =>
        calcKits(
          sessionStorage.getItem("v") ?? "",
          (ev.currentTarget.dataset.group as kitGroups) ?? "main"
        )
      }
    >
      Calcular
    </button>
  );
}
