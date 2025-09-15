import React, { createContext, useContext, useState, useEffect } from "react";
import authService from "./AuthService.jsx";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 앱 초기화 시 로그인 상태 확인
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await authService.getAuthStatus();
      if (response.success) {
        setUser({
          // fetch로 요청해서 이미 json으로 받아왔기 때문에 response.data로 안 받고 바로 response로
          memberSeq: response.memberSeq,
          loginId: response.loginId,
          name: response.name,
        });
      }
    } catch (error) {
      console.error("Auth status check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginId, password) => {
    setLoading(true);
    try {
      const response = await authService.login(loginId, password);
      if (response.success) {
        setUser({
          memberSeq: response.memberSeq,
          loginId: response.loginId,
          name: response.name,
        });
        return { success: true, message: response.message };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      return { success: false, message: "로그인 중 오류가 발생했습니다." };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      return { success: true };
    } catch (error) {
      return { success: false, message: "로그아웃 중 오류가 발생했습니다." };
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
