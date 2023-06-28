import React from "react";
import Cookies from "js-cookie";

const WelcomeDashboard = () => {
  const jobApplications = [
    {
      id: 1,
      title: "Software Engineer",
      company: "ABC Company",
      status: "Pending",
    },
    {
      id: 2,
      title: "Data Analyst",
      company: "XYZ Corporation",
      status: "Approved",
    },
    {
      id: 3,
      title: "Product Manager",
      company: "123 Industries",
      status: "Rejected",
    },
    {
        id: 4,
        title: "React JS Frontend",
        company: "Sanbercode",
        status: "Rejected",
      },
      {
        id: 5,
        title: "Fullstack Programmer",
        company: "Wahidev",
        status: "Approved",
      },
      {
        id: 6,
        title: "QC Manager",
        company: "Tempo Scan Pacific",
        status: "Approved",
      },
  ];

  return (
    <>
      <h2 className="font-bold text-dark text-3xl mb-5 pl-4 pt-10 lg:text-3xl">
        {" "}
        Welcome, {Cookies.get("name")} 👋
      </h2>
      <div className="flex flex-wrap mb-2">
        <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2">
          <div className="stat-card bg-green-600 border rounded shadow p-2 hover:translate-y-[-5px] hover:shadow-md transition-transform duration-300">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pl-1 pr-4">
                <i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i>
              </div>
              <div className="flex-1 text-right">
                <h5 className="text-white">Total Jobs</h5>
                <h3 className="text-white text-3xl">100</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2">
          <div className="stat-card bg-blue-600 border rounded shadow p-2 hover:translate-y-[-5px] hover:shadow-md transition-transform duration-300">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pl-1 pr-4">
                <i className="fas fa-users fa-2x fa-fw fa-inverse"></i>
              </div>
              <div className="flex-1 text-right">
                <h5 className="text-white">Active Jobs</h5>
                <h3 className="text-white text-3xl">80</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pr-3 xl:pl-1">
          <div className="stat-card bg-orange-600 border rounded shadow p-2 hover:translate-y-[-5px] hover:shadow-md transition-transform duration-300">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pl-1 pr-4">
                <i className="fas fa-user-plus fa-2x fa-fw fa-inverse"></i>
              </div>
              <div className="flex-1 text-right pr-1">
                <h5 className="text-white">New Jobs</h5>
                <h3 className="text-white text-3xl">20</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-3 xl:pr-2">
          <div className="stat-card bg-purple-600 border rounded shadow p-2 hover:translate-y-[-5px] hover:shadow-md transition-transform duration-300">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pl-1 pr-4">
                <i className="fas fa-server fa-2x fa-fw fa-inverse"></i>
              </div>
              <div className="flex-1 text-right">
                <h5 className="text-white">Pending Jobs</h5>
                <h3 className="text-white text-3xl">15</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2 xl:pl-2 xl:pr-3">
          <div className="stat-card bg-red-600 border rounded shadow p-2 hover:translate-y-[-5px] hover:shadow-md transition-transform duration-300">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pl-1 pr-4">
                <i className="fas fa-tasks fa-2x fa-fw fa-inverse"></i>
              </div>
              <div className="flex-1 text-right">
                <h5 className="text-white">Completed Jobs</h5>
                <h3 className="text-white text-3xl">5</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-1">
          <div className="stat-card bg-pink-600 border rounded shadow p-2 hover:translate-y-[-5px] hover:shadow-md transition-transform duration-300">
            <div className="flex flex-row items-center">
              <div className="flex-shrink pl-1 pr-4">
                <i className="fas fa-inbox fa-2x fa-fw fa-inverse"></i>
              </div>
              <div className="flex-1 text-right">
                <h5 className="text-white">Pending Approval</h5>
                <h3 className="text-white text-3xl">10</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="font-bold text-dark text-2xl mb-4 pl-4 mt-6">Job Applications</h2>
      <div className="flex flex-wrap">
        {jobApplications.map((application) => (
          <div
            key={application.id}
            className="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pr-2"
          >
            <div className="application-card bg-white border rounded shadow p-2 hover:translate-y-[-5px] hover:shadow-md transition-transform duration-300">
              <div className="flex flex-row items-center">
                <div className="flex-shrink pl-1 pr-4">
                  <i className="fas fa-file-alt fa-2x fa-fw"></i>
                </div>
                <div className="flex-1">
                  <h5 className="text-dark font-bold">{application.title}</h5>
                  <p className="text-gray-600">{application.company}</p>
                  <span
                    className={`text-sm font-semibold ${
                      application.status === "Approved"
                        ? "text-green-600"
                        : application.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {application.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pb-10"></div>
    </>
  );
};

export default WelcomeDashboard;