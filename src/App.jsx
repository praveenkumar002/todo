import Footer from "./Component/Footer";
import Main from "./Component/Main";
import Register from "./sign/Reg";
import {HashRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./sign/Login";

import "./Style/app.css";

function App() {
  return (
    <div className="appMain">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/todo" element={<Main />}></Route>
        </Routes>
      </Router>
      {/* <Main />
      <Footer /> */}
      
      {/* <Login /> */}
    </div>
  );
}

export default App;
