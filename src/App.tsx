import { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import Play from "./Play/Play";

class App extends Component {
    componentDidMount() {}
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/play" element={<Play />} />
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </Router>
        );
    }
}

export default App;
