import { useRef, useState } from "react";
import { nlInp } from "../../declarations/types";
import LNumInp from "../client/inputs/body/LNumInp";
import CalcBtn from "../client/buttons/CalcBtn";
export default function SoilDiv(): JSX.Element {
  const inpRef = useRef<nlInp>(null);
  const [v, setV] = useState<string>("");
  return (
    <div id="soilDiv">
      <LNumInp
        name="soil_quant"
        id="soilQuant"
        title="Quantidade de Solo"
        s={v}
        d={setV}
        r={inpRef}
        large={true}
        group="main"
      />
      <CalcBtn id="main" group="main" />
    </div>
  );
}
