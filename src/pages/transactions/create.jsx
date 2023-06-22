import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom"
import ErrorMessage from "../../components/ErrorMessage.jsx";
import DropDownInput from "../../components/Form/DropDownInput.jsx";
import Spinner from "../../components/Spinner.jsx";
import SuccessMessage from "../../components/SuccessMessage.jsx";
import useAuth from "../../hooks/useAuth.js";
import useDebouncedCallback from "../../hooks/useDebouncedCallback.js";
import { GSTIN_RGX } from "../../lib/validation.js";
import uuid from "react-uuid"
import { useIndexedDB } from "react-indexed-db"
import AddIcon from "../../components/Icons/AddIcon.jsx";
import CloseIcon from "../../components/Icons/CloseIcon"

const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry"
];

const customers = [
    { id: 1, name: 'Harsh' },
    { id: 2, name: 'Aman' },
    { id: 3, name: 'Rohit' },
    { id: 4, name: 'Kamal' },
    { id: 5, name: 'Rahul' },
    { id: 6, name: 'Vinod' },
    { id: 7, name: 'Kavi' },
    { id: 8, name: 'Ramesh' },
];

const ENDPOINT = `https://mom.itaxeasy.com/api/gsp/search/gstin`;


export default function CreateInvoice() {

    const { invoiceType } = useParams();
    const { token } = useAuth()
    const [loadingCustomers, setLoadingCustomers] = useState(false);
    const [customerList, setCustomerList] = useState([]);
    const invoiceName = invoiceType === 'sale' ? 'Sale' : 'Purchase';
    const { register, formState: { errors }, handleSubmit, setValue, watch, getValues } = useForm();
    const [error, setError] = useState('');
    const [details, setDetails] = useState(null);
    const gstin = watch('gstin');
    const [fetchingDetails, setFetchingDetails] = useState(false);
    const [modalOpen, setModalOpen] = useState(false)
    // const [data, setData] = useState()
    const [selectedItem, setSelectedItem] = useState([])



    const handlePartySelect = partyId => {
        console.log(partyId);
    };

    const fetchPartyInput = value => {
        setCustomerList(customers.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase())));
        setLoadingCustomers(false);
    };

    const debouncedFetchPartyInput = useDebouncedCallback(fetchPartyInput, 500);
    const debouncedFetchGSTDetails = useDebouncedCallback(async () => {
        try {
            setError('');

            const response = await fetch(`${ENDPOINT}?gstin=${gstin}`, {
                headers: new Headers({
                    'Authorization': `Bearer ${token}`,
                })
            });

            const { data, message } = await response.json();

            if (!response.ok) {
                throw new Error(message);
            }

            setDetails(data);

            setValue("name", data.lgnm);
            setValue("address", Object.values(data.pradr.addr).join(' '));
        } catch (e) {
            console.error(e);
            setError(e.message);
        } finally {
            setFetchingDetails(false);
        }
    }, 400);

    useEffect(() => {

        // const { indexId } = JSON.parse(localStorage.getItem("authUser"))
        // const { getByID } = useIndexedDB('userData')
        // getByID(indexId).then(userFromDB => {
        //     setData(userFromDB);
        // });

        setCustomerList(customers.map(({ id, name }) => ({ id, text: name })));
        if (!gstin) {
            return;
        }

        setFetchingDetails(true);

        debouncedFetchGSTDetails();
    }, [gstin]);

    const handlePartyInput = value => {
        setLoadingCustomers(true);
        debouncedFetchPartyInput(value);
    };

    const [form, setform] = useState([{
        "serial_no": "",
        "seller_address": "",
        "from_no": "",
        "tax_invoice": "",
        "party_id": "",
        "name": "",
        "party_address": "",
        "mobile": "",
        "email_id": "",
        "invoice_no": "",
        "date": "",
        "goods": "",
        "hsn_code": "",
        "quantity": "",
        "rate": "",
        "ammount": ""
    }])


    const onSubmit = async () => {
        try {

            const values = getValues()
            const updatedValues = { ...values, id: uuid(), type: invoiceType, dateCreated: new Date(),selectedItem:selectedItem }
            console.log(updatedValues)
            const { update, getByID } = useIndexedDB('userData')
            const { indexId } = JSON.parse(localStorage.getItem("authUser"))
            const prevResponse = await getByID(indexId)

            await update({
                id: indexId,
                ...prevResponse,
                [invoiceType]: [...prevResponse[invoiceType], updatedValues],
                recent: [...prevResponse.recent, updatedValues]
            })
            setValue("name", '')
            setValue("invoiceNumber", '')
            setValue("invoiceDate", '')
            setValue("phone", '')
            setValue("gstin", '')
            setValue("address", '')
            setValue("statOfSupply", '')
            // setValue("ownGstin", '')
            setValue("goods", '')
            setValue("hsnCode", '')
            setValue("quantity", '')
            setValue("rate", '')
            setValue("amount", '')

            setSelectedItem([])

        } catch (e) {
            console.error(e);
            setError(e.message);
        } finally {

        }
    };


    return (
        <div className="flex dir-col g-1rem">
            <h4>Create {invoiceName}</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="cards">
                    <div className="card">
                        <h3 className="section-title p-0">Party Details</h3>
                        <div className="field required">
                            <label htmlFor="name">Party Name</label>
                            <DropDownInput
                                className="input"
                                id="name"
                                onSelect={handlePartySelect}
                                setValue={value => setValue('name', value)}
                                isLoading={loadingCustomers}
                                onInputChange={handlePartyInput}
                                list={customerList}
                                {...register("name", { required: "Party name is required" })}
                            />
                        </div>
                        <div className="field required">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="text" className="input" id="phone" name="phone"
                                {...register("phone", { required: "Party Phone number is required" })}
                            />
                            {
                                errors.phone
                                    ? <ErrorMessage message={errors.phone.message} />
                                    : null
                            }
                        </div>
                        <div className="field optional">
                            <label htmlFor="gstin">GSTIN</label>
                            <input type="text" className="input text-uppercase" id="gstin" name="gstin"
                                {...register("gstin", {
                                    pattern: {
                                        value: GSTIN_RGX,
                                        message: "Invalid GSTIN"
                                    }
                                })} />
                            {
                                fetchingDetails
                                    ? (
                                        <div className="flex ai-center g-0_5rem text-primary">
                                            <Spinner />
                                            Verifying
                                        </div>
                                    )
                                    : (
                                        error
                                            ? <ErrorMessage message={error} />
                                            : details
                                                ? <SuccessMessage message="GSTIN Verified." />
                                                : null
                                    )
                            }
                        </div>
                        <div className="field required">
                            <label htmlFor="address">Address</label>
                            <textarea id="address" name="address"
                                {...register("address", { required: "Party address is required" })}
                            ></textarea>
                            {
                                errors.address
                                    ? <ErrorMessage message={errors.address.message} />
                                    : null
                            }
                        </div>
                    </div>
                    <div className="card">
                        <h3 className="section-title p-0">{invoiceName} Details</h3>
                        <div className="field required">
                            <label htmlFor="invoiceNumber">Invoice Number</label>
                            <input type="text" className="input" id="invoiceNumber" name="invoiceNumber"
                                {...register("invoiceNumber", { required: "Invoice number is required" })}
                            />
                            {
                                errors.invoiceNumber
                                    ? <ErrorMessage message={errors.invoiceNumber.message} />
                                    : null
                            }
                        </div>
                        <div className="field required">
                            <label htmlFor="invoiceDate">Invoice Date</label>
                            <input type="date" className="input" id="invoiceDate" name="invoiceDate"
                                {...register("invoiceDate", { required: "Invoice Date is required" })}
                            />
                            {
                                errors.invoiceDate
                                    ? <ErrorMessage message={errors.invoiceDate.message} />
                                    : null
                            }
                        </div>
                        {/* <div className="field required">
                            <label htmlFor="ownGstin">Your GSTIN</label>
                            <input type="text" className="input text-uppercase" id="ownGstin" name="ownGstin"
                                {...register("ownGstin", { required: "Your GSTIN is required" })}
                            />
                        </div> */}
                        <div className="field required">
                            <label htmlFor="stateOfSupply">State of Supply</label>
                            <select className="select" id="stateOfSupply" name="stateOfSupply"
                                {...register("stateOfSupply", { required: "State is required" })}
                            >
                                {
                                    states.map(state => {
                                        return <option value={state} key={state}>{state}</option>
                                    })
                                }
                            </select>
                            {
                                errors.stateOfSupply
                                    ? <ErrorMessage message={errors.stateOfSupply.message} />
                                    : null
                            }
                        </div>
                    </div>

                    <div className="card full-size">
                        <h3 className="section-title p-0">Items on the {invoiceName}</h3>
                        {selectedItem && selectedItem.length >= 1 && <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Item Name</th>
                                        <th>HSN Code</th>
                                        <th>Quantity</th>
                                        <th>Rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        selectedItem.map((item,i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{item.itemName}</td>
                                                    <td>{item.hsnCode}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.rate}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>}
                    </div>
                    <button
                        onClick={() => setModalOpen(true)}
                        type="button"
                        className="button is-primary is-small has-icon w-max-content"
                    >
                        <AddIcon />
                        Add Item
                    </button>
                    <button
                    type="submit"
                        className="button block-button is-small is-primary"
                    >
                        Create
                    </button>
                </div>
            </form>
            <div className={`modal${modalOpen ? ' open' : ''}`}>
                <div className="modal-box">
                    <h4>Add Item</h4>
                    <form onSubmit={(e)=>e.preventDefault()}>
                        <div className="field required">
                            <label htmlFor="itemName" className="label">Item Name</label>
                            <input
                                type="text"
                                className="input"
                                id='itemName'
                                {...register("itemName")}
                            />
                            {
                                errors.itemName
                                    ? <ErrorMessage message={errors.itemName.message} />
                                    : null
                            }
                            {/* <DropDownInput
                            list={
                                data && data.items.length >= 1 ?
                                    data.items.map((item, i) => { return { text: `${item.itemName}`, id: i } }) : []
                            }
                            id="itemName"
                        /> */}
                        </div>
                        <div className="field required">
                            <label htmlFor="hsnCode" className="label">HSN Code</label>
                            <input type="text" id='hsnCode' className="input" {...register("hsnCode")} />
                            {
                                errors.hsnCode
                                    ? <ErrorMessage message={errors.hsnCode.message} />
                                    : null
                            }
                        </div>
                        <div className="flex g-1rem">
                            <div className="field flex-1 required">
                                <label htmlFor="quantity" className="label">Quantity</label>
                                <input type="text" id="quantity" className="input" {...register("quantity")} />
                            </div>
                            <div className="field flex-1">
                                <label htmlFor="unit" className="label">Unit</label>
                                <select name="unit" id="unit" className="select">
                                    <option value="pcs">Pieces(PCS)</option>
                                    <option value="box">Box</option>
                                    <option value="kg">Kilogram(Kg)</option>
                                    <option value="g">Gram(g)</option>
                                    <option value="m">Meter(M)</option>
                                    <option value="l">Liter(L)</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex g-1rem">
                            <div className="field flex-1 required">
                                <label htmlFor="rate" className="label" >Rate</label>
                                <input type="text" id='rate' className="input" {...register("rate")} />
                                {
                                    errors.rate
                                        ? <ErrorMessage message={errors.rate.message} />
                                        : null
                                }
                            </div>
                            <div className="field flex-1 required">
                                <label htmlFor="amount" className="label" >Amount</label>
                                <input type="text" id='amount' className="input" {...register("amount")} />
                                {
                                    errors.amount
                                        ? <ErrorMessage message={errors.amount.message} />
                                        : null
                                }
                            </div>
                        </div>
                        <div className="flex g-1rem">
                            <div className="field flex-1">
                                <label htmlFor="discount" className="label">Discount</label>
                                <input type="text" className="input" {...register("discount")} />
                            </div>
                            <div className="field flex-1">
                                <label htmlFor="discountPerUnit" className="label">Discount Per Unit</label>
                                <input type="text" className="input"  {...register("discountPerUnit")} />
                            </div>
                        </div>
                        <div className="field required">
                            <label htmlFor="gst">GST %</label>
                            <select className="select" name="gst" id='gst' {...register("gst")}>
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
                            {
                                errors.gst
                                    ? <ErrorMessage message={errors.gst.message} />
                                    : null
                            }
                        </div>
                        <div className="flex g-1rem jc-end">
                            <button
                                type="submit"
                                className="button is-primary is-small w-max-content"
                                onClick={() => {
                                    const itemName = getValues('itemName')
                                    const hsnCode = getValues('hsnCode')
                                    const rate = getValues('rate')
                                    const discount = getValues('discount')
                                    const discountPerUnit = getValues('discountPerUnit')
                                    const quantity = getValues('quantity')
                                    const unit = getValues('unit')
                                    const gst = getValues('gst')
                                    const amount = getValues('amount')

                                    setSelectedItem(
                                        prev => prev.filter(item => item.hsnCode === hsnCode).length > 0 ? [...prev] :
                                            [...prev, { itemName, rate, amount, gst, discount, discountPerUnit, hsnCode, quantity, unit }]
                                    )
                                    setValue('itemName', '')
                                    setValue('hsnCode', '')
                                    setValue('rate', '')
                                    setValue('discount', '')
                                    setValue('discountPerUnit', '')
                                    setValue('quantity', '')
                                    setValue('unit', '')
                                    setValue('gst', '')
                                    setValue('amount', '')

                                    setModalOpen(false)
                                }}
                            >
                                Add Item
                            </button>
                            <button onClick={() => setModalOpen(false)} className="button is-danger-fg is-small w-max-content">
                                <CloseIcon />
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}