import axios from 'axios'
    
const apiClient = axios.create({  
  baseURL: `http://10.90.54.147:3004`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents() {
    return apiClient.get('/events');
  },
  getEvent(id) {
    return apiClient.get(`/events/${id}`);
  },
}