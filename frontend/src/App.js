import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import SubNavbar from "./components/SubNavbar";
import AppRoutes from "./routes";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground font-sans pb-16">
        <Navbar />
        <SubNavbar />
        <AppRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
