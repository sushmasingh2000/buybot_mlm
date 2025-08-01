import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { apiConnectorPost } from '../../../utils/APIConnector';
import { endpoint } from '../../../utils/APIRoutes';
import CustomToPagination from '../../../Shared/Pagination';
import { useFormik } from 'formik';
import CustomTable from '../../Shared/CustomTable';
const Level = () => {
  const [page, setPage] = useState(1)
  const client = useQueryClient();
  const initialValues = {
    income_Type: "",
    search: '',
    pageSize: 10,
    start_date: '',
    end_date: '',
  };

  const fk = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,

  })
  const { data, isLoading } = useQuery(
    ['get_level_admin', fk.values.search, fk.values.start_date, fk.values.end_date, page],
    () =>
      apiConnectorPost(endpoint?.admin_roi_income_api, {
        income_Type: 'Level Income',
        search: fk.values.search,
        start_date: fk.values.start_date,
        end_date: fk.values.end_date,
        pageNumber: page,
        pageSize: "10",
      }),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onError: (err) => console.error("Error fetching level data:", err),
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
      <span> {index + 1}</span>,
      <span>{row.LEDGER_DATETIME}</span>,
      <span>{row.TRANS_ID}</span>,
      <span> {row.LEDGER_CR ? `$${parseFloat(row.LEDGER_CR).toFixed(2)}` : '$0.00'}</span>,
      <span>{row.LEDGER_NAME}</span>,
      <span>{row.LEDGER_EMAIL || 'N/A'}</span>,
      <span>{row.LEDGER_DESC || 'N/A'}</span>,


    ];
  });
  return (
    <div className="p-2">
      <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-3 text-white mb-6">
      

        <div className="flex flex-col sm:flex-wrap md:flex-row items-center gap-3 sm:gap-4 w-full text-sm sm:text-base">
          <input
            type="date"
            name="start_date"
            id="start_date"
            value={fk.values.start_date}
            onChange={fk.handleChange}
            className="bg-white bg-opacity-50 border border-gray-600 rounded-md py-2 px-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
          />
          <input
            type="date"
            name="end_date"
            id="end_date"
            value={fk.values.end_date}
            onChange={fk.handleChange}
            className="bg-white bg-opacity-50 border border-gray-600 rounded-md py-2 px-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
          />
          <input
            type="text"
            name="search"
            id="search"
            value={fk.values.search}
            onChange={fk.handleChange}
            placeholder="User ID"
            className="bg-white bg-opacity-50 border border-gray-600 rounded-full py-2 px-3 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto text-sm"
          />
          <button
            onClick={() => {
              setPage(1);
              client.invalidateQueries(["get_level_admin"]);
            }}
            type="submit"
            className="bg-blue-500 text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-dark-color transition-colors w-full sm:w-auto text-sm"
          >
            Search
          </button>
          <button
            onClick={() => {
              fk.handleReset();
              setPage(1);
            }}
            className="bg-gray-color text-gray-900 font-bold py-2 px-4 rounded-full hover:bg-black hover:text-white transition-colors w-full sm:w-auto text-sm"
          >
            Clear
          </button>
        </div>
      </div>


      {/* Main Table Section */}
    
        <CustomTable
          tablehead={tablehead}
          tablerow={tablerow}
          isLoading={isLoading}
        />


        {/* Pagination */}
        <CustomToPagination
          page={page}
          setPage={setPage}
          data={allData}
        />
    
    </div>
  );
};

export default Level;
