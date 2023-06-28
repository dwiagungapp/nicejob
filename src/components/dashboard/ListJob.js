import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import { FaEdit, FaTrash } from "react-icons/fa";

const ListJob = () => {
  const { handleFunctions } = useContext(GlobalContext);
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);

  const { formatRupiah, handleEdit, handleDelete } = handleFunctions;

  useEffect(() => {
    axios
      .get("https://dev-example.sanbercloud.com/api/job-vacancy")
      .then((res) => {
        setData([...res.data.data].reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Calculate the index of the last job on the current page
  const lastIndex = currentPage * jobsPerPage;
  // Calculate the index of the first job on the current page
  const firstIndex = lastIndex - jobsPerPage;
  // Get the jobs to be displayed on the current page
  const currentJobs = data !== null ? data.slice(firstIndex, lastIndex) : [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="container max-w-7xl mx-auto">
        <div className="mb-4 pt-10">
          <h1 className="font-bold text-dark text-3xl mb-5 max-w-md lg:text-3xl">
            {" "}
            Data List Job
          </h1>
          <div className="flex justify-end">
            <Link to="/dashboard/list-job-vacancy/form">
              <button className="px-4 py-2 rounded-md bg-[#21a753] text-white hover:bg-green-500">
                Create Job
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full border">
          <thead>
            <tr>
              <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                NO
              </th>
              <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Title
              </th>
              <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Company Name
              </th>
              <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                Salary
              </th>
              <th
                className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50"
                colSpan={2}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
          {currentJobs.map((res, index) => {
  const jobIndex = firstIndex + index + 1;
  return (
    <React.Fragment key={res.id}>
      <tr>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <div className="flex items-center">{jobIndex}</div>
        </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                  {res.title}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="text-sm leading-5 text-gray-900">
                  {res.company_name}
                </div>
              </td>
              <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                <span>{formatRupiah(res?.salary_min + "") }</span>
              </td>
              <td className="text-sm font-medium leading-5 text-center whitespace-no-wrap border-b border-gray-200 ">
              <button
                onClick={handleEdit}
                value={res.id}
                type="button"
                className="text-gray-700 transition-colors duration-150 bg-white rounded-lg focus:shadow-outline hover:bg-[#21a753] hover:text-white px-2 py-2.5 mt-2 mb-2"
              >
                <FaEdit />
              </button>

              <button
                onClick={handleDelete}
                value={res.id}
                type="button"
                className="text-gray-700 transition-colors duration-150 bg-white rounded-lg focus:shadow-outline hover:bg-red-600 hover:text-white px-2 py-2.5 mr-2 mb-2"
              >
                <FaTrash />
              </button>
              </td>
              </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Pagination */}
        {data !== null && data.length > jobsPerPage && (
          <ul className="flex justify-center mt-4 pb-4">
            {Array.from({ length: Math.ceil(data.length / jobsPerPage) }).map(
              (item, index) => (
                <li
                  key={index}
                  className={`px-2 py-1 cursor-pointer ${
                    currentPage === index + 1 ? "bg-[#21a753] hover:opacity-70 text-white" : ""
                  }`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </li>
              )
            )}
          </ul>
        )}
      </div>
      <div className="pb-10"></div>
    </>
  );
};

export default ListJob;