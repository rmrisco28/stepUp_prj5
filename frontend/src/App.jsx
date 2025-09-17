import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "./feature/member/Login.jsx";
import { ExtraCurricular } from "./feature/extracurricular/ExtraCurricular.jsx";
import { Competency } from "./feature/competency/introduce/Competency.jsx";
import { Career } from "./feature/career/Career.jsx";
import { Mileage } from "./feature/mileage/Mileage.jsx";
import { Counseling } from "./feature/counseling/Counseling.jsx";
import { ExtraCurricularAdd } from "./feature/extracurricular/ExtraCurricularAdd.jsx";
import { MenuBar } from "./common/MenuBar.jsx";
import { CompetencyAdd } from "./feature/competency/introduce/CompetencyAdd.jsx";
import { CompetencyList } from "./feature/competency/introduce/CompetencyList.jsx";
import { CompetencySubAdd } from "./feature/competency/introduce/CompetencySubAdd.jsx";
import { CompetencySubList } from "./feature/competency/introduce/CompetencySubList.jsx";
import { ExtraCurricularManage } from "./feature/extracurricular/ExtraCurricularManage.jsx";
import { CompetencyEditor } from "./feature/competency/CompetencyEditor.jsx";
import { AuthProvider } from "./common/AuthContext.jsx";
import { MainPage } from "./common/MainPage.jsx";
import { CompetencyAssessment } from "./feature/competency/competencyAssessment/CompetencyAssessment.jsx";
import { CompetencyAssessmentAdd } from "./feature/competency/competencyAssessment/CompetencyAssessmentAdd.jsx";
import { CompetencyAssessmentAdmin } from "./feature/competency/competencyAssessment/CompetencyAssessmentAdmin.jsx";
import { CompetencyAssessmentAdminQuestionAdd } from "./feature/competency/competencyAssessment/CompetencyAssessmentAdminQuestionAdd.jsx";

function CompetencyAssessmentCreate() {
  return null;
}

function CompetencyAssessmentEdit() {
  return null;
}

function CompetencyAssessmentQuestions() {
  return null;
}

function CompetencyAssessmentQuestionDetail() {
  return null;
}

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
          {/*핵심역량 소개*/}
          <Route
            path="extracurricular/detail/:seq"
            element={<ExtraCurricularDetail />}
          />
          <Route
            path="extracurricular/edit/:seq"
            element={<ExtraCurricularEdit />}
          />
          {/*핵심역량*/}
          <Route path="competency" element={<Competency />} />
          <Route path="competency/add" element={<CompetencyAdd />} />
          <Route path="competency/list" element={<CompetencyList />} />
          <Route path="competency/subAdd" element={<CompetencySubAdd />} />
          <Route path="competency/subList" element={<CompetencySubList />} />

          {/*핵심역량 5개 추가로 생성*/}
          {/*핵심역량 진단*/}
          {/*진단 검사 목록*/}
          <Route
            path="competency/assessment"
            element={<CompetencyAssessment />}
          />
          <Route
            path="competency/assessment/add"
            element={<CompetencyAssessmentAdd />}
          />
          <Route
            path="competency/assessment/admin/:seq"
            element={<CompetencyAssessmentAdmin />}
          />

          <Route
            path="competency/assessment/admin/:assessmentSeq/questionAdd"
            element={<CompetencyAssessmentAdminQuestionAdd />}
          />

          <Route
            path="/competency/assessment/:assessmentSeq/create"
            element={<CompetencyAssessmentCreate />}
          />
          <Route
            path="/competency/assessment/:assessmentSeq/edit"
            element={<CompetencyAssessmentEdit />}
          />

          {/* 학생 페이지 */}
          <Route
            path="/competency/assessment/:assessmentSeq/questions"
            element={<CompetencyAssessmentQuestions />}
          />
          <Route
            path="/competency/assessment/:assessmentSeq/questions/:questionId"
            element={<CompetencyAssessmentQuestionDetail />}
          />

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
