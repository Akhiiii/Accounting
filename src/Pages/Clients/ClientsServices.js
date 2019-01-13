import axios from 'axios';

const API = 'http://192.168.2.221:8088/api/';

export const serviceSave = values => {
    console.log(values);
    return axios.post(`${API}v1/user/registration`, values)
};

export const serviceList = ({})=> {
   return axios.get(`${API}v1/users`)
};

export const serviceDelete = (id)=> {
   return axios.post(`${API}v1/user/delete/${id}`,{})
}

export const serviceById = (id)=> {
   return axios.get(`${API}v1/user/id/${id}`)
}

export const serviceUpdate = (values)=> {
   return axios.post(`${API}v1/user/update`,values)
}