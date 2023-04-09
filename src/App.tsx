import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Routes } from "react-router-dom";
import AppContainer from "./components/AppContainer/AppContainer";
import { auth } from "./firebase/config";
import Chat from "./pages/Chat/Chat";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import SignIn from "./pages/SignIn";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App dark:text-gray-100 font-poppins text-sm dark:bg-raisinBlack w-full h-screen grid sm:place-items-center">
      <AppContainer>
        <Routes>
          <Route path="/" element={user ? <Home /> : <SignIn />} />
          <Route path="/:companionEmail/:chatId" element={<Chat />} />
          <Route path="/search" element={<Search />} />

        </Routes>
      </AppContainer>
    </div>
  );
}

export default App;
