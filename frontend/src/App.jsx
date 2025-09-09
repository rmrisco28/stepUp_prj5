import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "./feature/member/Login.jsx";
import { Extra_curricular } from "./feature/extra_curricular/Extra_curricular.jsx";
import { Competency } from "./feature/competency/Competency.jsx";
import { Career } from "./feature/career/Career.jsx";
import { Mileage } from "./feature/mileage/Mileage.jsx";
import { Counseling } from "./feature/counseling/Counseling.jsx";
import { MenuBar } from "./common/MenuBar.jsx";
import { CompetencyEditor } from "./feature/competency/CompetencyEditor.jsx";
import { SignUp } from "./feature/member/SignUp.jsx";
import { CompetencyTest } from "./feature/competency/CompetencyTest.jsx";
import { CompetencySub } from "./feature/competency/CompetencySub.jsx";
import { CompetencyAdd } from "./feature/competency/CompetencyAdd.jsx";
import { CompetencyList } from "./feature/competency/CompetencyList.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        {/*상단바*/}
        {/*<AppNavbar />*/}
        {/*메뉴바*/}
        <MenuBar />

        {/*페이지 라우팅*/}
        <Routes>
          {/*비교과*/}
          <Route path="extra_curricular" element={<Extra_curricular />} />

          {/*핵심 역량*/}
          <Route path="competency" element={<Competency />} />
          <Route path="competency/test" element={<CompetencyTest />} />
          <Route path="competency/add" element={<CompetencyAdd />} />
          <Route path="competency/list" element={<CompetencyList />} />

          {/*핵심역량 5개 추가로 생성*/}
          <Route path="competency/editor" element={<CompetencyEditor />} />
          <Route path="competency/subEditor" element={<CompetencySub />} />

          {/*마일리지*/}
          <Route path="mileage" element={<Mileage />} />

          {/*진로 설계*/}
          <Route path="career" element={<Career />} />

          {/*통합 상담*/}
          <Route path="counseling" element={<Counseling />} />

          {/*회원*/}
          <Route path="login" element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
