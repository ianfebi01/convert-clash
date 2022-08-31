import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/home";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Convert Clash</title>
      </Helmet>
      <Home />
    </div>
  );
}

export default App;
