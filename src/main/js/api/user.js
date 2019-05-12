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
