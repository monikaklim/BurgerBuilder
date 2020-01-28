import axios from 'axios';

const instance = axios.create({   
    baseURL: 'https://react-burgerbuilder-ab2fe.firebaseio.com/'
 });
 export default instance;