import { pattern1, pattern2, pattern3, pattern4 } from "@/api";

const ctx = self as unknown as Worker;

const transfromAxis = (axis: number): "x" | "y" | "z" => {
  if (axis === 1) {
    return "x";
  } else if (axis === 2) {
    return "y";
  } else if (axis === 3) {
    return "z";
  }

  throw new Error("unpredictable error");
};
ctx.onmessage = (event: MessageEvent) => {
  const input = JSON.parse(event.data) as {
    inputs: {
      input1: number | null;
      input2: string;
      input3: number | null;
      input4: number | null;
      input5: number | null;
    };
    axiss: {
      axis1: number;
      axis2: number;
    };
    checked: number;
    value: string;
  };

  const { checked, inputs, axiss, value } = input;
  const { input1, input2, input3, input4, input5 } = inputs;

  const { axis1, axis2 } = axiss;

  if (checked === 1) {
    const output = pattern1(input1 || 100, value);
    ctx.postMessage(output);
  } else if (checked === 2) {
    const output = pattern2(transfromAxis(axis1), input2 || "1rem", value);
    ctx.postMessage(output);
  } else if (checked === 3) {
    const output = pattern3(transfromAxis(axis2), input3 || 1, value);
    ctx.postMessage(output);
  } else if (checked === 4) {
    const output = pattern4(input4 || 0, input5 || 100, value);
    ctx.postMessage(output);
  }

  throw new Error("unpredictable error");
};
