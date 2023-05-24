import React from 'react';
import '../styles/Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { fetchData, selectStock } from '../redux/stockSlice';

const Home = () => (
  <div>Home</div>
);

export default Home;
