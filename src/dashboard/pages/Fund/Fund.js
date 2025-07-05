import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { apiConnectorPost } from '../../../utils/APIConnector';
import { endpoint } from '../../../utils/APIRoutes';
import CustomTable from '../../../Shared/CustomTable';
import CustomToPagination from '../../../Shared/Pagination';
import { useFormik } from 'formik';

const Fund = () => {
  const [page, setPage] = useState(1);
  const client = useQueryClient();

  // State for the new Fund Request UI fields
  const [amount, setAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [receiptFile, setReceiptFile] = useState(null); // For file input
  const [payMode, setPayMode] = useState(''); // Could be a text input or dropdown
  const [walletAddress, setWalletAddress] = useState('0xE4AA30dA0386f5f7fA62A5761k'); // Example address

  const initialValues = {
    income_Type: '',
    search: '',
    pageSize: 10,
    start_date: '',
    end_date: '',
  };

  const fk = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
  });

  const { data, isLoading } = useQuery(
    ['get_direct', fk.values.search, fk.values.start_date, fk.values.end_date, page],
    () =>
      apiConnectorPost(endpoint?.fund, {
        search: fk.values.search,
        start_date: fk.values.start_date,
        end_date: fk.values.end_date,
        pageNumber: page,
        pageSize: '10',
      }),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onError: (err) => console.error('Error fetching direct data:', err),
    }
  );

  const allData = data?.data?.result || [];

  const tablehead = [
    <span>S.No.</span>,
    <span>Date</span>,
    <span>Transaction Id</span>,
    <span>Amount ($)</span>,
    <span>User Name</span>,
    <span>Email</span>,
    <span>Description</span>,
  ];

  const tablerow = allData?.data?.map((row, index) => {
    return [
      <span key={`${row.TRANS_ID}-${index}-sno`}> {index + 1}</span>,
      <span key={`${row.TRANS_ID}-${index}-date`}>{row.LEDGER_DATETIME}</span>,
      <span key={`${row.TRANS_ID}-${index}-transid`}>{row.TRANS_ID}</span>,
      <span key={`${row.TRANS_ID}-${index}-amount`}> {row.LEDGER_CR ? `$${parseFloat(row.LEDGER_CR).toFixed(2)}` : '$0.00'}</span>,
      <span key={`${row.TRANS_ID}-${index}-username`}>{row.LEDGER_NAME}</span>,
      <span key={`${row.TRANS_ID}-${index}-email`}>{row.LEDGER_EMAIL || 'N/A'}</span>,
      <span key={`${row.TRANS_ID}-${index}-desc`}>{row.LEDGER_DESC || 'N/A'}</span>,
    ];
  });

  const handleFundRequestSubmit = (e) => {
    e.preventDefault();
    // Basic validation for the new fund request form
    if (!amount || !transactionId || !receiptFile || !payMode) {
      alert('Please fill in all fund request fields and upload a receipt.');
      return;
    }

    // In a real application, you would send this data (amount, transactionId, receiptFile, payMode)
    // to your backend API for processing the fund request.
    console.log({
      amount,
      transactionId,
      receiptFile: receiptFile ? receiptFile.name : 'No file',
      payMode,
      walletAddress,
    });

    alert('Fund request submitted successfully!');
    // Optionally, clear the form after submission
    setAmount('');
    setTransactionId('');
    setReceiptFile(null);
    setPayMode('');
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
      .then(() => {
        alert('Wallet Address copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="p-2 min-h-screen bg-gray-900"> {/* Added min-h-screen and bg-gray-900 for consistency */}
      {/* Fund Request Section (New UI) */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-white border border-gray-700 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Left Side: Amount, Transaction ID, Receipt, Pay Mode, Submit */}
        <form onSubmit={handleFundRequestSubmit} className="flex flex-wrap items-end gap-4 flex-grow">
          <div className="flex flex-col flex-1 min-w-[120px]">
            <label htmlFor="fundAmount" className="text-sm font-medium text-gray-300 mb-1">
              Amount($)<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="fundAmount"
              placeholder="Enter Amc"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-gray-700 border border-gray-600  py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="flex flex-col flex-1 min-w-[120px]">
            <label htmlFor="transactionId" className="text-sm font-medium text-gray-300 mb-1">
              Transaction Id <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="transactionId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="bg-gray-700 border border-gray-600  py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="flex flex-col flex-1 min-w-[120px]">
            <label htmlFor="receipt" className="text-sm font-medium text-gray-300 mb-1">
              Receipt
            </label>
            <label className="bg-gray-700 text-white border border-gray-600  py-2 px-3 cursor-pointer hover:bg-gray-600 transition duration-200 block text-center">
              {receiptFile ? receiptFile.name : 'Choose File'}
              <input
                type="file"
                id="receipt"
                onChange={(e) => setReceiptFile(e.target.files[0])}
                className="hidden" // Hide the default file input
              />
            </label>
          </div>

          <div className="flex flex-col flex-1 min-w-[120px]">
            <label htmlFor="payMode" className="text-sm font-medium text-gray-300 mb-1">
              Pay Mode
            </label>
            <input
              type="text"
              id="payMode"
              placeholder="Online Tra" // Based on your image, this looks like an input, not a button
              value={payMode}
              onChange={(e) => setPayMode(e.target.value)}
              className="bg-gray-700 border border-gray-600  py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2  bg-green-500 text-gray-900 font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[100px] self-end" // self-end to align with other inputs
          >
            Submit
          </button>
        </form>

        {/* Right Side: Wallet Address */}
        <div className="bg-gray-700  p-4 flex flex-col items-start min-w-[250px]">
          <label htmlFor="walletAddressDisplay" className="text-sm font-medium text-gray-300 mb-2">
            Wallet Address <span className="text-red-500">*</span>
          </label>
          <div className="flex w-full items-center">
            <input
              type="text"
              id="walletAddressDisplay"
              value={walletAddress}
              readOnly
              className="flex-grow bg-gray-600 text-white border border-gray-500 rounded-l-md py-2 px-3 text-sm cursor-text focus:outline-none"
            />
         
          </div>
        </div>
      </div>

      {/* Existing content starts here */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-3 text-white border border-gray-700 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-200">Fund request</h2> {/* This seems like a duplicate heading, consider removing one */}
        <div className="flex flex-col sm:flex-wrap md:flex-row items-center gap-3 sm:gap-4 w-full text-sm sm:text-base">
          <input
            type="date"
            name="start_date"
            id="start_date"
            value={fk.values.start_date}
            onChange={fk.handleChange}
            className="bg-gray-700 border border-gray-600  py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
          />
          <input
            type="date"
            name="end_date"
            id="end_date"
            value={fk.values.end_date}
            onChange={fk.handleChange}
            className="bg-gray-700 border border-gray-600  py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
          />
          <input
            type="text"
            name="search"
            id="search"
            value={fk.values.search}
            onChange={fk.handleChange}
            placeholder="User ID"
            className="bg-gray-700 border border-gray-600 rounded-full py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
          />
          <button
            onClick={() => {
              setPage(1);
              client.invalidateQueries(['get_direct']);
            }}
            type="submit"
            className="bg-green-500 text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-green-600 transition-colors w-full sm:w-auto text-sm" // Adjusted class name for consistency
          >
            Search
          </button>
          <button
            onClick={() => {
              fk.handleReset();
              setPage(1);
            }}
            className="bg-gray-600 text-white font-bold py-2 px-4 rounded-full hover:bg-gray-700 transition-colors w-full sm:w-auto text-sm" // Adjusted class name for consistency
          >
            Clear
          </button>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-gray-800 rounded-lg shadow-lg p-3 text-white border border-gray-700">
        <CustomTable tablehead={tablehead} tablerow={tablerow} isLoading={isLoading} />

        {/* Pagination */}
        <CustomToPagination page={page} setPage={setPage} data={allData} />
      </div>
    </div>
  );
};

export default Fund;