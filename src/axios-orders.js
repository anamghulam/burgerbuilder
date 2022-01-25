import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-ad7b1-default-rtdb.firebaseio.com/'
});
export default instance;