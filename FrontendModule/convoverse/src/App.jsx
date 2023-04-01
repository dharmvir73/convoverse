import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Chats from "./pages/ChatsPage";

function App() {
  return (
    <div className="App">
      <div className="Front">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chats" element={<Chats />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
