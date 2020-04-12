import React from "react";
import ForgetPasswordContainer from "./containers/forgetPassword";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <ForgetPasswordContainer />
    </div>
  );
}

export default App;
