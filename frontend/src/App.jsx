import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "./feature/member/Login.jsx";
import { ExtraCurricular } from "./feature/extracurricular/ExtraCurricular.jsx";
import { Competency } from "./feature/competency/competencyIntroduce/Competency.jsx";
import { NoticeList } from "./feature/notice/NoticeList.jsx";
import { Mileage } from "./feature/activity/Mileage.jsx";
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
import { ExtraCurricularApplication } from "./feature/extracurricular/ExtraCurricularApplication.jsx";
import { MyETC } from "./feature/activity/MyETC.jsx";
import { NoticeAdd } from "./feature/notice/NoticeAdd.jsx";
import { NoticeDetail } from "./feature/notice/NoticeDetail.jsx";
import { CompetencyAssessmentTestComplete } from "./feature/competency/competencyTest/CompetencyAssessmentTestComplete.jsx";
import { CompetencyAssessmentTestResult } from "./feature/competency/competencyTest/CompetencyAssessmentTestResult.jsx";
import { NoticeEdit } from "./feature/notice/NoticeEdit.jsx";
import { Faq } from "./feature/faq/Faq.jsx";
import { FaqAdd } from "./feature/faq/FaqAdd.jsx";
import { FaqEdit } from "./feature/faq/FaqEdit.jsx";
import { FaqManage } from "./feature/faq/FaqManage.jsx";
import { FaqDetail } from "./feature/faq/FaqDetail.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/*로그인*/}
          <Route path="login" element={<Login />} />

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
            <Route
              path="extracurricular/application/:seq"
              element={<ExtraCurricularApplication />}
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

            {/*------------------역량 진단 결과----------------*/}
            <Route
              path="/competency/assessment/test/complete/:assessmentSeq"
              element={<CompetencyAssessmentTestComplete />}
            />

            {/*진단검사 세부결과*/}
            <Route
              path="/competency/assessment/test/result/:assessmentSeq"
              element={<CompetencyAssessmentTestResult />}
            />

            {/*나의 활동*/}
            <Route path="activity" element={<MyETC />} />
            <Route path="activity/mileage" element={<Mileage />} />
            <Route path="activity/etclog" element={<MyETC />} />

            {/*안내*/}
            <Route path="board" element={<NoticeList />} />
            {/* 공지사항 */}
            <Route path="board/notice" element={<NoticeList />} />
            <Route path="board/notice/add" element={<NoticeAdd />} />
            <Route path="board/notice/:id" element={<NoticeDetail />} />
            <Route path="board/notice/edit/:id" element={<NoticeEdit />} />
            {/* FAQ */}
            <Route path="board/faq" element={<Faq />} />
            <Route path="board/faq/add" element={<FaqAdd />} />
            <Route path="board/faq/edit/:seq" element={<FaqEdit />} />
            <Route path="board/faq/manage" element={<FaqManage />} />
            <Route path="board/faq/:seq" element={<FaqDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
