const axios = require('axios').default;

// ########### BASE API URL ##############
const baseUrl = 'http://localhost:3000';


//############# USERS ################
export async function getUsers() {
    return await axios.get(`${baseUrl}/users`);
}

export async function getUser(id) {
    return await axios.get(`${baseUrl}/users/${id}`);
}

export async function createUser(user) {
    return await axios.post(`${baseUrl}/users`, user);
} 

export async function updateUser(id, user) {
    return await axios.patch(`${baseUrl}/users/${id}`, user);
}

export async function deleteUser(id) {
    return await axios.delete(`${baseUrl}/users/${id}`);
}

// ######### PATIENTS ############
export async function getPatients() {
    return await axios.get(`${baseUrl}/patients`);
}

export async function getPatient(id) {
    return await axios.get(`${baseUrl}/patients/${id}`);
}

export async function createPatient(user) {
    return await axios.post(`${baseUrl}/patients`, user);
} 

export async function updatePatient(id, user) {
    return await axios.patch(`${baseUrl}/patients/${id}`, user);
}

export async function deletePatient(id) {
    return await axios.delete(`${baseUrl}/patients/${id}`);
}
// ######### ATTENDANCE ############
export async function getAttendances() {
    return await axios.get(`${baseUrl}/attendances`);
}

export async function getAttendance(id) {
    return await axios.get(`${baseUrl}/attendances/${id}`);
}

export async function createAttendance(user) {
    return await axios.post(`${baseUrl}/attendances`, user);
} 

export async function updateAttendance(id, user) {
    return await axios.patch(`${baseUrl}/attendances/${id}`, user);
}

export async function deleteAttendance(id) {
    return await axios.delete(`${baseUrl}/attendances/${id}`);
}

export async function getAttendanceByPatientId(id) {
    return await axios.get(`${baseUrl}/attendances/patientId/${id}`);
}
