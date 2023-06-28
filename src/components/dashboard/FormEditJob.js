import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";

const FormEditJob = () => {
  let { slug } = useParams();
  const { handleFunctions, state } = useContext(GlobalContext);
  let {
    handleChange,
    handleSubmit,
  } = handleFunctions;

  let {
    input,
    setInput,
    setCurrentIndex,
  } = state;
 
  useEffect(() => {
    if (slug !== undefined) {
      axios
        .get(`https://dev-example.sanbercloud.com/api/job-vacancy/${slug}`)
        .then((res) => {
          let data = res.data;
          console.log(data);
          setInput({
            title: data.title,
            job_description: data.job_description,
            job_qualification: data.job_qualification,
            job_type: data.job_type,
            job_tenure: data.job_tenure,
            job_status: data.job_status,
            company_name: data.company_name,
            company_image_url: data.company_image_url,
            company_city: data.company_city,
            salary_min: data.salary_min,
            salary_max: data.salary_max,
          });
          setCurrentIndex(data.id);
        });
    }
  
    return () => {
      setInput({
        title: "",
        job_description: "",
        job_qualification: "",
        job_type: "",
        job_tenure: "",
        job_status: "",
        company_name: "",
        company_image_url: "",
        company_city: "",
        salary_min: "",
        salary_max: "",
      });
    };
  }, [slug, setInput, setCurrentIndex]);

  const inputPlaceholders = {
    title: "Enter the job title",
    company_name: "Enter the company name",
    company_image_url: "Enter the company image URL",
    company_city: "Enter the company city",
    job_qualification: "Enter the job qualification",
    job_description: "Enter the job description",
    job_type: "Enter the job type",
    job_tenure: "Enter the job tenure",
    salary_min: "Enter the minimum salary",
    salary_max: "Enter the maximum salary",
  };

  return (
    <>
      <div className="pt-10 md:col-span-2">
        <h2 className="font-bold text-dark text-3xl mb-5 max-w-md lg:text-3xl">
          Form Edit Jobs{" "}
        </h2>
        <form onSubmit={handleSubmit} method="POST">
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Title{" "}
                  </label>
                  <input
                    onChange={handleChange}
                    value={input.title}
                    type="text"
                    name="title"
                    placeholder={inputPlaceholders.title}
                    required
                    className="mt-1  block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Company Name{" "}
                  </label>
                  <input
                    onChange={handleChange}
                    value={input.company_name}
                    type="text"
                    name="company_name"
                    placeholder={inputPlaceholders.company_name}
                    required
                    className="mt-1  block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Company Image (URL){" "}
                  </label>
                  <input
                    onChange={handleChange}
                    value={input.company_image_url}
                    type="text"
                    name="company_image_url"
                    placeholder={inputPlaceholders.company_image_url}
                    required
                    className="mt-1  block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Company City{" "}
                  </label>
                  <input
                    onChange={handleChange}
                    value={input.company_city}
                    type="text"
                    name="company_city"
                    placeholder={inputPlaceholders.company_city}
                    // required
                    className="mt-1  block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Job Qualification
                  </label>
                  <input
                    onChange={handleChange}
                    value={input.job_qualification}
                    type="text"
                    name="job_qualification"
                    placeholder={inputPlaceholders.job_qualification}
                    required
                    className="mt-1  block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
                  />
                </div>

                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Job Description{" "}
                  </label>
                  <textarea
                    onChange={handleChange}
                    value={input.job_description}
                    name="job_description"
                    placeholder={inputPlaceholders.job_description}
                    required
                    className="mt-1 block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600 h-48 resize-none"
                  ></textarea>
                </div>

                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Job Status
                  </label>
                  <input
                    checked={input.job_status_0}
                    onChange={handleChange}
                    type="radio"
                    name="job_status_0"
                    value="0"
                  />
                  Ditutup
                  <input
                    checked={input.job_status_1}
                    onChange={handleChange}
                    type="radio"
                    name="job_status_1"
                    value="1"
                  />
                  Dibuka
                  {!(input.job_status_0 || input.job_status_1) && (
                  <p className="text-red-500 text-sm mt-1">Please select one option.</p>
                )}
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Job Type
                  </label>
                  <input
                    onChange={handleChange}
                    value={input.job_type}
                    type="text"
                    name="job_type"
                    placeholder={inputPlaceholders.job_type}
                    required
                    className="mt-1  block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Job Tenure
                  </label>
                  <input
                    onChange={handleChange}
                    value={input.job_tenure}
                    type="text"
                    name="job_tenure"
                    placeholder={inputPlaceholders.job_tenure}
                    required
                    className="mt-1 block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Salary Min
                  </label>
                  <input
                    onChange={handleChange}
                    value={input.salary_min}
                    type="text"
                    name="salary_min"
                    placeholder={inputPlaceholders.salary_min}
                    required
                    className="mt-1  block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Salary Max
                  </label>
                  <input
                    onChange={handleChange}
                    value={input.salary_max}
                    type="text"
                    name="salary_max"
                    placeholder={inputPlaceholders.salary_max}
                    required
                    className="mt-1  block w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-600"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#21a753] hover:opacity-70 focus:outline-none focus:ring-2 "
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="pb-10"></div>
    </>
  );
};

export default FormEditJob;