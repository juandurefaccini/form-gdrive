import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import TopBar from "./components/TopBar";
import UploadForm from "./components/UploadForm";
import { AuthProvider } from "./context/authContext.jsx";

function App() {
  return (
    <div className="h-screen bg-teal-300 flex flex-col">
      <AuthProvider>
        <div className="h-12 shrink-0">
          <TopBar />
        </div>
        <div className="h-full w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/subirArchivo" element={<UploadForm />} />
          </Routes>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
