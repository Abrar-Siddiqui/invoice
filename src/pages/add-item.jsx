import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage.jsx";
import PriceInput from "../components/Form/PriceInput.jsx";
import Switch from "../components/Form/Switch.jsx";
import Spinner from "../components/Spinner.jsx";
import SuccessMessage from "../components/SuccessMessage.jsx";
import useAuth from "../hooks/useAuth.js";
import { useIndexedDB } from "react-indexed-db"
import uuid from "react-uuid"


const ENDPOINT = `https://mom.itaxeasy.com/api/gsp/search/gstin`;

export default function AddItem() {
    const { token } = useAuth();

    const { partyType } = useParams();
    const { handleSubmit, formState: { errors, defaultValues }, register, watch, setValue,getValues } = useForm();

    const [fetchingDetails, setFetchingDetails] = useState(false);
    const [error, setError] = useState('');
    const [details, setDetails] = useState(null);

    const onSubmit = async () => {

        const values=getValues()
        const updatedValues= {...values,id:uuid()}

        const { update,getByID} = useIndexedDB("userData")
        const { indexId } = JSON.parse(localStorage.getItem("authUser"))
        const prevResponse = await getByID(indexId)

        if (prevResponse.items?.filter(item => item.itemName === values.itemName).length > 0) {
            setValue('itemName', '')
            return
        }
        await update({
            id: indexId,
            ...prevResponse,
            items: [...prevResponse.items, updatedValues]
        })
        setValue("itemName", '')
        setValue("description", '')
        setValue("gst", '')
        setValue("hsnCode", '')
        setValue("lowStock", '')
        setValue("openingStock", '')
        setValue("purchasePrice", '')
        setValue("sellingPrice", '')
        setValue("unit", '')
        setValue("taxExempted", '')
    };
    
    return (
        <div className="flex dir-col g-1rem">
            <h4>Add Item</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field required">
                    <label htmlFor="itemName">
                        Item name
                    </label>
                    <input 
                        className="input"
                        type="text" 
                        id="itemName"
                        {...register("itemName", { minLength: 1, required: 'Item name is required' })}
                    />
                    {
                        errors.itemName
                            ? <ErrorMessage message={errors.itemName.message} />
                            : null
                    }
                </div>
                <div className="flex ai-top g-1rem">
                    <div className="field flex-1 required">
                        <label htmlFor="sellingPrice">
                            Selling Price
                        </label>
                        <PriceInput 
                            className="input"
                            type="number" 
                            id="sellingPrice"
                            {...register("sellingPrice", { required: "Selling price is required" })}
                        />
                        {
                            errors.sellingPrice
                                ? <ErrorMessage message={errors.sellingPrice.message} />
                                : null
                        }
                    </div>
                    <div className="field flex-1 required">
                        <label htmlFor="purchasePrice">Purchase Price</label>
                        <PriceInput 
                            className="input"
                            type="number" 
                            id="purchasePrice"
                            {...register("purchasePrice")}
                        />
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="unit">
                        Units
                    </label>
                    <select 
                        className="select"
                        id="unit"
                        {...register("unit")}
                    >
                        <option value="pcs">Pieces(PCS)</option>
                        <option value="box">Box</option>
                        <option value="kg">Kilogram(Kg)</option>
                        <option value="g">Gram(g)</option>
                        <option value="m">Meter(M)</option>
                        <option value="l">Liter(L)</option>
                    </select>
                </div>
                <div className="flex ai-top g-1rem">
                    <div className="field flex-1 required">
                        <label htmlFor="openingStock">
                            Opening Stock
                        </label>
                        <input 
                            className="input"
                            type="number" 
                            id="openingStock"
                            {...register("openingStock")}
                        />
                    </div>
                    <div className="field flex-1">
                        <label htmlFor="lowStock">
                            Low Stock
                        </label>
                        <input 
                            className="input"
                            type="number" 
                            id="lowStock"
                            {...register("lowStock")}
                        />
                    </div>
                </div>
                <div className="field block">
                    <Switch label="Tax Exempted" {...register("taxExempted")} />
                </div>
                <div className="flex ai-top g-1rem">
                    <div className="field flex-1">
                        <label htmlFor="hsnCode">
                            HSN Code
                        </label>
                        <input 
                            className="input"
                            type="text" 
                            id="hsnCode"
                            {...register("hsnCode", { required: 'Hsn Code is required'})}
                        />
                        {
                            errors.hsnCode
                                ? <ErrorMessage message={errors.hsnCode.message} />
                                : null
                        }
                    </div>
                    <div className="field flex-1">
                        <label htmlFor="gst">
                            GST %
                        </label>
                        <select 
                            className="select"
                            id="gst"
                            {...register("gst")}
                        >
                            <option value="0.00">GST @ 0%</option>
                            <option value="0.10">GST @ 0.1%</option>
                            <option value="0.25">GST @ 0.25%</option>
                            <option value="3.00">GST @ 3%</option>
                            <option value="5.00">GST @ 5%</option>
                            <option value="6.00">GST @ 6%</option>
                            <option value="7.50">GST @ 7.5%</option>
                            <option value="12.00">GST @ 12%</option>
                            <option value="18.00">GST @ 18%</option>
                            <option value="28.00">GST @ 28%</option>
                    </select>
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        id="description"
                        {...register("description")}
                    ></textarea>
                    {
                        errors.description
                            ? <ErrorMessage message={errors.description.message} />
                            : null
                    }
                </div>
                <button 
                    className="button block-button is-small is-primary"
                >
                    Add Item
                </button>
            </form>
        </div>
    )
}