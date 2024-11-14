import { SubmitError } from "../../models/SubmitError";
import styles from "./ErrorPanel.module.css";
interface ErrorPanelProps {
  error: unknown;
}
export function ErrorPanel(props: ErrorPanelProps) {
  if (props.error instanceof SubmitError) {
    return (
      <div class={styles.errorPanel}>
        {props.error.status} {props.error.message}
        {props.error.details && (
          <div class={styles.errorDetails}>
            <code>{props.error.details}</code>
          </div>
        )}
      </div>
    );
  }
  return <div class={styles.errorPanel}>{String(props.error)}</div>;
}
