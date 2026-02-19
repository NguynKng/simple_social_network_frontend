import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import * as Pages from "./pages";
import { ProtectedRoute, AuthRoute } from "./middlewares/auth";
import useAuthStore from "./store/authStore";
import { useEffect } from "react";

function App() {
  const { checkAuth, theme, isCheckingAuth } = useAuthStore();
  
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
              <Pages.HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AuthRoute>
              <Pages.AuthContainer />
            </AuthRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRoute>
              <Pages.AuthContainer />
            </AuthRoute>
          }
        />
        <Route path="/verify-email" element={<Pages.VerifyEmailPage />} />
        <Route path="*" element={<Pages.NotFoundPage />} />
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
