import { BrowserRouter, Route, Routes } from "react-router";
import { Hello } from "./Hello.jsx";
import { AppNavbar } from "./AppNavbar.jsx";
import { MenuBar } from "./MenuBar.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        {/*상단바*/}
        <AppNavbar />
        {/*메뉴바*/}
        {/*<MenuBar />*/}

        {/*페이지 라우팅*/}
        <Routes>
          {/*임시 페이지*/}
          <Route path="hello" element={<Hello />} />
        </Routes>
      </BrowserRouter>
      hello react
    </>
  );
}

export default App;
