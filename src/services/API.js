const axios = require('axios').default;


const baseUrl = 'http://localhost:3000';

export function getUsers() {
    return axios.get(`${baseUrl}/users`);
}
