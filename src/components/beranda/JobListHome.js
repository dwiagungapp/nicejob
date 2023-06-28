import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AiOutlineEnvironment } from 'react-icons/ai';
import { GlobalContext } from '../../context/GlobalContext';
import moment from 'moment';

const JobListHome = () => {
  const { handleFunctions } = useContext(GlobalContext);
  const [data, setData] = useState(null);
  const { formatRupiah } = handleFunctions;

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

  return (
    <>
      <div className="mx-6 flex items-center justify-center">
        <p className="font-sans mt-10 text-3xl font-semibold">Latest Jobs</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 text-gray-600 body-font my-10 mx-4">
        {data !== null &&
          data
            .filter((res, index) => index < 6)
            .map((res) => (
              <Link
                to={`/job-vacancy/${res.id}`}
                key={res.id}
                className="border shadow-md m-2 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-24 relative">
                  <img
                    alt="companylogo"
                    className="object-fill object-center border-t border-b w-full h-full"
                    src={res.company_image_url}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {res.company_name}
                  </h3>
                  <div className="flex items-center">
                    <AiOutlineEnvironment />
                    <p className="text-gray-500 text-xs tracking-widest ml-2">
                      {res.company_city}
                    </p>
                  </div>
                  <h2 className="font-sans text-green-600 title-font text-lg font-bold mt-2">
                    {res.title}
                  </h2>
                  <p className="mt-1 text-sm font-bold">
                    {formatRupiah(res.salary_min + '')} - {formatRupiah(res.salary_max + '')}/Month
                  </p>
                  <h2 className="font-sans text-gray-500 title-font text-sm font-medium mt-6">
                  {moment(res.created_at).fromNow()}
                  </h2>
                </div>
              </Link>
            ))}
      </div>

      <div className="flex items-center justify-center mb-10 ">
        <button className="px-4 py-4 rounded px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
          <Link to="/job-vacancy"><span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
          <span className="relative">Lihat lebih banyak lowongan</span></Link>
        </button>
      </div>
    </>
  );
};

export default JobListHome;