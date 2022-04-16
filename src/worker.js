importScripts(
  "https://cdn.jsdelivr.net/npm/comlink@4.3.1/dist/umd/comlink.min.js"
);

async function initPyodide() {
  const sklearn_classifiers_tar_promise = fetch(
    "./sklearn_classifiers.tar"
  ).then((resp) => resp.arrayBuffer());
  const { loadPyodide } = await import(
    "https://pyodide-cdn2.iodide.io/v0.20.0/full/pyodide.mjs"
  );
  const pyodide = await loadPyodide();
  const package_load_promise = pyodide.loadPackage([
    "scikit-learn",
    "numpy",
    "matplotlib",
    "bokeh",
  ]);
  const sklearn_classifiers_tar = await sklearn_classifiers_tar_promise;
  pyodide.unpackArchive(sklearn_classifiers_tar, "tar");
  await package_load_promise;
  self.applet = pyodide.pyimport("sklearn_classifiers").SklearnClassifiers();
}

function front_matter() {
  return self.applet.front_matter();
}

function compute(values) {
  return self.applet.compute(values);
}

Comlink.expose({
  initPyodide,
  front_matter,
  compute,
});
