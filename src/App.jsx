import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import TopBar from "./components/TopBar";
import UploadForm from "./components/form/UploadForm";
import { AuthProvider } from "./context/authContext.jsx";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <div className="h-screen bg-white flex flex-col">
          <div className="h-12 shrink-0">
            <TopBar />
          </div>
          <div className="h-full w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/subirArchivo" element={<UploadForm />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
