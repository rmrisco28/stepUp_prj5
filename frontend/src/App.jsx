import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "./feature/member/Login.jsx";
import { ExtraCurricular } from "./feature/extracurricular/ExtraCurricular.jsx";
import { Competency } from "./feature/competency/competencyIntroduce/Competency.jsx";
import { Career } from "./feature/career/Career.jsx";
import { Mileage } from "./feature/mileage/Mileage.jsx";
import { Counseling } from "./feature/counseling/Counseling.jsx";
import { ExtraCurricularRegister } from "./feature/extracurricular/ExtraCurricularRegister.jsx";
import { CompetencyAdd } from "./feature/competency/competencyIntroduce/CompetencyAdd.jsx";
import { CompetencyList } from "./feature/competency/competencyIntroduce/CompetencyList.jsx";
import { CompetencySubAdd } from "./feature/competency/competencyIntroduce/CompetencySubAdd.jsx";
import { CompetencySubList } from "./feature/competency/competencyIntroduce/CompetencySubList.jsx";
import { ExtraCurricularManage } from "./feature/extracurricular/ExtraCurricularManage.jsx";
import { AuthProvider } from "./common/AuthContext.jsx";
import { MainPage } from "./common/MainPage.jsx";
import { CompetencyAssessment } from "./feature/competency/competencyAssessment/CompetencyAssessment.jsx";
import { CompetencyAssessmentAdd } from "./feature/competency/competencyAssessment/CompetencyAssessmentAdd.jsx";
import { CompetencyAssessmentAdmin } from "./feature/competency/competencyAssessment/CompetencyAssessmentAdmin.jsx";
import { CompetencyAssessmentAdminQuestionAdd } from "./feature/competency/competencyAssessment/CompetencyAssessmentAdminQuestionAdd.jsx";
import { ExtraCurricularDetail } from "./feature/extracurricular/ExtraCurricularDetail.jsx";
import { ExtraCurricularEdit } from "./feature/extracurricular/ExtraCurricularEdit.jsx";
import { CompetencyAssessmentAdminEdit } from "./feature/competency/competencyAssessment/CompetencyAssessmentAdminEdit.jsx";
import { CompetencyAssessmentAdminQuestionEdit } from "./feature/competency/competencyAssessment/CompetencyAssessmentAdminQuestionEdit.jsx";
import { ExtraCurricularProgram } from "./feature/extracurricular/ExtraCurricularProgram.jsx";
import { MainLayout } from "./common/MainLayout.jsx";
import { CompetencyAssessmentTestReady } from "./feature/competency/competencyTest/CompetencyAssessmentTestReady.jsx";
import { CompetencyAssessmentTestStart } from "./feature/competency/competencyTest/CompetencyAssessmentTestStart.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/*전체 구조*/}
          <Route path="/" element={<MainLayout />}>
            {/*메인 페이지*/}
            <Route index element={<MainPage />} />
            {/*비교과*/}
            <Route path="extracurricular" element={<ExtraCurricular />} />
            <Route
              path="extracurricular/register"
              element={<ExtraCurricularRegister />}
            />
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
            <Route
              path="extracurricular/program/:seq"
              element={<ExtraCurricularProgram />}
            />

            {/*------------------핵심역량----------------*/}
            {/*핵심역량*/}
            <Route path="competency" element={<Competency />} />
            <Route path="competency/add" element={<CompetencyAdd />} />
            <Route path="competency/list" element={<CompetencyList />} />
            <Route path="competency/subAdd" element={<CompetencySubAdd />} />
            <Route path="competency/subList" element={<CompetencySubList />} />

            {/*------------------역량 진단 관리자용----------------*/}
            {/*진단 검사 목록*/}
            <Route
              path="competency/assessment"
              element={<CompetencyAssessment />}
            />
            {/*진단 검사 추가*/}
            <Route
              path="competency/assessment/add"
              element={<CompetencyAssessmentAdd />}
            />
            {/*진단 검사 문제 목록*/}
            <Route
              path="competency/assessment/admin/:assessmentSeq"
              element={<CompetencyAssessmentAdmin />}
            />
            {/*진단 검사 수정*/}
            <Route
              path="/competency/assessment/admin/:assessmentSeq/edit"
              element={<CompetencyAssessmentAdminEdit />}
            />
            {/*문제 추가*/}
            <Route
              path="competency/assessment/admin/:assessmentSeq/questionAdd"
              element={<CompetencyAssessmentAdminQuestionAdd />}
            />
            {/*문제 수정*/}
            <Route
              path="/competency/assessment/admin/:assessmentSeq/questionEdit/:questionNum"
              element={<CompetencyAssessmentAdminQuestionEdit />}
            />

            {/*------------------역량 진단 학생용----------------*/}

            {/* 역량 진단 준비화면 */}
            <Route
              path="/competency/assessment/test/Ready/:assessmentSeq"
              element={<CompetencyAssessmentTestReady />}
            />

            {/* 역량 진단 진행화면 */}
            <Route
              path="/competency/assessment/test/start/:assessmentSeq"
              element={<CompetencyAssessmentTestStart />}
            />

            {/*마일리지*/}
            <Route path="mileage" element={<Mileage />} />
            {/*진로 설계*/}
            <Route path="career" element={<Career />} />
            {/*통합 상담*/}
            <Route path="counseling" element={<Counseling />} />
            {/*회원*/}
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
