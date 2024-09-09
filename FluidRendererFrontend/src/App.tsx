import {
  Suspense,
  createSignal,
  createResource,
  ErrorBoundary,
  resetErrorBoundaries,
} from "solid-js";
import { Output } from "./components/Output";
import { Input } from "./components/Input";
import { Spinner } from "./components/Spinner/Spinner";
import { ErrorPanel } from "./components/ErrorPanel/ErrorPanel";
import { Columns } from "./components/Columns";
import "./App.css";

interface SubmitData {
  template: string;
  context: string;
}

interface SubmitResponse {
  success: boolean;
  data: string | null;
  error: string | null;
}

function App() {
  const [submitData, setSubmitData] = createSignal<SubmitData | undefined>();

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const data = new FormData(e.currentTarget as HTMLFormElement);
    const template = data.get("template")?.toString() ?? "";
    const context = data.get("context")?.toString() || "{}";
    setSubmitData({ template, context });
  }

  const [template] = createResource(submitData, async (submitPayload) => {
    resetErrorBoundaries();
    const ctx = JSON.parse(submitPayload.context);
    const response = await fetch("/api/render", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ template: submitPayload.template, context: ctx }),
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = (await response.json()) as SubmitResponse;
    if (data.success != true) {
      throw new Error("Error response:" + (data.error ?? "unknown error"));
    }
    return data.data;
  });

  return (
    <>
      <h1>Render Fluid template</h1>

      <form onSubmit={handleSubmit}>
        <Columns>
          <Input
            label="Template"
            name="template"
            help="A valid fluid/liquid template"
          />
          <Input
            label="Context"
            name="context"
            help="A JSON object, to be used as a context value for the template"
          />
        </Columns>

        <p>
          <button>Render</button>
        </p>
      </form>

      <ErrorBoundary fallback={(err) => <ErrorPanel error={err} />}>
        <Suspense fallback={<Spinner />}>
          <Output value={template()} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
