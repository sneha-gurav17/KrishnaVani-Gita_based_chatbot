import ChatWindow from "./components/ChatWindow";
import "./App.css";

import Feather from "./feather.png";
import Feather1 from "./feather1.png";
function App() {
  return (
    <div className="app-container">
      <header className="header">
                <img src={Feather1} alt="feather" className="feather1" />
        <h1>KrishnaVani</h1>
        <img src={Feather} alt="feather" className="feather" />
      </header>

      <ChatWindow />
    </div>
  );
}

export default App;