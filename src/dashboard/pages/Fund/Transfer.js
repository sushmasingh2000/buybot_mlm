import React, { useState } from 'react';
// Assuming CustomTable and CustomToPagination are available in Shared folder as per your Fund component
// import CustomTable from '../../../Shared/CustomTable';
// import CustomToPagination from '../../../Shared/Pagination';
// You might need these if you are fetching real data for the table:
// import { useQuery, useQueryClient } from 'react-query';
// import { apiConnectorPost } from '../../../utils/APIConnector';
// import { endpoint } from '../../../utils/APIRoutes';
// import { useFormik } from 'formik';

const FundTransfer = () => {
  // --- State for Fund Transfer Form ---
  const [availableBalance, setAvailableBalance] = useState('00'); // This would come from an API
  const [fromWalletType, setFromWalletType] = useState(''); //
  const [toWalletType, setToWalletType] = useState(''); //
  const [userId, setUserId] = useState(''); //
  const [userName, setUserName] = useState(''); //
  const [amount, setAmount] = useState(''); //
  const [transactionPin, setTransactionPin] = useState(''); //

  // --- State for View Fund Transfer Table (mock data for now) ---
  const [showEntries, setShowEntries] = useState(10); //
  const [searchQuery, setSearchQuery] = useState(''); //
  const [currentPage, setCurrentPage] = useState(1); //

  // Mock data for the table
  const mockTableData = [
    { id: 1, date: '02-Jul-2025', userId: 'BKS40118', userName: 'Sony Kumari', fromWallet: 'Topup Wallet', toWallet: '10.00 $' },
    { id: 2, date: '02-Jul-2025', userId: 'BKS98376', userName: 'Gaurav Tyagi', fromWallet: 'Topup Wallet', toWallet: '10.00 $' },
    { id: 3, date: '02-Jul-2025', userId: 'BKS15979', userName: 'SARITA SHARMA', fromWallet: 'Topup Wallet', toWallet: '10.00 $' },
    { id: 4, date: '02-Jul-2025', userId: 'BKS17512', userName: 'Shubham', fromWallet: 'Topup Wallet', toWallet: '10.00 $' },
    { id: 5, date: '02-Jul-2025', userId: 'BKS42439', userName: 'Ningmel Kamel', fromWallet: 'Topup Wallet', toWallet: '25.00 $' },
  ];

  // Filtered and paginated mock data
  const filteredData = mockTableData.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / showEntries);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * showEntries,
    currentPage * showEntries
  );

  const tablehead = [
    <span key="sno-head">S No.</span>,
    <span key="date-head">Date</span>,
    <span key="userid-head">User Id</span>,
    <span key="username-head">User Name</span>,
    <span key="fromwallet-head">From Wallet</span>,
    <span key="towallet-head">To Wallet Wallet</span>,
    <span key="tran-head">Tran</span> // This column seems truncated in the image
  ];

  const tablerow = paginatedData.map((row) => {
    return [
      <span key={`${row.id}-sno`}>{row.id}</span>,
      <span key={`${row.id}-date`}>{row.date}</span>,
      <span key={`${row.id}-userid`}>{row.userId}</span>,
      <span key={`${row.id}-username`}>{row.userName}</span>,
      <span key={`${row.id}-fromwallet`}>{row.fromWallet}</span>,
      <span key={`${row.id}-towallet`}>{row.toWallet}</span>,
      // You might need to adjust this based on the full "Tran" data
      <span key={`${row.id}-tran`}>{row.toWallet}</span>
    ];
  });


  const handleTransferSubmit = (e) => {
    e.preventDefault();
    // Add validation logic here
    if (!fromWalletType || !toWalletType || !userId || !userName || !amount || !transactionPin) {
      alert('Please fill in all required fields for fund transfer.');
      return;
    }
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      alert('Please enter a valid positive amount.');
      return;
    }
    if (parseFloat(amount) > parseFloat(availableBalance)) {
        alert('Insufficient available balance for transfer.');
        return;
    }

    // In a real application, send this data to your API
    console.log({
      fromWalletType,
      toWalletType,
      userId,
      userName,
      amount: parseFloat(amount),
      transactionPin,
    });
    alert('Fund transfer request submitted!');
    // Reset form fields
    setFromWalletType('');
    setToWalletType('');
    setUserId('');
    setUserName('');
    setAmount('');
    setTransactionPin('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-3 sm:p-4 lg:p-6"> {/* Reduced padding */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6"> {/* Reduced gap */}
        {/* Left Section: Fund Transfer Form */}
        <div className="lg:col-span-1 bg-gray-800 p-5 rounded-lg shadow-lg border border-gray-700 h-fit"> {/* Reduced padding */}
          <h2 className="text-lg font-semibold mb-5 text-gray-200">Fund Transfer</h2> {/* Smaller heading, reduced margin */}
          <form onSubmit={handleTransferSubmit} className="space-y-3"> {/* Reduced space-y */}
            <div>
              <label htmlFor="availableBalance" className="block text-xs font-medium text-gray-300 mb-1"> {/* Smaller text */}
                Available Balance($):
              </label>
              <input
                type="text"
                id="availableBalance"
                value={availableBalance}
                readOnly
                className="w-full px-2 py-1.5 bg-gray-700 text-sm text-white border border-gray-600  focus:outline-none cursor-not-allowed" // Smaller padding, text
              />
            </div>

            <div>
              <label htmlFor="fromWalletType" className="block text-xs font-medium text-gray-300 mb-1"> {/* Smaller text */}
                From Wallet Type
              </label>
              <select
                id="fromWalletType"
                value={fromWalletType}
                onChange={(e) => setFromWalletType(e.target.value)}
                className="w-full px-2 py-1.5 bg-gray-700 text-sm text-white border border-gray-600  focus:outline-none focus:ring-2 focus:ring-green-500" // Smaller padding, text
                required
              >
                <option value="">Select Wallet</option>
                <option value="Topup Wallet">Topup Wallet</option>
                <option value="Income Wallet">Income Wallet</option>
                {/* Add more wallet types as needed */}
              </select>
            </div>

            <div>
              <label htmlFor="toWalletType" className="block text-xs font-medium text-gray-300 mb-1"> {/* Smaller text */}
                To Wallet Type
              </label>
              <select
                id="toWalletType"
                value={toWalletType}
                onChange={(e) => setToWalletType(e.target.value)}
                className="w-full px-2 py-1.5 bg-gray-700 text-sm text-white border border-gray-600  focus:outline-none focus:ring-2 focus:ring-green-500" // Smaller padding, text
                required
              >
                <option value="">Select Wallet</option>
                <option value="Main Wallet">Main Wallet</option>
                <option value="Staking Wallet">Staking Wallet</option>
                {/* Add more wallet types as needed */}
              </select>
            </div>

            <div>
              <label htmlFor="userId" className="block text-xs font-medium text-gray-300 mb-1"> {/* Smaller text */}
                User Id
              </label>
              <input
                type="text"
                id="userId"
                placeholder="Enter User Id"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-2 py-1.5 bg-gray-700 text-sm text-white border border-gray-600  focus:outline-none focus:ring-2 focus:ring-green-500" // Smaller padding, text
                required
              />
            </div>

            <div>
              <label htmlFor="userName" className="block text-xs font-medium text-gray-300 mb-1"> {/* Smaller text */}
                User Name
              </label>
              <input
                type="text"
                id="userName"
                placeholder="Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-2 py-1.5 bg-gray-700 text-sm text-white border border-gray-600  focus:outline-none focus:ring-2 focus:ring-green-500" // Smaller padding, text
                required
              />
            </div>

            <div>
              <label htmlFor="amount" className="block text-xs font-medium text-gray-300 mb-1"> {/* Smaller text */}
                Amount($)
              </label>
              <input
                type="number"
                id="amount"
                placeholder="Enter Amount."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-2 py-1.5 bg-gray-700 text-sm text-white border border-gray-600  focus:outline-none focus:ring-2 focus:ring-green-500" // Smaller padding, text
                required
                min="0.01"
                step="any"
              />
            </div>

            <div>
              <label htmlFor="transactionPin" className="block text-xs font-medium text-gray-300 mb-1"> {/* Smaller text */}
                Transaction Pin
              </label>
              <input
                type="password"
                id="transactionPin"
                placeholder="Enter Transaction Pin"
                value={transactionPin}
                onChange={(e) => setTransactionPin(e.target.value)}
                className="w-full px-2 py-1.5 bg-gray-700 text-sm text-white border border-gray-600  focus:outline-none focus:ring-2 focus:ring-green-500" // Smaller padding, text
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-gray-900 text-sm font-semibold py-2 px-3  focus:outline-none focus:ring-2 focus:ring-green-500" // Smaller text, reduced padding
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right Section: View Fund Transfer Table */}
        <div className="lg:col-span-2 bg-gray-800 p-5 rounded-lg shadow-lg border border-gray-700"> {/* Reduced padding */}
          <h2 className="text-lg font-semibold mb-5 text-gray-200">View Fund Transfer</h2>

          {/* Table Controls (Show entries, Search) */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-3 gap-3"> {/* Reduced margin-bottom, gap */}
            <div className="flex items-center gap-2">
              <label htmlFor="showEntries" className="text-xs text-gray-300">Show</label> {/* Smaller text */}
              <select
                id="showEntries"
                value={showEntries}
                onChange={(e) => {
                  setShowEntries(Number(e.target.value));
                  setCurrentPage(1); // Reset to first page on entries change
                }}
                className="bg-gray-700 border border-gray-600  py-1 px-2 text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" // Smaller padding, text
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <span className="text-xs text-gray-300">entries</span> {/* Smaller text */}
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label htmlFor="searchTable" className="text-xs text-gray-300 whitespace-nowrap">Search:</label> {/* Smaller text */}
              <input
                type="text"
                id="searchTable"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                className="bg-gray-700 border border-gray-600  py-1 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-xs" // Smaller text
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto"> {/* Makes table scrollable on small screens */}
            {/* Using a simple table here, replace with CustomTable if you have it */}
            {/* <CustomTable tablehead={tablehead} tablerow={tablerow} isLoading={false} /> */}
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  {tablehead.map((head, index) => (
                    <th key={index} scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"> {/* Smaller padding, text, font-medium instead of semibold */}
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-gray-200"> {/* Smaller padding, text, font-medium */}
                        {row.id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-300"> {/* Smaller padding, text */}
                        {row.date}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-300"> {/* Smaller padding, text */}
                        {row.userId}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-300"> {/* Smaller padding, text */}
                        {row.userName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-300"> {/* Smaller padding, text */}
                        {row.fromWallet}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-300"> {/* Smaller padding, text */}
                        {row.toWallet}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-300"> {/* Smaller padding, text */}
                        {row.toWallet} {/* Adjust if 'Tran' is different */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={tablehead.length} className="px-4 py-3 whitespace-nowrap text-xs text-gray-400 text-center"> {/* Smaller padding, text */}
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-3 text-xs"> {/* Reduced margin-top, smaller text */}
            <span className="text-gray-300">
              Showing {paginatedData.length > 0 ? (currentPage - 1) * showEntries + 1 : 0} to {Math.min(currentPage * showEntries, filteredData.length)} of {filteredData.length} entries
            </span>
            <div className="flex space-x-1"> {/* Reduced space-x */}
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5  bg-gray-700 text-white text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600" // Smaller padding, text
              >
                Previous
              </button>
              {/* Simple Page Number Display */}
              <span className="px-3 py-1.5  bg-green-500 text-gray-900 text-xs font-semibold"> {/* Smaller padding, text */}
                {currentPage}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5  bg-gray-700 text-white text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600" // Smaller padding, text
              >
                Next
              </button>
            </div>
            {/* If you have CustomToPagination, you can use it here */}
            {/* <CustomToPagination page={currentPage} setPage={setCurrentPage} data={{ totalRecords: filteredData.length, totalPages: totalPages }} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundTransfer;