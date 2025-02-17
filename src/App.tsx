import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MarketDetails from "./pages/MarketDetails";
import Markets from "./pages/Markets";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Markets />} />
          <Route path="/market/:market" element={<MarketDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
