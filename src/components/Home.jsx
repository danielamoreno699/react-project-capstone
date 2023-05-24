import React, { useEffect } from 'react';
import '../styles/Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { fetchData, selectStock } from '../redux/stockSlice';

const Home = () => {
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
  return (
    <>
      <div className="Container-box">
        <div className="Container-txt">
          <h1>Stock Market</h1>
          <p>Here you can see the stocks</p>
        </div>
        <div className="p-txt-details">
          <p>find your stocks and look for the details</p>
        </div>

        <div className="Container-stocks">
          {data.map((item) => (
            <button
              type="button"
              className="Container-stocks-item"
              key={uuid()}
              onClick={() => onHandleSelect(item.ticker)}
            >
              <p className="ticker">
                {item.ticker}
              </p>
              <p className="item-share">{item.cik}</p>

            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
