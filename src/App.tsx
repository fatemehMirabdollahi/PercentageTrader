import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MarketDetails from "./pages/MarketDetails";
import Markets from "./pages/Markets";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Markets />} />
        <Route path="/market/:market" element={<MarketDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
