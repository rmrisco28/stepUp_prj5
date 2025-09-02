import { BrowserRouter, Route, Routes } from "react-router";
import { Hello } from "./Hello.jsx";
import { AppNavbar } from "./AppNavbar.jsx";
import { Login } from "./Login.jsx";
import { Extra_curricular } from "./Extra_curricular.jsx";
import { Competency } from "./Competency.jsx";
import { Career } from "./Career.jsx";
import { Mileage } from "./Mileage.jsx";
import { Counseling } from "./Counseling.jsx";

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
          <Route path="extra_curricular" element={<Extra_curricular />} />
          <Route path="competency" element={<Competency />} />
          <Route path="login" element={<Login />} />
          <Route path="mileage" element={<Mileage />} />
          <Route path="career" element={<Career />} />
          <Route path="counseling" element={<Counseling />} />
          <Route path="login" element={<Login />} />
          <Route path="hello" element={<Hello />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
