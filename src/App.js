import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { CONST } from "./CONST";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import PageNotFound from "./pages/PageNotFound";

function App() {
  let [id, setId] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <Link to={"/"}>
          <h1>{CONST.SITE_TITLE}</h1>
        </Link>

        <div className="nav-wrapper">
          <Link to="/news" className="nav-item">
            Login
          </Link>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<HomePage setId={setId} />} />
        <Route path="/news/:id" element={<NewsPage id={id} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
