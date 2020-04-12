import axios from "axios";

export default axios.create({
    baseURL: 'http://myneighby.herokuapp.com/api/v2',
    headers: {"Content-Type":"application/json"}
});