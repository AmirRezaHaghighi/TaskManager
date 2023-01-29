import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SiteRoute from "./route/SiteRoute";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-right" />
      {/* Route site */}
      <SiteRoute/>
    </div>
  );
}

export default App;
