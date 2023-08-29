import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Login from "./components/Login";
import TopBar from "./components/TopBar";
import { AuthProvider } from "./context/authContext.jsx";
import { SnackbarProvider } from "notistack";
import { Home } from "./components/Home";
import { socket } from "./socket";
import { useSnackbar } from "notistack";


function Socket() {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    socket.on('default', (res) => {
      if (res) {
        console.log({ res });
        if (res.length) {
          const messages = res.split(",");
          messages.forEach(element => {
            enqueueSnackbar(element, { variant: "info" });
          });
        }
        enqueueSnackbar(res, { variant: "info" });
      }
    })
    return () => {
      socket.off('default')
    };
  })
}

function App() {



  return (
    <SnackbarProvider>
      <AuthProvider>
        <Socket />
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
