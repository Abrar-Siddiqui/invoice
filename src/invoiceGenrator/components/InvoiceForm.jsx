import React, { useState } from "react";
import { uid } from "uid";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import incrementString from "../helpers/incrementString";
const date = new Date();
const today = date.toLocaleDateString("en-GB", {
  month: "numeric",
  day: "numeric",
  year: "numeric",
});

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState("");
  const [tax, setTax] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [cashierName, setCashierName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [items, setItems] = useState([
    {
      id: uid(6),
      name: "",
      qty: 1,
      price: "1.00",
    },
  ]);
  // ------------------Company Details--------------------------
  const [cname, setCname] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [fax, setFax] = useState("");

  const [gstin, setGstin] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [statecode, setStatecode] = useState("");
  const [bankname, setBankName] = useState("");
  const [accounttype, setAccounttype] = useState("");
  const [bankifsc, setBankifsc] = useState("");
  const [accountnumber, setAccountnumber] = useState("");
  const [type, setType] = useState("");

  const reviewInvoiceHandler = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const addNextInvoiceHandler = () => {
    setInvoiceNumber((prevNumber) => incrementString(prevNumber));
    setItems([
      {
        id: uid(6),
        name: "",
        qty: 1,
        price: "1.00",
      },
    ]);
  };

  const addItemHandler = () => {
    const id = uid(6);
    setItems((prevItem) => [
      ...prevItem,
      {
        id: id,
        name: "",
        qty: 1,
        price: "1.00",
      },
    ]);
  };

  const deleteItemHandler = (id) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  };

  const edtiItemHandler = (event) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const newItems = items.map((items) => {
      for (const key in items) {
        if (key === editedItem.name && items.id === editedItem.id) {
          items[key] = editedItem.value;
        }
      }
      return items;
    });

    setItems(newItems);
  };
  console.log("type", type);
  const subtotal = items.reduce((prev, curr) => {
    if (curr.name.trim().length > 0)
      return prev + Number(curr.price * Math.floor(curr.qty));
    else return prev;
  }, 0);
  const taxRate = (tax * subtotal) / 100;
  const discountRate = (discount * subtotal) / 100;
  const total = subtotal - discountRate + taxRate;
  return (
    <form
      className="relative flex flex-col px-2 md:flex-row"
      onSubmit={reviewInvoiceHandler}
    >
      <div className="my-1 flex-1 space-y-2 rounded-md  bg-slate-200 p-2 shadow-sm sm:space-y-4 md:w-[60%] md:p-2">
        <div className="flex flex-col justify-between space-y-2 border-b border-gray-900/10 p-4 pb-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex space-x-2">
            <span className="font-bold">Current Date: </span>
            <span>{today}</span>
          </div>
          <div className="flex items-center space-x-2">
            <label className="font-bold" htmlFor="invoiceNumber">
              Invoice Number:
            </label>
            <input
              required
              // className="max-w-[130px]"
              className="form-input flex-1 rounded-sm border-none px-2 py-[2px] text-sm shadow-sm shadow-black"
              type="number"
              name="invoiceNumber"
              id="invoiceNumber"
              min="1"
              step="1"
              value={invoiceNumber}
              onChange={(event) => setInvoiceNumber(event.target.value)}
            />
          </div>
        </div>
        <h1 className="text-center text-lg font-bold">INVOICE</h1>
        {selectedImage && (
          <div>
            <img
              alt="not found"
              className="h-[55px] w-[55px] rounded-full"
              src={URL.createObjectURL(selectedImage)}
            />
            <br />
            <button onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )}
        <h1 className="mx-4 text-lg">Saller Details</h1>
        <div className="mx-auto px-4 md:flex">
          <div className="md:flex-cols mx-auto w-full items-center justify-between md:flex">
            {/* <div lassName="grid-flow-rows  grid grid-cols-2 ">
             
            </div> */}
            {/* ------------------Company Detail form ---------------------- */}
            <div className="flex flex-wrap gap-2">
              <div className="mx-0 ">
                <input
                  // className="form-input  flex-1 rounded-sm border-none px-0 py-[2px] text-sm"
                  className="form-input flex-1 rounded-sm border-none px-0 py-[1px] text-sm shadow-sm shadow-black"
                  required
                  type="file"
                  name="myImage"
                  onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                  }}
                />
              </div>

              <div className="my-0">
                <input
                  required
                  className="form-input flex-1 rounded-sm border-none px-2 py-[4px] text-sm shadow-sm shadow-black"
                  placeholder="Cashier name"
                  type="text"
                  name="cashierName"
                  id="cashierName"
                  value={cashierName}
                  onChange={(event) => setCashierName(event.target.value)}
                />
              </div>

              <div className="my-0">
                <input
                  required
                  className="form-input flex-1 rounded-sm border-none px-2 py-[4px] text-sm shadow-sm shadow-black"
                  placeholder="Customer name"
                  type="text"
                  name="customerName"
                  id="customerName"
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                />
              </div>
              <div className="my-0">
                <input
                  required
                  className="form-input flex-1 rounded-sm border-none px-2 py-[4px] text-sm shadow-sm shadow-black"
                  placeholder="GSTIN No"
                  type="text"
                  name="gstin"
                  id="gstin"
                  value={gstin}
                  onChange={(event) => setGstin(event.target.value)}
                />
              </div>
              <div className="my-0">
                <input
                  required
                  className="form-input flex-1 rounded-sm border-none px-2 py-[4px] text-sm shadow-sm shadow-black"
                  placeholder="Company Name"
                  type="text"
                  name="companyName"
                  id="companyName"
                  value={cname}
                  onChange={(event) => setCname(event.target.value)}
                />
              </div>
              <div className="my-0">
                <input
                  required
                  className="form-input flex-1 rounded-sm border-none px-2 py-[4px] text-sm shadow-sm shadow-black"
                  placeholder="Telephone No."
                  type="tel"
                  name="telephoneName"
                  id="telephoneName"
                  value={tel}
                  onChange={(event) => setTel(event.target.value)}
                />
              </div>

              <div className="my-0">
                <input
                  required
                  className="form-input flex-1 rounded-sm border-none px-2 py-[4px] text-sm shadow-sm shadow-black"
                  placeholder="E-mail "
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="my-0">
                <input
                  required
                  className="form-input flex-1 rounded-sm border-none px-2 py-[4px] text-sm shadow-sm shadow-black"
                  placeholder="Fax Number"
                  type="number"
                  name="faxnumber"
                  id="faxnumber"
                  value={fax}
                  onChange={(event) => setFax(event.target.value)}
                />
              </div>
              <div className="my-0">
                <input
                  required
                  className="form-input flex-1 rounded-sm border-none px-2 py-[4px] text-sm shadow-sm shadow-black"
                  placeholder="Address"
                  type="text"
                  name="address"
                  id="address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                />
              </div>
              <div className="my-0">
                <input
                  required
                  className="form-input flex-1 rounded-sm border-none px-2 py-[4px] text-sm shadow-sm shadow-black"
                  placeholder="State"
                  type="text"
                  name="state"
                  id="state"
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                />
              </div>
              <div className="my-0">
                <input
                  required
                  className="form-input flex-1 rounded-sm border-none px-2 py-[4px] text-sm shadow-sm shadow-black"
                  placeholder="State Code"
                  type="text"
                  name="statecode"
                  id="statecode"
                  value={statecode}
                  onChange={(event) => setStatecode(event.target.value)}
                />
              </div>

              <div>
                <select
                  variant="standard"
                  className="orm-input flex-1 rounded-sm border-none px-7 py-[4px] text-sm shadow-sm shadow-black"
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>--Type Selected--</option>
                  <option>Sales</option>
                  <option>Purchases</option>
                </select>
              </div>
            </div>

            <div>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      // className="w-full rounded-r-none bg-white shadow-sm"
                      className="form-input flex-1 rounded-sm border-none px-2 py-[2px] text-sm shadow-sm shadow-black"
                      type="number"
                      name="tax"
                      id="tax"
                      min="0.01"
                      step="0.01"
                      placeholder="Tax rate : 0.0"
                      value={tax}
                      onChange={(event) => setTax(event.target.value)}
                    />
                    <span className="rounded-r-sm bg-gray-200 px-4 py-[2px] text-sm font-bold text-black shadow-sm shadow-black">
                      %
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      // className="w-full rounded-r-none bg-white shadow-sm"
                      className="form-input flex-1 rounded-sm border-none px-2 py-[2px] text-sm shadow-sm shadow-black"
                      type="number"
                      name="discount"
                      id="discount"
                      min="0"
                      step="0.01"
                      placeholder="Discount rate : 0.0"
                      value={discount}
                      onChange={(event) => setDiscount(event.target.value)}
                    />
                    <span className="rounded-r-sm bg-gray-200 px-4 py-[2px] text-sm font-bold text-black shadow-sm shadow-black">
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-4 w-[50%] ">
          <table className="w-[50%] p-5 text-left">
            <thead>
              <tr className=" border-b border-gray-900/10 text-sm md:text-base">
                <th>ITEM</th>
                <th>HSN Code</th>
                <th>QTY</th>
                <th className="text-center">PRICE</th>
                <th className="text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <InvoiceItem
                  key={item.id}
                  id={item.id}
                  hsncode={item.hsncode}
                  name={item.name}
                  qty={item.qty}
                  price={item.price}
                  onDeleteItem={deleteItemHandler}
                  onEdtiItem={edtiItemHandler}
                />
              ))}
            </tbody>
          </table>

          <button
            className="mx-3 rounded-md bg-blue-500 px-2 py-[3px] text-sm text-white shadow-sm hover:bg-blue-600"
            type="button"
            onClick={addItemHandler}
          >
            Add Item
          </button>
        </div>

        <div className="mx-auto items-center justify-between px-4 md:flex ">
          <div>
            <p className="text-bold text-lg ">Billing Address</p>
            <div className="flex flex-wrap gap-2 ">
              <div className="my-1">
                <input
                  required
                  type="text"
                  placeholder="GSTIN"
                  className="form-input flex-1 rounded-sm border-none px-2 py-[2px] text-sm shadow-sm shadow-black"
                />
              </div>
              <div className="my-1">
                <input
                  required
                  type="text"
                  placeholder="Name "
                  className="form-input flex-1 rounded-sm border-none px-2 py-[2px] text-sm shadow-sm shadow-black"
                />
              </div>
              <div className="my-1">
                <input
                  required
                  type="tel"
                  placeholder="Phone No. "
                  className="form-input flex-1 rounded-sm border-none px-2 py-[2px] text-sm shadow-sm shadow-black"
                />
              </div>
              <div className="my-1">
                <input
                  required
                  type="text"
                  placeholder="State Name "
                  className="form-input flex-1 rounded-sm border-none px-2 py-[2px] text-sm shadow-sm shadow-black"
                />
              </div>
              <div className="my-1">
                <input
                  required
                  type="text"
                  placeholder="State Code"
                  className="form-input flex-1 rounded-sm border-none px-2 py-[2px] text-sm shadow-sm shadow-black"
                />
              </div>

              <div className="my-1">
                <input
                  required
                  type="text"
                  placeholder="Address"
                  className="form-input flex-1 rounded-sm border-none px-2 py-[2px] text-sm shadow-sm shadow-black"
                />
              </div>
            </div>
          </div>
          <div>
            <p className="text-bold">Bank Details</p>
            <div className="flex flex-wrap gap-2 ">
              <div className="my-1">
                <input
                  required
                  type="text"
                  placeholder="Bank Name "
                  className="form-input flex-1 rounded-sm border-none px-2 py-[2px] text-sm shadow-sm shadow-black"
                />
              </div>
              <div className="my-1">
                <input
                  required
                  type="text"
                  placeholder="Account Type "
                  className="form-input flex-1 rounded-sm border-none px-2 py-[2px] text-sm shadow-sm shadow-black"
                />
              </div>
              <div className="my-1">
                <input
                  required
                  type="number"
                  placeholder="Account No."
                  className="form-input flex-1 rounded-sm border-none px-2 py-[2px] text-sm shadow-sm shadow-black"
                />
              </div>
              <div className="my-1">
                <input
                  required
                  type="text"
                  placeholder="Bank Ifsc No."
                  className="form-input flex-1 rounded-sm border-none px-2 py-[2px] text-sm shadow-sm shadow-black"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1 px-4 pt-6">
            <div className="flex w-full justify-between gap-2 ">
              <span className="font-bold">Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex w-full justify-between gap-2">
              <span className="font-bold">Dis:</span>
              <span>
                ({discount || "0"}%)₹ {discountRate.toFixed(2)}
              </span>
            </div>
            <div className="flex w-full justify-between">
              <span className="font-bold">Tax:</span>
              <span>
                ({tax || "0"}%)₹ {taxRate.toFixed(2)}
              </span>
            </div>
            <div className="flex w-full justify-between border-t border-gray-900/10 pt-2">
              <span className="font-bold">Total:</span>
              <span className="font-bold">
                ₹{total % 1 === 0 ? total : total.toFixed(2)}
              </span>
            </div>
            <div>
              <div className="w-[30%] basis-1/4 bg-transparent">
                <div className="sticky top-0 z-10 space-y-4 divide-y divide-gray-900/10 pb-8 md:pl-4 md:pt-6">
                  <InvoiceModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    invoiceInfo={{
                      invoiceNumber,
                      cashierName,
                      customerName,
                      subtotal,
                      taxRate,
                      discountRate,
                      total,
                      selectedImage,
                    }}
                    items={items}
                    onAddNextInvoice={addNextInvoiceHandler}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="w-full rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
          type="submit"
        >
          Review Invoice
        </button>
      </div>
    </form>
  );
};

export default InvoiceForm;
