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
  data: string;
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
    if (!ctx || typeof ctx !== "object" || Array.isArray(ctx)) {
      throw new TypeError("Context must be a JSON object");
    }
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
    if (typeof data.data != "string") {
      throw new Error("Unexpected response.");
    }
    return data.data;
  });

  return (
    <>
      <h1>Render Fluid template</h1>

      <p>
        A primitive web app to render{" "}
        <a href="https://github.com/sebastienros/fluid">Fluid</a> templates in
        .NET with the provided JSON context.
      </p>

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
