import { BrowserRouter, Route, Routes } from "react-router";
import { Hello } from "./common/Hello.jsx";
import { AppNavbar } from "./common/AppNavbar.jsx";
import { Login } from "./feature/member/Login.jsx";
import { ExtraCurricularList } from "./feature/extracurricular/ExtraCurricularList.jsx";
import { Competency } from "./feature/competency/Competency.jsx";
import { Career } from "./feature/career/Career.jsx";
import { Mileage } from "./feature/mileage/Mileage.jsx";
import { Counseling } from "./feature/counseling/Counseling.jsx";
import { ExtraCurricularAdd } from "./feature/extracurricular/ExtraCurricularAdd.jsx";

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
          <Route path="extracurricular" element={<ExtraCurricularList />} />
          <Route path="extracurricular/add" element={<ExtraCurricularAdd />} />
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
