import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import { AiOutlineEnvironment } from 'react-icons/ai';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import moment from 'moment';
import {
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";

const JobDetail = () => {
  const { handleFunctions } = useContext(GlobalContext);

  const { Id } = useParams();
  const [data, setData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const token = Cookies.get('token');

  const { formatRupiah, handleStatus } = handleFunctions;

  useEffect(() => {
    if (Id !== undefined) {
      axios.get(`https://dev-example.sanbercloud.com/api/job-vacancy/${Id}`).then((res) => {
        setData(res.data);
      });
    }
  }, []);

  const handleApplyNow = () => {
    // Perform any necessary submission logic here

    // Show SweetAlert on successful submission
    Swal.fire({
      icon: 'success',
      title: 'Lamaran Sukses Terkirim',
      text: 'Terima kasih telah mengirim lamaran!',
    });

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center my-10">
        <p className="text-green-500 font-semibold mb-4">Lamaran sukses terkirim!</p>
        <button
          type="button"
          className="bg-[#21A753] hover:opacity-80 text-white font-medium p-3 rounded-lg"
          onClick={() => setIsSubmitted(false)}
        >
          Kembali ke lamaran
        </button>
      </div>
    );
  }

  if (data === null) {
    return (
      <div className="flex justify-center mx-10 my-20">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 px-4 sm:px-8 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg p-6 flex flex-col">
          <div>
            <img src={data?.company_image_url} alt="Company" className="w-full h-60 object-fill object-center mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">{data?.title}</h3>
            <h3 className="text-sm font-small text-[#21a753]">{data?.company_name}</h3>
            <div className="flex items-center mt-2">
              <AiOutlineEnvironment className="mr-1" />
              <p className="text-sm text-gray-500">{data?.company_city}</p>
            </div>
            <div className="flex items-center mt-2">
            <CalendarDaysIcon className="mr-1 h-4 w-4 text-gray-900" /> 
            <p className="mt-1 text-sm text-gray-500">
              {moment(data?.created_at).fromNow()}</p>
            </div>
          </div>
          <div className='flex flex-wrap'>
          {data?.job_status === 1 && token && (
            <button
              type="button"
              className="bg-[#21A753] hover:opacity-80 text-white font-medium p-3 rounded-lg mt-4"
              onClick={handleApplyNow}
            >
              Lamar sekarang
            </button>
          )}
          </div>
        </div>

        <div className="bg-white p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Job Description</h4>
          <ul className="list-disc list-inside text-sm text-gray-500">
            {data?.job_description.split('\n').map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
          <div className="mt-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">Job Qualification</h4>
            <p className="text-sm text-gray-500">{data?.job_qualification}</p>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">Job Type</h4>
            <p className="text-sm text-gray-500">{data?.job_type}</p>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">Job Tenure</h4>
            <p className="text-sm text-gray-500">{data?.job_tenure}</p>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">Job Status</h4>
            <p className="text-sm text-gray-500">{handleStatus(data?.job_status)}</p>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">Job Salary</h4>
            <p className="text-sm text-gray-500">
              {formatRupiah(data?.salary_min + '')} - {formatRupiah(data?.salary_max + '')}/Month
            </p>
          </div>

        </div>
      </div>
      
      
    </div>
  );
};

export default JobDetail;