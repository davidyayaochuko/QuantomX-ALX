// File: src/services/api.js
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

export const fetchSeats = () => axios.get(`${API_BASE}/seats`);

export const bookSeat = (id) =>
  axios.post(`${API_BASE}/book`, { seatId: id });
