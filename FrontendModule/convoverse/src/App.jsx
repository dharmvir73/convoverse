import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import Chats from "./pages/ChatsPage";

function App() {
  return (
    <div className="App">
      <div className="Front">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
