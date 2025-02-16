import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/components/pages/home/Home";
import Page404error from "@/components/pages/home/notfound/Page404error"; 
import { AuthContext } from "@/context/AuthContext";

function App() {
  return (
    <AuthContext>
      <Router>
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<Home />} />

          {/* Página 404 */}
          <Route path="*" element={<Page404error />} />
        </Routes>
      </Router>
    </AuthContext>
  );
}

export default App;
