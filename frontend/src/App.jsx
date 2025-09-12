import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "./feature/member/Login.jsx";
import { ExtraCurricular } from "./feature/extracurricular/ExtraCurricular.jsx";
import { Competency } from "./feature/competency/Competency.jsx";
import { Career } from "./feature/career/Career.jsx";
import { Mileage } from "./feature/mileage/Mileage.jsx";
import { Counseling } from "./feature/counseling/Counseling.jsx";
import { ExtraCurricularAdd } from "./feature/extracurricular/ExtraCurricularAdd.jsx";
import { MenuBar } from "./common/MenuBar.jsx";
import { CompetencyTest } from "./feature/competency/CompetencyTest.jsx";
import { CompetencyAdd } from "./feature/competency/CompetencyAdd.jsx";
import { CompetencyList } from "./feature/competency/CompetencyList.jsx";
import { CompetencySubAdd } from "./feature/competency/CompetencySubAdd.jsx";
import { CompetencySubList } from "./feature/competency/CompetencySubList.jsx";
import { ExtraCurricularManage } from "./feature/extracurricular/ExtraCurricularManage.jsx";
import { CompetencyEditor } from "./feature/competency/CompetencyEditor.jsx";
import { AuthProvider } from "./common/AuthContext.jsx";
import { MainPage } from "./common/MainPage.jsx";
import { CompetencyTextEditor } from "./feature/competency/CompetencyTextEditor.jsx";
import { CompetencyText } from "./feature/competency/CompetencyText.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/*상단바*/}
        {/*<AppNavbar />*/}
        {/*메뉴바*/}
        <MenuBar />

        {/*페이지 라우팅*/}
        <Routes>
          {/*메인 페이지*/}
          <Route index element={<MainPage />} />
          {/*비교과*/}
          <Route path="extracurricular" element={<ExtraCurricular />} />
          <Route path="extracurricular/add" element={<ExtraCurricularAdd />} />
          <Route
            path="extracurricular/manage"
            element={<ExtraCurricularManage />}
          />
          {/*핵심역량*/}
          <Route path="competency" element={<Competency />} />
          <Route path="competency/add" element={<CompetencyAdd />} />
          <Route path="competency/list" element={<CompetencyList />} />
          <Route path="competency/subAdd" element={<CompetencySubAdd />} />
          <Route path="competency/subList" element={<CompetencySubList />} />
          {/* 핵심역량 소개 */}

          {/*핵심역량 5개 추가로 생성*/}
          <Route path="competency/text" element={<CompetencyText />} />
          <Route path="competency/test" element={<CompetencyTest />} />
          <Route
            path="competency/textEditor"
            element={<CompetencyTextEditor />}
          />
          <Route path="competency/editor" element={<CompetencyEditor />} />

          {/*마일리지*/}
          <Route path="mileage" element={<Mileage />} />
          {/*진로 설계*/}
          <Route path="career" element={<Career />} />
          {/*통합 상담*/}
          <Route path="counseling" element={<Counseling />} />
          {/*회원*/}
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
