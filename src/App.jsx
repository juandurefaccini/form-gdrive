import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import TopBar from "./components/TopBar";
import UploadForm from "./components/form/UploadForm";
import { AuthProvider } from "./context/authContext.jsx";
import { SnackbarProvider } from "notistack";
import { Home } from "./components/Home";

function App() {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <div className="bg-whitetext-gray-500">
          <div className="container mx-auto h-screen flex flex-col ">
            <div className="h-12 shrink-0">
              <TopBar />
            </div>
            <div className="h-full w-full">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/subirArchivo" element={<Home />} />
              </Routes>
            </div>
          </div>
        </div>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
