import axios from "axios";

// All API calls go to our backend at port 5000
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // so cookies (JWT token) are sent automatically
});

// ─── Auth ───────────────────────────────────────────────
export function registerUser(data) {
  return API.post("/auth/register", data);
}

export function loginUser(data) {
  return API.post("/auth/login", data);
}

export function logoutUser() {
  return API.post("/auth/logout");
}

export function getSecurityQuestion(email) {
  return API.post("/auth/get-security-question", { email });
}

export function resetPassword(data) {
  return API.post("/auth/reset-password", data);
}

// ─── User ────────────────────────────────────────────────
export function getProfile() {
  return API.get("/user/me");
}

// ─── Resume ──────────────────────────────────────────────
export function uploadResume(formData) {
  return API.post("/resume/upload", formData); // formData has the file
}

export function getAllResumes() {
  return API.get("/resume");
}

export function getResume(id) {
  return API.get(`/resume/${id}`);
}

export function deleteResume(id) {
  return API.delete(`/resume/${id}`);
}

// ─── Analysis ────────────────────────────────────────────
export function analyzeResume(resumeId) {
  return API.post("/analysis", { resumeId });
}

export function getAnalysisHistory() {
  return API.get("/analysis/history");
}
