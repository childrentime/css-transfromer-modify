import { pattern1, pattern2, pattern3, pattern4 } from ".";
import { expect, describe, it } from "vitest";

const input = `@keyframes Animate-Down {
    5.555555555555555% {
      transform: translate3D(0px, 0px, 0px) rotate(0deg) scale(1.2, 1.2);
      opacity: 1;
    }
    5.555555555555555% {
      transform: translate3D(0px, 0px, 0px) rotate(0deg) scale(1.2, 1.2);
      opacity: 1;
    }
    100.00000000000001% {
      transform: translate3D(-1.6383333333333334rem, -633px, 0px) rotate(0deg) scale(1, 1);
      opacity: 1;
    }
  }`;
describe("Patterns", () => {
  it("Pattern 1", () => {
    const result = pattern1(100, input);
    expect(result).toMatchInlineSnapshot(`
      "@keyframes Animate-Down {
          5.555555555555555% {
            transform: translate3D(0.00rem, 0.00rem, 0.00rem) rotate(0deg) scale(1.2, 1.2);
            opacity: 1;
          }
          5.555555555555555% {
            transform: translate3D(0.00rem, 0.00rem, 0.00rem) rotate(0deg) scale(1.2, 1.2);
            opacity: 1;
          }
          100.00000000000001% {
            transform: translate3D(-1.6383333333333334rem, -6.33rem, 0.00rem) rotate(0deg) scale(1, 1);
            opacity: 1;
          }
        }"
    `);
  });

  it("Pattern 2", () => {
    const result = pattern2("z", "100px", input);
    expect(result).toMatchInlineSnapshot(`
      "@keyframes Animate-Down {
          5.555555555555555% {
            transform: translate3D(0px, 0px,100px) scale(1.2, 1.2);
            opacity: 1;
          }
          5.555555555555555% {
            transform: translate3D(0px, 0px,100px) scale(1.2, 1.2);
            opacity: 1;
          }
          100.00000000000001% {
            transform: translate3D(-1.6383333333333334rem, -633px,100px) scale(1, 1);
            opacity: 1;
          }
        }"
    `);
  });

  it("Pattern 3", () => {
    const result = pattern3("x", 1, input);
    expect(result).toMatchInlineSnapshot(`
      "@keyframes Animate-Down {
          5.555555555555555% {
            transform: translate3D(0px, 0px, 0px) rotate(0deg) scale(1.2, 1.2);
            opacity: 1;
          }
          5.555555555555555% {
            transform: translate3D(0px, 0px, 0px) rotate(0deg) scale(1.2, 1.2);
            opacity: 1;
          }
          100.00000000000001% {
            transform: translate3D(-1.6383333333333334rem, -633px, 0px) rotate(0deg) scale(1, 1);
            opacity: 1;
          }
        }"
    `);
  });

  it('Pattern 4', () => {
    const result = pattern4(0,100,input);
    expect(result).toMatchInlineSnapshot(`
      "@keyframes Animate-Down {
          0% {
            transform: translate3D(0px, 0px, 0px) rotate(0deg) scale(1.2, 1.2);
            opacity: 1;
          }
          50% {
            transform: translate3D(0px, 0px, 0px) rotate(0deg) scale(1.2, 1.2);
            opacity: 1;
          }
          100% {
            transform: translate3D(-1.6383333333333334rem, -633px, 0px) rotate(0deg) scale(1, 1);
            opacity: 1;
          }
        }"
    `);
  })
});
