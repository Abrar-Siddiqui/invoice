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

const ENDPOINT = `https://api.itaxeasy.com/webinvoice/addCustomer`;

export default function AddParty() {
  const { token } = useAuth();

  const { partyType } = useParams();
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
      const name = getValues("name");
      const phone = getValues("phone");
      const address = getValues("address");
      const values = {
        name,
        phone,
        address,
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
      setValue("name", "");
      setValue("address", "");
      setValue("phone", "");
      setValue("gstin", "");
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
                  //   {...register("gstin", {
                  //     pattern: {
                  //       value: GSTIN_RGX,
                  //       message: "Invalid GSTIN",
                  //     },
                  //   })}
                  {...register("gstin", {
                    required: "Party gstin is required",
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
            <div className="field required">
              <label htmlFor="address">Address </label>
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
    </div>
  );
}
