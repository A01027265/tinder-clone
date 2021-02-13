import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://tinder-backend-010272650.herokuapp.com/'
});

export default instance;