export interface SidebarProps {
  s: boolean;
  d: Dispatch<SetStateAction<boolean>>;
}
export interface IOProps {
  title: string;
  group: string;
  iniValue?: "kg" | "l";
  id?: string;
  name?: string;
  large?: boolean;
}
export interface InpProps extends IOProps {
  s: string;
  d: Dispatch<SetStateAction<string>>;
  r: MutableRefObject<nlInp>;
}
export interface CalcBtnProps {
  group: string;
  id?: string;
}
