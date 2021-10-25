const axios = require('axios').default;


const baseUrl = 'http://localhost:3000';

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
