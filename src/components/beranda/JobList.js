import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import { AiOutlineEnvironment, AiOutlineDollarCircle } from 'react-icons/ai';
import moment from 'moment';
import {
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";


const JobList = () => {
  
  const { handleFunctions } = useContext(GlobalContext);
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [showResults, setShowResults] = useState(false);
  const { formatRupiah, handleText } = handleFunctions;

  const [jobTitleFilter, setJobTitleFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [companyNameFilter, setCompanyNameFilter] = useState('');
  const [minSalaryFilter, setMinSalaryFilter] = useState('');

  useEffect(() => {
    axios
      .get('https://dev-example.sanbercloud.com/api/job-vacancy')
      .then((res) => {
        const reversedData = res.data.data.reverse();
        setData(reversedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = () => {
    const filteredData = data.filter((res) => {
      const isTitleMatched = res.title.toLowerCase().includes(jobTitleFilter.toLowerCase());
      const isCityMatched = cityFilter === '' || res.company_city.toLowerCase().includes(cityFilter.toLowerCase());
      const isCompanyNameMatched = companyNameFilter === '' || res.company_name.toLowerCase().includes(companyNameFilter.toLowerCase());
      const isSalaryMatched = minSalaryFilter === '' || res.salary_min >= parseInt(minSalaryFilter);
    
      return isTitleMatched && isCityMatched && isCompanyNameMatched && isSalaryMatched;
    });
  
    return filteredData;
  };

  const handleSort = (sortType) => {
    let sortedData = [];
    if (sortType === 'newest') {
      sortedData = [...data].sort((a, b) => b.id - a.id);
    } else if (sortType === 'oldest') {
      sortedData = [...data].sort((a, b) => a.id - b.id);
    }
    setSortBy(sortType);
    setData(sortedData);
  };

  const handleReset = () => {
    setJobTitleFilter('');
    setCityFilter('');
    setCompanyNameFilter('');
    setMinSalaryFilter('');
    setShowResults(false);
  };

  const filteredData = handleSearch();

  const handleSearchClick = () => {
    if (jobTitleFilter || cityFilter || companyNameFilter || minSalaryFilter) {
      setShowResults(true);
    } else {
      // Handle case when no filters are applied
      // You can show an error message or display all job vacancies
    }
  };

  return (
    <>
      <div className="bg-[#EFF6F2] border-b py-10">
  <div className="p-4 sm:mx-10">
    <div className="flex flex-col md:flex-row">
    <div className="relative w-full mb-2 md:mb-0">
      </div>
      <div className="flex flex-col md:flex-row">
      <input
          type="text"
          placeholder="Search by job title"
          value={jobTitleFilter}
          onChange={(e) => setJobTitleFilter(e.target.value)}
          className="mt-2 py-3 px-4 border rounded-md mb-2 md:mb-0 md:mr-2"
        />
        <input
          type="text"
          placeholder="Filter by city"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="mt-2 py-3 px-4 border rounded-md mb-2 md:mb-0 md:mr-2"
        />
        <input
          type="text"
          placeholder="Filter by company name"
          value={companyNameFilter}
          onChange={(e) => setCompanyNameFilter(e.target.value)}
          className="mt-2 py-3 px-4 border rounded-md mb-2 md:mb-0 md:mr-2"
        />
        <input
          type="number"
          placeholder="Min salary"
          value={minSalaryFilter}
          onChange={(e) => setMinSalaryFilter(e.target.value)}
          className="mt-2 py-3 px-4 border rounded-md mb-2 md:mb-0 md:mr-2"
        />
      </div>
      <div className="flex">
        <button
          onClick={handleSearchClick}
          className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-green-600 active:shadow-none shadow-lg bg-gradient-to-tr from-green-600 to-green-500 border-green-700 text-white"
        >
          <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
          <span className="relative">Search</span>
        </button>
        <button
          onClick={handleReset}
          className="rounded relative inline-flex group items-center justify-center px-3.5 py-2 m-1 cursor-pointer border-b-4 border-l-2 active:border-red-600 active:shadow-none shadow-lg bg-gradient-to-tr from-red-600 to-red-500 border-red-700 text-white"
        >
          <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
          <span className="relative">Reset</span>
        </button>
      </div>
    </div>
  </div>
</div>

      <div className="px-4 py-16 mx-auto sm:max-w-2xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
        <h2 className="font-sans mb-4 text-2xl font-semibold">
         All Job Vacancies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 row-gap-5">
          <div className="hidden md:block col-span-1">
            <div className="sticky top-20 p-4 border rounded-lg">
              <h2 className="mb-4 font-bold text-lg">Sort By</h2>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleSort('newest')}
                  className={`py-2 px-4 text-sm rounded ${sortBy === 'newest' ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-green-600 hover:opacity-50 hover:text-white'}`}
                >
                  Newest
                </button>
                <button
                  onClick={() => handleSort('oldest')}
                  className={`py-2 px-4 text-sm rounded ${sortBy === 'oldest' ? 'bg-green-600 text-white' : 'bg-gray-100 hover:bg-green-600 hover:opacity-50 hover:text-white'}`}
                >
                  Oldest
                </button>
              </div>
            </div>
          </div>

          <div className="grid col-span-3 gap-8 row-gap-5 md:grid-cols-2">
            {data !== null && showResults
              ? filteredData.map((res) => (
                  <Link
                    to={`/job-vacancy/${res.id}`}
                    key={res.id}
                    className="relative p-px overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl"
                  >
                  <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
                  <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
                  <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
                  <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
                  <div className="relative flex flex-col h-full p-5 bg-white rounded-sm lg:items-center lg:flex-row">
                    <div className="mb-6 mr-6 lg:mb-0">
                      <div className="flex items-center justify-center w-20 h-20 rounded-full lg:w-32 lg:h-32">
                        <img
                          className="object-fill object-center w-16 h-16 text-deep-purple-accent-400 lg:w-20 lg:h-20 rounded-full"
                          src={res.company_image_url}
                          alt="Company Logo"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-between flex-grow">
                      <div>
                        <h6 className="mb-2 font-semibold leading-5">{handleText(res.title, 20)}</h6>
                        <p className="mb-2 text-sm text-[#21a753]">{handleText(res.company_name, 10)}</p>
                        <p className="mb-2 text-sm text-gray-900">
                          <AiOutlineEnvironment className="inline-block mr-1 text-gray-700" />
                          {res.company_city}
                        </p>
                        <p className="mb-2 text-sm text-gray-900">
                          <AiOutlineDollarCircle className="inline-block mr-1 text-gray-700" />
                          {formatRupiah(res.salary_min + '')} - {formatRupiah(res.salary_max + '')}/Month
                        </p>

                          <p className="mt-1 text-sm text-gray-500">
                        {moment(res.created_at).fromNow()}</p>

                      </div>
                    </div>
                  </div>
                  </Link>
                ))
                : data !== null && data.map((res) => (
                  <Link
                    to={`/job-vacancy/${res.id}`}
                    key={res.id}
                    className="relative p-px overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl"
                  >
                    <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
                  <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
                  <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
                  <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
                  <div className="relative flex flex-col h-full p-5 bg-white rounded-sm lg:items-center lg:flex-row">
                    <div className="mb-6 mr-6 lg:mb-0">
                      <div className="flex items-center justify-center w-20 h-20 rounded-full lg:w-32 lg:h-32">
                        <img
                          className="object-fill object-center w-16 h-16 text-deep-purple-accent-400 lg:w-20 lg:h-20 rounded-full"
                          src={res.company_image_url}
                          alt="Company Logo"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-between flex-grow">
                      <div>
                        <h6 className="mb-2 font-semibold leading-5">{handleText(res.title, 20)}</h6>
                        <p className="mb-2 text-sm text-[#21a753]">{handleText(res.company_name, 10)}</p>
                        <p className="mb-2 text-sm text-gray-900">
                          <AiOutlineEnvironment className="inline-block mr-1 text-gray-700" />
                          {res.company_city}
                        </p>
                        <p className="mb-2 text-sm text-gray-900">
                          <AiOutlineDollarCircle className="inline-block mr-1 text-gray-700" />
                          {formatRupiah(res.salary_min + '')} - {formatRupiah(res.salary_max + '')}/Month
                        </p>

                          <p className="mt-1 text-sm text-gray-500">
                        {moment(res.created_at).fromNow()}</p>

                      </div>
                    </div>
                  </div>
              </Link>
                ))}
            </div>
          </div>
        </div>
    </>
  );
};

export default JobList;