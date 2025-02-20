import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import MarketDetails from "./pages/MarketDetails";
import Markets from "./pages/Markets";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Markets />} />
            <Route path="/market/:marketId" element={<MarketDetails />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
