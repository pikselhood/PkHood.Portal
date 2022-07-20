import { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import Client from "./Game/Client";
import HomePage from "./HomePage/HomePage";
import ReactGameRunner from "./ReactGameRunner";

class App extends Component {
    componentDidMount() {}
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/play" element={<ReactGameRunner />} />
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </Router>
        );
    }
}

export default App;
