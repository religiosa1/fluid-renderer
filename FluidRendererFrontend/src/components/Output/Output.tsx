import { Show } from "solid-js";
import styles from "./Output.module.css";

interface OutputProps {
  value: string | null | undefined;
}
export function Output(props: OutputProps) {
  function copy() {
    if (props.value) {
      navigator.clipboard.writeText(props.value);
    }
  }
  return (
    <Show when={props.value != null}>
      <p>
        <button type="button" onClick={copy}>
          Copy
        </button>
      </p>
      <output class={styles.output}>{props.value}</output>
    </Show>
  );
}
