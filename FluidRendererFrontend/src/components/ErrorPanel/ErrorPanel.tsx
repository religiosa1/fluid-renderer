import styles from "./ErrorPanel.module.css";

interface ErrorPanelProps {
  error: unknown;
}
export function ErrorPanel(props: ErrorPanelProps) {
  return <div class={styles.errorPanel}>{String(props.error)}</div>;
}
