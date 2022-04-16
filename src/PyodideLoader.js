import React from 'react'
import Spinner from './Spinner'
import * as Comlink from 'comlink'

export class PyodideLoader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {loaded: false}
    }

    async componentDidMount() {
        if (window.pyodideWorker === undefined) {
            const pyodideWorker = Comlink.wrap(new Worker("./worker.js"));
            await pyodideWorker.initPyodide();
            window.pyodideWorker = pyodideWorker;
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