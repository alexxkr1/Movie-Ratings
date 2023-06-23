//import "@/App.css";
import Index from '@/pages/Index'
import NotFound from '@/pages/NotFound'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {


  return (
    <>
      <div className="app">
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
