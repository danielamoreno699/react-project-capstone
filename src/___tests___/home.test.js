import React from 'react';
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Home from '../components/Home';
import { fetchData, selectStock } from '../redux/stockSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../redux/stockSlice', () => ({
  fetchData: jest.fn(),
  selectStock: jest.fn(),
}));

describe('Home Component', () => {
  beforeEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
    useNavigate.mockClear();
    fetchData.mockClear();
    selectStock.mockClear();
  });

  test('renders the component with stocks', () => {
    const dispatchMock = jest.fn();
    const navigateMock = jest.fn();
    const stocks = [
      { ticker: 'AAPL', cik: '12345' },
      { ticker: 'GOOG', cik: '67890' },
    ];
    useSelector.mockImplementation((selector) => selector({
      stocks: {
        data: stocks,
        status: 'idle',
      },
    }));
    useDispatch.mockReturnValue(dispatchMock);
    useNavigate.mockReturnValue(navigateMock);

    render(<Home />);

    expect(screen.getByText('Stock Market')).toBeInTheDocument();
    expect(screen.getByText('Here you can see the stocks')).toBeInTheDocument();
    expect(screen.getByText('find your stocks and look for the details')).toBeInTheDocument();
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('12345')).toBeInTheDocument();
    expect(screen.getByText('GOOG')).toBeInTheDocument();
  });
});
