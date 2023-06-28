import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import swal from 'sweetalert';

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  let navigate = useNavigate();

  const [searchStatus, setSearchStatus] = useState(true);

  const [input, setInput] = useState({
    title: "",
    job_description: "",
    job_qualification: "",
    job_type: "",
    job_tenure: "",
    job_status: "",
    job_status_0: "",
    job_status_1: "",
    company_name: "",
    company_image_url: "",
    company_city: "",
    salary_min: "",
    salary_max: "",
  });
  let [currentIndex, setCurrentIndex] = useState(-1);
  let [fetchStatus, setFetchStatus] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    let {
      id,
      title,
      job_description,
      job_qualification,
      job_type,
      job_tenure,
      job_status,
      company_name,
      company_image_url,
      company_city,
      salary_min,
      salary_max,
    } = input;

    const requestData = {
      id,
      title,
      job_description,
      job_qualification,
      job_type,
      job_tenure,
      job_status,
      company_name,
      company_image_url,
      company_city,
      salary_min,
      salary_max,
    };

    if (currentIndex === -1) {
      axios
        .post('https://dev-example.sanbercloud.com/api/job-vacancy', requestData, 
        { headers: { Authorization: "Bearer " + Cookies.get("token") } }
        )
        .then((res) => {
          swal('Success', 'Data has been created!', 'success');
          setFetchStatus(true);
        })
        .then(() => {
          navigate('/dashboard/list-job-vacancy');
        });
    } else {
    axios
      .put(
        `https://dev-example.sanbercloud.com/api/job-vacancy/${currentIndex}`,
        requestData, { headers: { Authorization: "Bearer " + Cookies.get("token") } }
      )
      .then((res) => {
        swal('Success', 'Data has been updated!', 'success');
        setFetchStatus(true);
      })
      .then(() => {
          navigate('/dashboard/list-job-vacancy');
        });
      ;
  }

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
    setCurrentIndex(-1);
  };

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    // let status = ["job_status_1", "job_status_0"];

    if (name === "job_status_1") {
      setInput({
        ...input,
        job_status_1: value,
        job_status_0: "",
        job_status: value,
      });
    } else if (name === "job_status_0") {
      setInput({
        ...input,
        job_status_0: value,
        job_status_1: "",
        job_status: value,
      });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const handleEdit = (event) => {
    let idJob = parseInt(event.target.value);
    navigate(`/dashboard/list-job-vacancy/edit/${idJob}`);
    console.log(idJob);
  };

  const handleDelete = (event) => {
    let idData = parseInt(event.target.value);
    
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this data!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(
            `https://dev-example.sanbercloud.com/api/job-vacancy/${idData}`, {
              headers: { Authorization: "Bearer " + Cookies.get("token") },
            })
          .then((res) => {
            swal('Success', 'Data has been deleted! Please refresh the page.', 'success');
            setFetchStatus(true);
          });
      }
    });
  };

  const handleStatus = (params) => {
    let status = params;
    if (status === 1) {
      return <span className="text-green-500">Dibuka</span>;
    } else {
      return <span className="text-red-500">Ditutup</span>;
    }
  };
  
  const formatRupiah = (angka) => {
    if (angka !== null) {
      var number = parseInt(angka);
      var million = number / 1000000; // Convert to million
      var formattedValue = million.toFixed(1).toString(); // Format with one decimal place and convert to string
  
      // Remove trailing zero and decimal point if present
      if (formattedValue.indexOf('.') !== -1) {
        formattedValue = formattedValue.replace(/\.?0+$/, '');
      }
  
      return formattedValue + " juta";
    } else {
      return "";
    }
  };  

  const handleText = (text, max) => {
    if (text === null) {
      return '';
    } else if (text.length > 10) {
      return text.slice(0, max) + '...';
    } else {
      return text;
    }
  };

  let handleFunctions = {
    handleSubmit,
    handleChange,
    handleEdit,
    handleDelete,
    handleStatus,
    formatRupiah,
    handleText,
  };

  let state = {
    input,
    setInput,
    currentIndex,
    setCurrentIndex,
    searchStatus,
    setSearchStatus,
    fetchStatus,
    setFetchStatus,
  };

  return (
    <>
      <GlobalContext.Provider value={{ handleFunctions, state }}>
        {props.children}
      </GlobalContext.Provider>
    </>
  );
};