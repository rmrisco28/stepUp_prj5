class AuthService {
  // 로그인
  async login(loginId, password) {
    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 세션 쿠키 포함
        body: JSON.stringify({ loginId, password }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  // 로그아웃
  async logout() {
    try {
      const response = await fetch(`/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }

  // 로그인 상태 확인
  async getAuthStatus() {
    try {
      const response = await fetch(`/api/auth/status`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Auth status error:", error);
      throw error;
    }
  }
}

export default new AuthService();
