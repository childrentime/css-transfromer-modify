import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";

const MyContext = createContext<{
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}>({
  value: "",
  setValue: () => {},
});

// 提供上下文的组件
const MyContextProvider = (props: PropsWithChildren<{}>) => {
  const [value, setValue] = useState(`@keyframes Animate-Down {
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
  }`);
  const { children } = props;

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
