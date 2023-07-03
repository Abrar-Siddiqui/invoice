import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

const date = new Date();
const today = date.toLocaleDateString("en-GB", {
  month: "numeric",
  day: "numeric",
  year: "numeric",
});

const InvoiceModal = ({
  isOpen,
  setIsOpen,
  invoiceInfo,
  items,
  onAddNextInvoice,
}) => {
  function closeModal() {
    setIsOpen(false);
  }

  const addNextInvoiceHandler = () => {
    setIsOpen(false);
    onAddNextInvoice();
  };

  const SaveAsPDFHandler = () => {
    const dom = document.getElementById("print");
    toPng(dom)
      .then((dataUrl) => {
        const img = new Image();
        img.crossOrigin = "annoymous";
        img.src = dataUrl;
        img.onload = () => {
          // Initialize the PDF.
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "in",
            format: [4.5, 5.5],
          });

          // Define reused data
          const imgProps = pdf.getImageProperties(img);
          const imageType = imgProps.fileType;
          const pdfWidth = pdf.internal.pageSize.getWidth();

          // Calculate the number of pages.
          const pxFullHeight = imgProps.height;
          const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
          const nPages = Math.ceil(pxFullHeight / pxPageHeight);

          // Define pageHeight separately so it can be trimmed on the final page.
          let pageHeight = pdf.internal.pageSize.getHeight();

          // Create a one-page canvas to split up the full image.
          const pageCanvas = document.createElement("canvas");
          const pageCtx = pageCanvas.getContext("2d");
          pageCanvas.width = imgProps.width;
          pageCanvas.height = pxPageHeight;

          for (let page = 0; page < nPages; page++) {
            // Trim the final page to reduce file size.
            if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
              pageCanvas.height = pxFullHeight % pxPageHeight;
              pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
            }
            // Display the page.
            const w = pageCanvas.width;
            const h = pageCanvas.height;
            pageCtx.fillStyle = "white";
            pageCtx.fillRect(0, 0, w, h);
            pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

            // Add the page to the PDF.
            if (page) pdf.addPage();

            const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
            pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
          }
          // Output / Save
          pdf.save(`invoice-${invoiceInfo.invoiceNumber}.pdf`);
        };
      })
      .catch((error) => {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10  overflow-y-auto"
        onClose={closeModal}
      >
        <div className=" mx-0 px-1 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-4 inline-block w-full  max-w-xl border-separate border-spacing-2 transform  overflow-hidden rounded-sm border-2 border-solid border-black bg-white text-left align-middle shadow-xl transition-all">
              <div className="p-0" id="print">
                <div className="mx-auto flex items-center justify-between bg-black px-2 py-2 ">
                  {invoiceInfo.selectedImage && (
                    <div className="flex items-center">
                      <img
                        alt="not found"
                        className="h-[55px] w-[55px] rounded-full"
                        src={URL.createObjectURL(invoiceInfo.selectedImage)}
                      />
                    </div>
                  )}

                  <span className="text-justify text-white">
                    <h1 className="text-lg font-bold text-white">
                      TAX INVOICE
                    </h1>
                    <span className="text-sm font-normal"> Date : </span>
                    <span className="text-sm font-normal "> {today}</span>
                    <br />
                    <span className="text-sm font-normal"> Number : </span>
                    <span className="text-sm font-normal">
                      {invoiceInfo.invoiceNumber}
                    </span>
                  </span>
                </div>
                <div className="mt-6 px-4">
                  <div className="flex items-center justify-between">
                    {/* <div className="border-1 w-[40%] border-solid border-black px-2 py-0 text-sm">
                      <span>Cashier: {invoiceInfo.cashierName}</span> <br />
                      <span>Customer: {invoiceInfo.customerName}</span> <br />
                    </div> */}
                    <div className="border-1 w-[45%] border-solid border-black px-2 py-0">
                      <div className="border-[1px] border-solid border-black text-sm ">
                        <h2 className="bg-black px-0 text-center text-sm text-white">
                          Company Details
                        </h2>
                        <div className="px-2">
                          <span>Company Name : </span> <br />
                          <span>Telephone :</span> <br />
                          <span>Company Address : </span> <br />
                          <span>Fax : </span> <br />
                          <span>E-mail : </span> <br />
                          <span>GSTIN : </span>
                          <br />
                          <span>Address : </span>
                        </div>
                      </div>
                    </div>
                    <div className="border-1 w-[45%] border-solid border-black px-2 py-0">
                      <div className="border-[1px] border-solid border-black  text-sm ">
                        <h2 className="bg-black px-0 text-center text-sm text-white">
                          Billing Address
                        </h2>
                        <div className="px-2">
                          <span>Name : </span> <br />
                          <span>Phone No :</span> <br />
                          <span>State Name : </span> <br />
                          <span>State Code : </span>
                          <br />
                          <span>Address : </span>
                          <br />
                          <span>GSTIN : </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <table className="mx-auto mt-2 w-full border-[1px] border-black text-left">
                    <thead className="border-[2px] border-black">
                      <tr className="border-y border-black/10 text-sm md:text-base">
                        <th>ITEM</th>
                        <th className="text-center">QTY</th>
                        <th className="text-right">PRICE</th>
                        <th className="text-right">AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td className="w-full">{item.name}</td>
                          <td className="min-w-[50px] text-center">
                            {item.qty}
                          </td>
                          <td className="min-w-[80px] text-right">
                            ₹{Number(item.price).toFixed(2)}
                          </td>
                          <td className="min-w-[90px] text-right">
                            ₹{Number(item.price * item.qty).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mx-auto flex items-center justify-between">
                    <div className="border-1 w-[45%] border-solid border-black px-2 py-0">
                      <div className="border-[1px] border-solid border-black text-sm ">
                        <h2 className="bg-black px-0 text-center text-sm text-white">
                          Bank Details
                        </h2>
                        <div className="px-2">
                          <span>Bank Name : </span> <br />
                          <span>Account Type :</span>
                          <span>Account No : XXXXXXXXX-1213</span> <br />
                          <span>IFSC Code : </span> <br />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col items-end space-y-1">
                      <div className="flex w-full justify-between gap-2 border-t border-black/10 pt-2">
                        <span className="font-bold">Subtotal:</span>
                        <span>₹{invoiceInfo.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex w-full justify-between">
                        <span className="font-bold">Discount:</span>
                        <span>₹{invoiceInfo.discountRate.toFixed(2)}</span>
                      </div>
                      <div className="flex w-full justify-between">
                        <span className="font-bold">Tax:</span>
                        <span>₹{invoiceInfo.taxRate.toFixed(2)}</span>
                      </div>
                      <div className="flex w-full justify-between border-t border-black/10 py-2">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold">
                          ₹
                          {invoiceInfo.total % 1 === 0
                            ? invoiceInfo.total
                            : invoiceInfo.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="my-2 border-[1px] border-black">
                    <h1 className="bg-black text-center text-lg font-normal text-white">
                      Invoice Status
                    </h1>
                    <div className="px-2 text-sm">
                      <p>Payment Status : </p>
                      <p>Invoice Due Date : </p>
                      <p>Payment Date : </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex space-x-2 px-4 pb-6">
                <button
                  className="flex w-full items-center justify-center space-x-1 rounded-md border border-blue-500 py-2 text-sm text-blue-500 shadow-sm hover:bg-blue-500 hover:text-white"
                  onClick={SaveAsPDFHandler}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Download</span>
                </button>
                <button
                  onClick={addNextInvoiceHandler}
                  className="flex w-full items-center justify-center space-x-1 rounded-md bg-blue-500 py-2 text-sm text-white shadow-sm hover:bg-blue-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>
                  <span>Next</span>
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InvoiceModal;
