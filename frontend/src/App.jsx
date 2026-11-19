import Navbar from "./components/NavBar";
import UniversalBackground from "./components/Background";
import RoutePage from "./routes/route";
import "./index.css";


function App() {
  return (
    <>
      <UniversalBackground />
      <Navbar />
      <div className="app-content">
        <RoutePage />
      </div>
    </>
  );
}

export default App;
