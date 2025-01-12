import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/components/pages/home/Home";
import Error404 from "../src/components/pages/home/error404"; // Asegúrate de crear este archivo

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </Router>
    );
}

export default App;
