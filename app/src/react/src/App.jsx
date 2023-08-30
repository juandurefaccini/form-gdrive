import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Login from "./components/Login";
import TopBar from "./components/TopBar";
import { AuthProvider } from "./context/authContext.jsx";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Home } from "./components/Home";
import { getSocket } from "./socket";

const socket = getSocket();

const Notifier = () => {

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    socket.connect();
    socket.on('default', (res) => {
      if (!res) return;
      if (res.type && res.message) {
        enqueueSnackbar(res.message, { variant: "info" });
        return;
      }
      const messages = res.split(', ');
      messages.forEach(message => {
        enqueueSnackbar(message, { variant: "info" });
      });
    })

    return () => {
      socket.off('default');
    }
  }, []);

  return null;
}

function App() {
  return (
    <SnackbarProvider maxSnack={99}>
      <AuthProvider>
        <Notifier />
        <div className="bg-whitetext-gray-500">
          <div className="container mx-auto h-screen flex flex-col ">
            <div className="h-12 shrink-0">
              <TopBar socket={socket} />
            </div>
            <div className="h-full w-full">
              <Routes>
                <Route path="/" element={<Login socket={socket} />} />
                <Route path="/subirArchivo" element={<Home socket={socket} />} />
              </Routes>
            </div>
          </div>
        </div>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
