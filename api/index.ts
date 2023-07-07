import postcss, { AtRule, Declaration, Rule } from "postcss";

export type Axis = "x" | "y" | "z";

/**
 * @description px转换rem
 */
const pattern1 = (unit: number, input: string) => {
  const root = postcss.parse(input);
  const nodes = (root.nodes as AtRule[])[0].nodes as Rule[];
  for (const rule of nodes) {
    const decls = rule.nodes as Declaration[];
    for (const decl of decls) {
      const value = decl.value;

      if (value.startsWith("translate3d") || value.startsWith("translate3D")) {
        const pxRegex = /(-?\d+(\.\d+)?)px/g;
        const pxValue = value.replace(pxRegex, function (match, value) {
          const px = parseFloat(value);
          const rem = (px / unit).toFixed(2) + "rem";
          return rem;
        });
        decl.value = pxValue;
      }
    }
  }
  const result = root.toResult();
  return result.css;
};

const pattern2 = (axis: Axis, target: string, input: string) => {
  const root = postcss.parse(input);
  const nodes = (root.nodes as AtRule[])[0].nodes as Rule[];
  const x = axis === "x" ? target : "$1";
  const y = axis === "y" ? target : "$3";
  const z = axis === "z" ? target : "$5";
  for (const rule of nodes) {
    const decls = rule.nodes as Declaration[];
    for (const decl of decls) {
      const value = decl.value;

      if (value.startsWith("translate3d") || value.startsWith("translate3D")) {
        const regex =
          /translate3(?:D|d)\(([^,]+)(px|rem|em|%|vw|vh|vmin|vmax|cm|mm|in|pt|pc)?,([^,]+)(px|rem|em|%|vw|vh|vmin|vmax|cm|mm|in|pt|pc)?,([^,]+)(px|rem|em|%|vw|vh|vmin|vmax|cm|mm|in|pt|pc)?\)/;
        const newValue = value.replace(regex, `translate3D(${x},${y},${z})`);
        decl.value = newValue;
      }
    }
  }
  const result = root.toResult();
  return result.css;
};

const pattern3 = (axis: Axis, unit: number, input: string) => {
  const root = postcss.parse(input);
  const nodes = (root.nodes as AtRule[])[0].nodes as Rule[];
  for (const rule of nodes) {
    const decls = rule.nodes as Declaration[];
    for (const decl of decls) {
      const value = decl.value;

      if (value.startsWith("translate3d") || value.startsWith("translate3D")) {
        const regex =
          /translate3(?:D|d)\(([^,]+)(px|rem|em|%|vw|vh|vmin|vmax|cm|mm|in|pt|pc)?,([^,]+)(px|rem|em|%|vw|vh|vmin|vmax|cm|mm|in|pt|pc)?,([^,]+)(px|rem|em|%|vw|vh|vmin|vmax|cm|mm|in|pt|pc)?\)/;
        const newValue = value.replace(
          regex,
          function (
            match,
            value1: string,
            _,
            value2: string,
            _1,
            value3: string,
            _2
          ) {
            const unitExtractReg = /-?\d+(?:\.\d+)?(.*)/;
            const scaledValue1 = parseFloat(value1) * unit;
            const unit1 = value1.match(unitExtractReg)?.[1] || "";
            const scaledValue2 = parseFloat(value2) * unit;
            const unit2 = value2.match(unitExtractReg)?.[1] || "";
            const scaledValue3 = parseFloat(value3) * unit;
            const unit3 = value1.match(unitExtractReg)?.[1] || "";
            console.log('value',value1,scaledValue1,unit1)

            const x = axis === "x" ? `${scaledValue1}${unit1}` : value1;
            const y = axis === "y" ? `${scaledValue2}${unit2}` : value2;
            const z = axis === "z" ? `${scaledValue3}${unit3}` : value3;

            return `translate3D(${x},${y},${z})`;
          }
        );
        decl.value = newValue;
      }
    }
  }
  const result = root.toResult();
  return result.css;
};

const pattern4 = (initValue: number, finalValue: number, input: string) => {
  const root = postcss.parse(input);
  const nodes = (root.nodes as AtRule[])[0].nodes as Rule[];
  const length = nodes.length;
  if (length >= 2) {
    const gap = (finalValue - initValue) / (length - 1);

    for (let i = 0; i < length; i++) {
      const rule = nodes[i];
      rule.selector = `${initValue + gap * i}%`;
    }
  }

  const result = root.toResult();
  return result.css;
};

export { pattern1, pattern2, pattern3, pattern4 };
