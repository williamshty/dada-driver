import axios from 'axios';
import {base_url} from './keys';
var qs = require('qs');
axios.defaults.baseURL= base_url;

export async function registerNewUser(payload) {
    let resp = await axios.post('/', payload) 
    return resp
}

export async function getRegistrationVerificationCode(phoneNum) {
    let resp = await axios.get('/verification/register?phoneNum='+phoneNum)
    return resp
}

export async function getLoginVerificationCode(phoneNum){
    let resp = await axios.get('/verification/login?phoneNum='+phoneNum)
    return resp
}

