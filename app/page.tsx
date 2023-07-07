"use client";
import Editor from "@/components/Editor";
import styles from "./page.module.css";
import TransfromMode from "@/components/TransfromMode";
import { MyContextProvider } from "@/context";

export default function Home() {
  return (
    <main className={styles.main}>
      <MyContextProvider>
        <div className={styles.editor}>
          <Editor />
        </div>
        <div className={styles.panel}>
          <TransfromMode />
        </div>
      </MyContextProvider>
    </main>
  );
}
