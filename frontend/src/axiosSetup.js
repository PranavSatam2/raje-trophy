import axios from "axios";

axios.interceptors.response.use(
  (response) => response,

  (error) => {
    // If JWT token expired (401 or 403 with ExpiredJwtException)
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      const message = error.response.data?.message || "";

      if (message.includes("JWT expired") || message.includes("ExpiredJwtException")) {
        console.warn("JWT expired → Logging out automatically");

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");

        // Redirect to login page
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
