import { JSX } from "solid-js/jsx-runtime";
import styles from "./Columns.module.css";

interface ColumnsProps {
  children?: JSX.Element;
}
export function Columns(props: ColumnsProps) {
  return <div class={styles.columns}>{props.children}</div>;
}
