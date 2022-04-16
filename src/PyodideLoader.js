import React from 'react'
import Spinner from './Spinner'

export class PyodideLoader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {loaded: false}
    }

    async componentDidMount() {
        if (window.pyodide === undefined) {
            let pyodidePkg = await import("https://pyodide-cdn2.iodide.io/v0.20.0/full/pyodide.mjs");
            let pyodide = await pyodidePkg.loadPyodide();
            await pyodide.loadPackage(["scikit-learn", "numpy", "matplotlib", "bokeh"]);
            window.pyodide = pyodide;
            console.log("pyodide loaded successfully");
        }
        this.setState({ loaded: true });
    }

    render() {
        if (!this.state.loaded) {
            return <Spinner reason="Loading Pyodide..." />;
        } else {
            return <div>{this.props.children}</div>
        }
    }
}