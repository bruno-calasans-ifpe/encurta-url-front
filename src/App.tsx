import { BrowserRouter, Route, Routes } from "react-router";
import Header from "./components/layout/Header";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ContentContainer from "./components/custom/ContentContainer";
import UrlPagePage from "./pages/url/UrlPage";
import UrlAccessPage from "./pages/url-access/UrlAccessPage";
import UrlRedirectPage from "./pages/url-redirect/UrlRedirectPage";
import useAuth from "./hooks/useAuth";
import MyUrlspage from "./pages/my-urls/MyUrlsPage";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const {} = useAuth();

  return (
    <>
      {/* main */}
      <BrowserRouter>
        <Header />
        <ContentContainer>
          <Routes>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/url/:urlId" element={<UrlPagePage />} />
            <Route path="/url-access/:urlId" element={<UrlAccessPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/:urlId" element={<UrlRedirectPage />} />
            <Route path="/my-urls" element={<MyUrlspage />} />
          </Routes>
        </ContentContainer>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
