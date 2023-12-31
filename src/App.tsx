//import "@/App.css";
import Index from "@/pages/Index";
import TV from "@/pages/TV";
import NotFound from "@/pages/NotFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchResults from "./pages/SearchResults";
function App() {
  return (
    <>
      <div className="app">
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tv" element={<TV />} />
            <Route
              path="/search-results/:keyword"
              element={<SearchResults />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
