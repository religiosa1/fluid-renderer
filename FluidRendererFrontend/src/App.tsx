import { version } from "../package.json";
import { Form } from "./components/Form";
import "./App.css";

function App() {
  return (
    <>
      <header class="app-layout__header">
        <h1>Render Fluid template</h1>
        <p>
          A primitive web app to render{" "}
          <a href="https://github.com/sebastienros/fluid">Fluid</a> templates in
          .NET with the provided JSON context.
        </p>
      </header>
      <main class="app-layout__main">
        <Form />
      </main>
      <footer class="app-layout__footer">
        <span>Version: {version}</span>{" "}
        <span>
          Source:{" "}
          <a href="https://github.com/religiosa1/fluid-renderer">
            https://github.com/religiosa1/fluid-renderer
          </a>
        </span>
      </footer>
    </>
  );
}

export default App;
