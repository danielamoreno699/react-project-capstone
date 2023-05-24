import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchStockInfo } from '../redux/stockSlice';
import '../styles/detail.css';

const Details = () => {
  const { stock } = useParams();
  const navigate = useNavigate();

  const onNavigateBack = () => {
    navigate(-1);
  };

  const dispatch = useDispatch();
  const { stockInfo } = useSelector((state) => state.stocks);

  useEffect(() => {
    dispatch(fetchStockInfo(stock));
  }, [dispatch, stock]);

  return (
    <>
      <div data-testid="details" className="detail-container">
        <div className="back-symbol">
          <BiArrowBack onClick={onNavigateBack} />
        </div>

        <div className="header-detail">

          <div className="txt-container">

            <div className="txt-header-detail">

              <h5>{stockInfo.name}</h5>
              <p className="p-stock">{stockInfo.sic_description}</p>

            </div>
            <div className="ticker">
              <h2>{stockInfo.ticker}</h2>
            </div>

          </div>

        </div>

        <div className="info-stocks">
          <p>check the info of the stocks </p>
        </div>

        <div className="info-container">

          <div className="wrapper">
            <div className="title-info">
              <p>City </p>
            </div>
            <div className="value">
              {stockInfo.address?.city ? (
                <p>{stockInfo.address.city}</p>
              ) : (
                <p>no data</p>
              )}

            </div>
          </div>

          <div className="wrapper">
            <div className="title-info">
              <p>State </p>
            </div>
            <div className="value">
              {stockInfo.address?.state ? (
                <p>{stockInfo.address.state}</p>
              ) : (
                <p>no data</p>
              )}

            </div>
          </div>

          <div className="wrapper">
            <div className="title-info">
              <p>Type of Market </p>
            </div>
            <div className="value">
              <p>{stockInfo.market}</p>
            </div>
          </div>
          <div className="wrapper">
            <div className="title-info">
              <p>total Employees</p>
            </div>
            <div className="value">
              <p>{stockInfo.total_employees}</p>
            </div>
          </div>

          <div className="wrapper">
            <div className="title-info">
              <p>primary exchange</p>
            </div>
            <div className="value">
              <p>{stockInfo.primary_exchange}</p>
            </div>
          </div>

          <div className="wrapper">
            <div className="title-info">
              <p>Market Cap</p>
            </div>
            <div className="value">
              <p>{stockInfo.market_cap}</p>
            </div>
          </div>

          <div className="wrapper">
            <div className="title-info">
              <p>local market</p>
            </div>
            <div className="value">
              <p>{stockInfo.locale}</p>
            </div>
          </div>

          <div className="wrapper">
            <div className="title-info">
              <p>list date</p>
            </div>
            <div className="value">
              <p>{stockInfo.list_date}</p>

            </div>
          </div>

          <div className="wrapper">

            <div className="title-info">
              <p>share class outstanding</p>
            </div>
            <div className="value">
              <p>{stockInfo.share_class_shares_outstanding}</p>

            </div>
          </div>

          <div className="wrapper">
            <div className="title-info">
              <p>Weighted shares outstanding</p>
            </div>
            <div className="value">
              <p>{stockInfo.weighted_shares_outstanding}</p>

            </div>
          </div>
        </div>
      </div>

    </>

  );
};

export default Details;
