import { getToken } from "./auth";
import { encryptPassword } from "./encryption";
const axios = require('axios').default;

// ########### BASE API URL ##############
const api = axios.create({
    baseURL: 'http://localhost:3003'
});

// ########## TOKEN CONFIG ############
api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });


//############# USERS ################
export async function getUsers() {
    return await api.get(`/users`);
}

export async function getUser(id) {
    return await api.get(`/users/${id}`);
}

export async function createUser(user) {
    const {password, ...values} = user;
    const hashedPassword = encryptPassword(password);
    user = {...values, password: hashedPassword};
    return await api.post(`/users`, user);
} 

export async function updateUser(id, user) {
    return await api.patch(`/users/${id}`, user);
}

export async function deleteUser(id) {
    return await api.delete(`/users/${id}`);
}

// ######### PATIENTS ############
export async function getPatients() {
    return await api.get(`/patients`);
}

export async function getPatient(id) {
    return await api.get(`/patients/${id}`);
}

export async function createPatient(user) {
    return await api.post(`/patients`, user);
} 

export async function updatePatient(id, user) {
    return await api.patch(`/patients/${id}`, user);
}

export async function deletePatient(id) {
    return await api.delete(`/patients/${id}`);
}
// ######### ATTENDANCE ############
export async function getAttendances() {
    return await api.get(`/attendances`);
}

export async function getAttendance(id) {
    return await api.get(`/attendances/${id}`);
}

export async function createAttendance(attendance) {
    return await api.post(`/attendances`, attendance);
} 

export async function updateAttendance(id, attendance) {
    return await api.patch(`/attendances/${id}`, attendance);
}

export async function deleteAttendance(id) {
    return await api.delete(`/attendances/${id}`);
}

export async function getAttendanceByPatientId(id) {
    return await api.get(`/attendances/patientId/${id}`);
}
// ######### AGENDA ############
export async function getAgenda() {
    return await api.get(`/agenda`);
}

export async function getAgendaById(id) {
    return await api.get(`/agenda/${id}`);
}

export async function createAgenda(agenda) {
    return await api.post(`/agenda`, agenda);
} 

export async function updateAgenda(id, agenda) {
    return await api.patch(`/agenda/${id}`, agenda);
}

export async function deleteAgenda(id) {
    return await api.delete(`/agenda/${id}`);
}

// ######### MOVEMENTS ############
export async function getMovements() {
    return await api.get(`/movements`);
}

export async function getMovement(id) {
    return await api.get(`/movements/${id}`);
}

export async function createMovement(movement) {
    return await api.post(`/movements`, movement);
} 

export async function updateMovement(id, movement) {
    return await api.patch(`/movements/${id}`, movement);
}

export async function deleteMovement(id) {
    return await api.delete(`/movements/${id}`);
}

// ######### AUTH ###########
export async function loginApi(credentials) {
    return await api.post('/auth/login', credentials);
}

// ######### EVALUATION ############
export async function getEvaluations() {
    return await api.get(`/evaluations`);
}

export async function getEvaluation(id) {
    return await api.get(`/evaluations/${id}`);
}

export async function createEvaluation(evaluation) {
    return await api.post(`/evaluations`, evaluation);
} 

export async function updateEvaluation(id, evaluation) {
    return await api.patch(`/evaluations/${id}`, evaluation);
}

export async function deleteEvaluation(id) {
    return await api.delete(`/evaluations/${id}`);
}

export async function getEvaluationByPatientId(id) {
    return await api.get(`/evaluations/patientId/${id}`);
}

// ######### RPG EVALUATION ############
export async function getRpgs() {
    return await api.get(`/rpgs`);
}

export async function getRpg(id) {
    return await api.get(`/rpgs/${id}`);
}

export async function createRpg(rpg) {
    return await api.post(`/rpgs`, rpg);
} 

export async function updateRpg(id, rpg) {
    return await api.patch(`/rpgs/${id}`, rpg);
}

export async function deleteRpg(id) {
    return await api.delete(`/rpgs/${id}`);
}

export async function getRpgByPatientId(id) {
    return await api.get(`/rpgs/patientId/${id}`);
}