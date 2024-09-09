import { Show } from "solid-js";
import styles from "./Output.module.css";

interface OutputProps {
  value: string | null | undefined;
}
export function Output(props: OutputProps) {
  return (
    <Show when={props.value != null}>
      <output class={styles.output}>{props.value}</output>
    </Show>
  );
}
