"use client";
import { MyContext } from "@/context";
import MonacoEditor from "@monaco-editor/react";
import { useContext } from "react";

const Editor = () => {
  const { value, setValue } = useContext(MyContext);
  const handleEditorChange = (value: string | undefined, event: any) => {
    setValue(value!);
  };

  return (
    <MonacoEditor
      defaultLanguage="css"
      defaultValue={value}
      value={value}
      onChange={handleEditorChange}
    />
  );
};

export default Editor;
