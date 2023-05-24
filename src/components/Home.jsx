import React from 'react';
import '../styles/Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { fetchData, selectStock } from '../redux/stockSlice';

const Home = () => (
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, status } = useSelector((state) => state.stocks);

  useEffect(() => {
    if (status === 'idle' && data.length === 0) {
      dispatch(fetchData());
    }
  }, [status, dispatch, data]);

  const onHandleSelect = (ticker) => {
    dispatch(selectStock(ticker));
    navigate(`/Details/${ticker}`);
  };

);

export default Home;
