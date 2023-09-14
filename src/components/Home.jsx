import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { fetchData, selectStock } from '../redux/stockSlice';


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
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

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filter = data.filter((item) => item.ticker.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div className="Container-box">

        <div className="search-bar-function">
          <form action="" className="search-bar">
            <input
              name="search"
              pattern=".*\S.*"
              type="search"
              placeholder="Search"
              value={search}
              onChange={handleSearchChange}
              required
            />
            <button className="search-btn" type="submit">
              <span>Search</span>
            </button>
          </form>
        </div>

        <div className="home-header-txt mask">

          <div className="Container-txt ">

            <div className="txt-header">
              <h1>Stock Market</h1>
              <p>Here you can see the stocks</p>
            </div>

          </div>
          <div className="p-txt-details">
            <p>find your stocks and look for the details</p>
          </div>

        </div>

        <div className="Container-stocks">
          {filter.map((item) => (
            <button
              type="button"
              className="Container-stocks-item"
              key={uuid()}
              onClick={() => onHandleSelect(item.ticker)}
            >
              <p className="ticker">
                {item.ticker}
              </p>
              
              <p className="item-share">{item.cik ? item.cik : 'no data'}</p>

              
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
