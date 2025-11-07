import api from "./api";

const labService = {
  getAllLabs: () => api.get("/labs"),
  getLabById: (id) => api.get(`/labs/${id}`),
  createLab: (data) => api.post("/instructor/labs", data),
  submitLab: (data) => api.post("/student/submit", data),
  getResults: () => api.get("/student/results")
};

export default labService;
