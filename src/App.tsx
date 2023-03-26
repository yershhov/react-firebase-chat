import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Routes } from "react-router-dom";
import AppContainer from "./components/AppContainer/AppContainer";
import { auth } from "./firebase/config";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App font-poppins text-sm dark:bg-raisinBlack w-full h-screen grid sm:place-items-center">
      <AppContainer>
        <Routes>
          <Route path="/" element={user ? <Home /> : <SignIn />} />
          <Route path="/:with" element={<Chat />}></Route>
        </Routes>
      </AppContainer>
    </div>
  );
}

export default App;
