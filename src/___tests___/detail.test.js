import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Details from '../components/Details';
import { fetchStockInfo } from '../redux/stockSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../redux/stockSlice', () => ({
  fetchStockInfo: jest.fn(),
}));

describe('Details', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({
      stockInfo: {
        name: 'Stock Name',
        ticker: 'ABC',
      },
    });
  });

  afterEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
    fetchStockInfo.mockClear();
  });

  test('renders stock details correctly', () => {
    render(
      <MemoryRouter initialEntries={['/stock/ABC']}>
        <Routes>
          <Route path="/stock/:stock" element={<Details />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(fetchStockInfo).toHaveBeenCalledWith('ABC');
    expect(screen.getByText('Stock Name')).toBeInTheDocument();
    expect(screen.getByText('ABC')).toBeInTheDocument();
  });
});
