import api from "./api";

//  Liste des médecins
export const getDoctors = () => {
  return api.get("/doctors");
};

//  Détail médecin
export const getDoctorById = (id) => {
  return api.get(`/doctors/${id}`);
};

//  Recherche
export const searchDoctors = (query) => {
  return api.get(`/doctors/search?query=${query}`);
};