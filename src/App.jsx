import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import * as Pages from "./pages";
import { ProtectedRoute, AuthRoute } from "./middlewares/auth";
import useAuthStore from "./store/authStore";
import { useEffect } from "react";
import MainLayout from "./components/MainLayout";
import { Suspense } from "react";
import SpinnerLoading from "./components/SpinnerLoading";
import PageKt from "./pages/PageKt";
import Page1 from "./pages/Page1";

const LazyPage = ({ Element, Layout = MainLayout }) => (
  <Suspense fallback={<SpinnerLoading />}>
    <Layout Element={Element} />
  </Suspense>
);

const LazyComponent = ({ Component }) => (
  <Suspense fallback={<SpinnerLoading />}>
    <Component />
  </Suspense>
);

function App() {
  const { checkAuth, theme } = useAuthStore();

  useEffect(() => {
    if (!theme) return;
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <LazyPage Element={Pages.HomePage} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <LazyComponent Component={Pages.AuthContainer} />
            </AuthRoute>
          }
        />
        <Route
          path="/pagekt"
          element={
            <PageKt />
          }
        />
        <Route
          path="/page1"
          element={
            <Page1 />
          }
        />
        <Route
          path="/register"
          element={
            <AuthRoute>
              <LazyComponent Component={Pages.AuthContainer} />
            </AuthRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <AuthRoute>
              <LazyComponent Component={Pages.VerifyEmailPage} />
            </AuthRoute>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <LazyPage Component={Pages.NotFoundPage} />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </>
  );
}

export default App;
