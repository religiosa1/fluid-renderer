import { Show } from "solid-js";
import styles from "./Input.module.css";

interface InputProps {
  label?: string;
  help?: string;
  name: string;
}
export function Input(props: InputProps) {
  return (
    <div class={styles.formGroup}>
      <label>
        {props.label}
        <textarea class={styles.textarea} name={props.name}></textarea>
        <Show when={props.help}>
          <small>{props.help}</small>
        </Show>
      </label>
    </div>
  );
}
