import { BrowserRouter, Route, Routes } from "react-router";
import { Hello } from "./Hello.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="hello" element={<Hello />} />
        </Routes>
      </BrowserRouter>
      hello react
    </>
  );
}

export default App;
