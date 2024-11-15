import {
  Suspense,
  ErrorBoundary,
  createSignal,
  createResource,
  resetErrorBoundaries,
} from "solid-js";
import JSON5 from "json5";

import { Output } from "./Output";
import { Input } from "./Input";
import { Spinner } from "./Spinner";
import { ErrorPanel } from "./ErrorPanel";
import { Columns } from "./Columns";
import { SubmitError } from "../models/SubmitError";

interface SubmitData {
  template: string;
  context: string;
}

interface SubmitResponse {
  data: string;
}

export function Form() {
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
    const ctx = JSON5.parse(submitPayload.context);
    if (!ctx || typeof ctx !== "object" || Array.isArray(ctx)) {
      throw new TypeError("Context must be a JSON5 object");
    }
    const response = await fetch("/api/render", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ template: submitPayload.template, context: ctx }),
    });
    if (!response.ok) {
      throw await SubmitError.fromResponse(response);
    }
    const data = (await response.json()) as SubmitResponse;
    if (typeof data.data != "string") {
      throw new Error("Unexpected response.");
    }
    return data.data;
  });

  return (
    <>
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
            help="A JSON5 object, to be used as a context value for the template"
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
