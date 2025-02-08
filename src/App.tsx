import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/layout/Header";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ContentContainer from "./components/custom/ContentContainer";

function App() {
  return (
    <>
      <Header />
      {/* main */}
      <ContentContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}>
              {/* <Route path="*" element={<NoPage />} /> */}
            </Route>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </ContentContainer>
      {/* Footer */}
    </>
  );
}

export default App;
