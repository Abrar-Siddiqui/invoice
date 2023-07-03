import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage.jsx";
import Spinner from "../components/Spinner.jsx";
import SuccessMessage from "../components/SuccessMessage.jsx";
import useAuth from "../hooks/useAuth.js";
import useDebouncedCallback from "../hooks/useDebouncedCallback.js";
import { GSTIN_RGX } from "../lib/validation.js";
import { useIndexedDB } from "react-indexed-db";
import uuid from "react-uuid";
import { useAddNewPostDataMutation } from "../store/redux-toolkit/Slices/GetDataSlice.js";
import { useAddSupplierMutation } from "../store/redux-toolkit/Slices/GetDataSlice.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ENDPOINT = `https://mom.itaxeasy.com/api/gsp/search/gstin`;

export default function AddParty() {
  const [addNewPost, response] = useAddNewPostDataMutation();
  const [addSupplier, response1] = useAddSupplierMutation();
  const { token } = useAuth();

  const { partyType } = useParams();

  const navigate = useNavigate();
  // console.log(partyType)
  const {
    handleSubmit,
    formState: { errors, defaultValues },
    register,
    watch,
    setValue,
    getValues,
  } = useForm();

  const gstin = watch("gstin");
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const [error, setError] = useState("");
  const [details, setDetails] = useState(null);
  const debouncedFetchGSTDetails = useDebouncedCallback(async () => {
    try {
      setError("");

      const response = await fetch(`${ENDPOINT}?gstin=${gstin}`, {
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });

      const { data, message } = await response.json();

      if (!response.ok) {
        throw new Error(message);
      }

      setDetails(data);

      setValue("name", data.lgnm);
      setValue("address", Object.values(data.pradr.addr).join(" "));
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setFetchingDetails(false);
    }
  }, 400);

  const onSubmit = async () => {
    try {
      const gst_in_no = getValues("gstin");
      const party_name = getValues("name");
      const phone_no = getValues("phone");
      const address = getValues("address");
      const account_no = getValues("account");
      const ifsc_code = getValues("ifsc");
      const ac_holder_name = getValues("acholname");
      const values = {
        gst_in_no: gst_in_no,
        party_name: party_name,
        phone_no: phone_no,
        address: address,
        account_no: account_no,
        ifsc_code: ifsc_code,
        ac_holder_name: ac_holder_name,
        date: new Date(),
        id: uuid(),
      };
      const { update, getByID } = useIndexedDB("userData");
      const { indexId } = JSON.parse(localStorage.getItem("authUser"));
      const prevResponse = await getByID(indexId);

      if (
        prevResponse[partyType]?.filter((item) => item.phone === phone).length >
        0
      ) {
        setValue("phone", "");
        return;
      }
      await update({
        id: indexId,
        ...prevResponse,
        [partyType]: [...prevResponse[partyType], values],
      });
      if (partyType === "customer") {
        addNewPost(values)
          .unwrap()
          .then(() =>
            toast.success("Succesfully !", {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
          )
          .then(() => {
            setTimeout(() => {
              navigate("/customers");
            }, [4500]);
          })
          .catch((error) =>
            toast.error("Error Please Check ?", {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
          );
      } else if (partyType === "supplier") {
        addSupplier(values)
          .unwrap()
          .then(() =>
            toast.success("Succesfully !", {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
          )
          .then(() => {
            setTimeout(() => {
              navigate("/suppliers");
            }, [4500]);
          })
          .catch((error) =>
            toast.error("Error Please Check ?", {
              position: "top-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
          );
      }

      setValue("name", "");
      setValue("address", "");
      setValue("phone", "");
      setValue("gstin", "");
      setValue("account", "");
      setValue("ifsc", "");
      setValue("acholname");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!gstin) {
      return;
    }

    setFetchingDetails(true);

    debouncedFetchGSTDetails();
  }, [gstin]);

  return (
    <div className="flex dir-col g-1rem">
      <h4>Add {partyType === "customer" ? "Customer" : "Supplier"}</h4>
      <div className="cards">
        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field optional ">
              <label htmlFor="gstin">GSTIN no</label>
              <div className="flex dir-col g-0_5rem">
                <input
                  className="input text-uppercase"
                  type="text"
                  id="gstin"
                  {...register("gstin", {
                    pattern: {
                      value: GSTIN_RGX,
                      message: "Invalid GSTIN",
                    },
                  })}
                />
                {fetchingDetails ? (
                  <div className="flex ai-center g-0_5rem text-primary">
                    <Spinner />
                    Verifying
                  </div>
                ) : error ? (
                  <ErrorMessage message={error} />
                ) : details ? (
                  <SuccessMessage message="GSTIN Verified." />
                ) : null}
              </div>
              {errors.gstin ? (
                <ErrorMessage message={errors.gstin.message} />
              ) : null}
            </div>
            <div className="flex ai-top g-1rem">
              <div className="field flex-1 required">
                <label htmlFor="name">Party name</label>
                <input
                  className="input"
                  type="text"
                  id="name"
                  {...register("name", { required: "Party name is required" })}
                />
                {errors.name ? (
                  <ErrorMessage message={errors.name.message} />
                ) : null}
              </div>
              <div className="field flex-1 required">
                <label htmlFor="phone">Phone no</label>
                <input
                  className="input"
                  type="text"
                  id="phone"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                />
                {errors.phone ? (
                  <ErrorMessage message={errors.phone.message} />
                ) : null}
              </div>
            </div>
            <div className="md:flex ai-top g-1rem">
              <div className="field flex-1 required">
                <label htmlFor="name">Bank A/C Number</label>
                <input
                  className="input"
                  type="text"
                  id="account"
                  {...register("account", {
                    required: "Bank A/c Number is required",
                  })}
                />
                {errors.account ? (
                  <ErrorMessage message={errors.account.message} />
                ) : null}
              </div>
              <div className="field flex-1 required">
                <label htmlFor="ifsc">IFSC No.</label>
                <input
                  className="input"
                  type="text"
                  id="ifsc"
                  {...register("ifsc", {
                    required: "IFSC number is required",
                  })}
                />
                {errors.ifsc ? (
                  <ErrorMessage message={errors.ifsc.message} />
                ) : null}
              </div>
              <div className="field flex-1 required">
                <label htmlFor="acholname">Ac Holder Name</label>
                <input
                  className="input"
                  type="text"
                  id="acholname"
                  {...register("acholname", {
                    required: "A/c Holder Name is required",
                  })}
                />
                {errors.acholname ? (
                  <ErrorMessage message={errors.acholname.message} />
                ) : null}
              </div>
            </div>
            <div className="field required">
              <label htmlFor="address">Address</label>
              <textarea
                type="text"
                id="address"
                {...register("address", { required: "Address is required" })}
              ></textarea>
              {errors.address ? (
                <ErrorMessage message={errors.address.message} />
              ) : null}
            </div>
            <button className="button block-button is-small is-primary">
              Add
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
