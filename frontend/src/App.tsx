import { Outlet } from "react-router-dom";
import { Header } from "./Components/Header/Header";

import { MainContainer } from "./Components/MainContainer/MainContainer";

function App() {
  return (
    <div className="h-screen">
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </div>
  );
}

export default App;
