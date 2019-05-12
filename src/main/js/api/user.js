import axios from 'axios';

export async function getAllUsers() {
    return new Promise((resolve, reject) => {
        axios.get('/api/user/all').then(response => {
            resolve(response.data)
        }).catch(error => {
            reject(error)
        })
    })
}

export async function getUser(id) {
    return new Promise((resolve, reject) => {
        axios.get('/api/user/' + id).then(response => {
            resolve(response.data)
        }).catch(error => {
            reject(error)
        })
    })
}

/* TODO: Needs to be tested */
export async function createUser(id, data) {
    return new Promise((resolve, reject) => {
        axios.post('/api/user/create', data).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

/* TODO: Needs to be tested */
export async function updateUser(id, data) {
    return new Promise((resolve, reject) => {
        axios.post('/api/user/update', data).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

/* TODO: Needs to be tested */
export async function deleteUser(id) {
    return new Promise((resolve, reject) => {
        axios.get('/api/user/delete/' + id).then(response => {
            resolve(response.data)
        }).catch(error => {
            reject(error)
        })
    })
}
