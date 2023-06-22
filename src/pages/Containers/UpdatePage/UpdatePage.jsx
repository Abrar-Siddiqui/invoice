import React, { useState } from "react";
import { useParams } from "react-router-dom";

const UpdatePage = () => {
  const params = useParams();
  const { id } = params;
  console.log(id);
  const [formData, setFormData] = useState({
    partyname: "",
    accountername: "",
    mobileno: "",
    acnumber: "",
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="w-[50%] mx-auto ">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between mx-auto gap-5">
          <div className="mb-4 ">
            <label
              className="block text-gray-900 text-sm font-normal mb-2"
              htmlFor="partyname"
            >
              Party Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              id="partyname"
              type="text"
              name="partyname"
              placeholder="Enter your Party Name"
              value={formData.partyname}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-900 text-sm font-normal mb-2"
              htmlFor="accountername"
            >
              Accounter Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              id="accountername"
              type="text"
              name="accountername"
              placeholder="Enter your Accounter Name"
              value={formData.accountername}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-between mx-auto gap-5">
          <div className="mb-4">
            <label
              className="block text-sm bg-white font-normal mb-2"
              htmlFor="mobileno"
            >
              Mobile No.
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              id="mobileno"
              type="tel"
              name="mobileno"
              placeholder="Enter your Mobile No."
              value={formData.mobileno}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-900 text-sm font-normal mb-2"
              htmlFor="acnumber"
            >
              A/C Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              id="acnumber"
              type="number"
              name="acnumber"
              placeholder="Enter your acnumber number"
              value={formData.acnumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-between mx-auto gap-5">
          <div className="mb-4">
            <label
              className="block text-sm bg-white font-normal mb-2"
              htmlFor="mobileno"
            >
              Ifsc Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              id="mobileno"
              type="tel"
              name="mobileno"
              placeholder="Enter your Mobile No."
              value={formData.mobileno}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-900 text-sm font-normal mb-2"
              htmlFor="acnumber"
            >
              Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
              id="acnumber"
              type="number"
              name="acnumber"
              placeholder="Enter your acnumber number"
              value={formData.acnumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-between mx-auto">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePage;
