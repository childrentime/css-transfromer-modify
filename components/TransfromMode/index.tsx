"use client";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import {
  Button,
  Card,
  Input,
  InputNumber,
  Radio,
  RadioChangeEvent,
} from "antd";
import { useClipboard, useSetState } from "@reactuses/core";
import { MyContext } from "@/context";
import MonacoEditor from "@monaco-editor/react";
import { ToastContainer, toast } from 'react-toastify';

const TransfromMode = () => {
  const [_, copy] = useClipboard();
  const [checked, setChecked] = useState(1);
  const [axiss, setAxiss] = useSetState({
    axis1: 1,
    axis2: 1,
  });
  const [inputs, setInputs] = useSetState<{
    input1: number | null;
    input2: string;
    input3: number | null;
    input4: number | null;
    input5: number | null;
  }>({
    input1: null,
    input2: "",
    input3: null,
    input4: null,
    input5: null,
  });

  const { input1, input2, input3, input4, input5 } = inputs;
  const { axis1, axis2 } = axiss;

  const onAxis1Change = (e: RadioChangeEvent) => {
    setAxiss({ axis1: e.target.value });
  };

  const onAxis2Change = (e: RadioChangeEvent) => {
    setAxiss({ axis2: e.target.value });
  };

  const workerRef = useRef<Worker>();
  const { value } = useContext(MyContext);
  const [output, setOutput] = useState("");

  useEffect(() => {
    const worker = new Worker(
      new URL("../../worker/index.ts", import.meta.url)
    );
    workerRef.current = worker;

    worker.onmessage = (event: MessageEvent) => {
      const output = event.data;
      console.log("output", output);
      setOutput(output);
    };
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Card
          title="pattern 1"
          style={{ width: 300 }}
          className={checked === 1 ? styles.checked : ""}
          onClick={() => {
            setChecked(1);
          }}
        >
          <InputNumber
            placeholder="input rem/px unit, default 100"
            value={input1}
            onChange={(v) =>
              setInputs({
                input1: v,
              })
            }
            style={{ width: "100%" }}
          />
          <p>Turn all px into rem</p>
        </Card>
        <Card
          title="pattern 2"
          style={{ width: 300 }}
          className={checked === 2 ? styles.checked : ""}
          onClick={() => {
            setChecked(2);
          }}
        >
          <Input
            placeholder="input your value, default 1rem"
            value={input2}
            onChange={(v) =>
              setInputs({
                input2: v.target.value,
              })
            }
          />
          <Radio.Group
            onChange={onAxis1Change}
            value={axis1}
            className={styles.group}
          >
            <Radio value={1}>X</Radio>
            <Radio value={2}>Y</Radio>
            <Radio value={3}>Z</Radio>
          </Radio.Group>
          <p>change arbitrary axis in every raw</p>
        </Card>
        <Card
          title="pattern 3"
          style={{ width: 300 }}
          className={checked === 3 ? styles.checked : ""}
          onClick={() => {
            setChecked(3);
          }}
        >
          <InputNumber
            placeholder="input your value, default 1"
            controls
            style={{ width: "100%" }}
            value={input3}
            onChange={(v) =>
              setInputs({
                input3: v,
              })
            }
          />
          <Radio.Group
            onChange={onAxis2Change}
            value={axis2}
            className={styles.group}
          >
            <Radio value={1}>X</Radio>
            <Radio value={2}>Y</Radio>
            <Radio value={3}>Z</Radio>
          </Radio.Group>
          <p>scale arbitrary axis in every raw</p>
        </Card>
        <Card
          title="pattern 4"
          style={{ width: 300 }}
          className={checked === 4 ? styles.checked : ""}
          onClick={() => {
            setChecked(4);
          }}
        >
          <InputNumber
            placeholder="input intial value, default 0"
            onChange={(v) =>
              setInputs({
                input4: v,
              })
            }
            style={{ width: "100%" }}
            value={input4}
          />
          <InputNumber
            placeholder="input final value, default 100"
            onChange={(v) =>
              setInputs({
                input5: v,
              })
            }
            style={{ width: "100%" }}
            value={input5}
          />
          <p>Average percentage value by raw length</p>
        </Card>
      </div>
      <div className={styles.buttons}></div>
      <Button
        type="primary"
        className={styles.transfrom}
        onClick={() => {
          if (!workerRef.current) {
            return;
          }
          workerRef.current.postMessage(
            JSON.stringify({
              checked,
              inputs,
              axiss,
              value,
            })
          );
        }}
      >
        Transfrom
      </Button>
      <Button
        className={styles.copy}
        onClick={() => {
          copy(output);
          toast.success('Copied')
        }}
      >
        Copy Result
      </Button>
      <div className={styles.output}>
        <MonacoEditor
          defaultLanguage="css"
          defaultValue={output}
          value={output}
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default TransfromMode;
