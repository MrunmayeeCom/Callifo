import axios from "axios";
import API from "./AxiosInstance";

// Fetch all subscription plans
export const fetchPlans = async () => {
  const res = await API.get(`/api/licenseType`);
  return res.data.data;
};

// Get logged-in user details
export const fetchUser = async () => {
  const token = localStorage.getItem("token");
  const res = await API.get(`/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.data;
};

const API_KEY = "my-secret-key-123";

/**
 * Reset password — LMS requires { email, passwordHash } where passwordHash is bcrypt hashed.
 */
export const resetPassword = async (email: string, newPassword: string): Promise<void> => {
  const bcrypt = await import("bcryptjs");
  const passwordHash = await bcrypt.hash(newPassword, 10);

  try {
    await API.post(
      "/api/external/customer-password-sync",
      { email, passwordHash },
      { headers: { "x-api-key": API_KEY } }
    );
  } catch (err: any) {
    const detail = err?.response?.data;
    console.error("[resetPassword] LMS error:", JSON.stringify(detail));
    throw new Error(detail?.message ?? "Password reset failed");
  }
};