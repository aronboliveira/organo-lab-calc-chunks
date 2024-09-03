export function kebabToCamel(s: string): string {
  try {
    if (typeof s !== "string")
      throw new Error(`Wrong type argumented to kebabToCamel`);
    return /[_\-]/g.test(s)
      ? `${s.replace(/[-_]([a-z])/gi, (_, c) => c.toUpperCase())}`
      : s;
  } catch (e) {
    console.error(`Error executing kebabToCamel:\n${(e as Error).message}`);
    return s.toString() ?? "";
  }
}
export function regularToCamel(s: string): string {
  try {
    if (typeof s !== "string")
      throw new Error(`Wrong type argument to regularToCamel`);
    return /\s/g.test(s)
      ? s
          .split(" ")
          .map((f, i) =>
            i === 0
              ? f.toLowerCase()
              : `${f.charAt(0).toUpperCase()}${f.slice(1)}`
          )
          .join("")
      : s.toLowerCase();
  } catch (e) {
    console.error(`Error executing regularToCamel:\n${(e as Error).message}`);
    return s.toString() ?? "";
  }
}
export function regularToPascal(s: string): string {
  try {
    if (typeof s !== "string")
      throw new Error(`Wrong type argument to regularToPascal`);
    return /\s/g.test(s)
      ? s
          .split(" ")
          .map(f => `${f.charAt(0).toUpperCase()}${f.slice(1)}`)
          .join("")
      : s.toLowerCase();
  } catch (e) {
    console.error(`Error executing regularToPascal:\n${(e as Error).message}`);
    return s.toString() ?? "";
  }
}
export function removeAccents(s: string): string {
  try {
    if (typeof s !== "string")
      throw new Error(`Wrong type argumented to removeAccents`);
    if (s.length === 0) return s;
    return s
      .replace(/[\u00C0-\u00C6]/g, "A")
      .replace(/[\u00E0-\u00E6]/g, "a")
      .replace(/[\u00C7]/g, "C")
      .replace(/[\u00E7]/g, "c")
      .replace(/[\u00C8-\u00CB]/g, "E")
      .replace(/[\u00E8-\u00EB]/g, "e")
      .replace(/[\u00CC-\u00CF]/g, "I")
      .replace(/[\u00EC-\u00EF]/g, "i")
      .replace(/[\u00D1]/g, "N")
      .replace(/[\u00F1]/g, "n")
      .replace(/[\u00D2-\u00D6]/g, "O")
      .replace(/[\u00F2-\u00F6]/g, "o")
      .replace(/[\u00D9-\u00DC]/g, "U")
      .replace(/[\u00F9-\u00FC]/g, "u")
      .replace(/[\u00DD]/g, "Y")
      .replace(/[\u00FD\u00FF]/g, "y");
  } catch (e) {
    console.error(`Error executing removeAccents:\n${(e as Error).message}`);
    return s;
  }
}
