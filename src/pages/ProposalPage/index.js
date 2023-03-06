import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import "../../component/Forms/Form.css";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import TableForm from "../../component/ProposalComponents/TableForm";
import { InputTextarea } from "primereact/inputtextarea";
import ReactToPrint from "react-to-print";
import { Select } from "antd";
import Api from "../../Api";
import Header from "../../component/ProposalComponents/Header";
import CustomerDetails from "../../component/ProposalComponents/CustomerDetails";
import QuotationHeading from "../../component/ProposalComponents/quotationHeading";
import Table from "../../component/ProposalComponents/Table";
import DetailsLeft from "../../component/ProposalComponents/DetailsLeft";

export default function Proposalpage() {
  const [discount, setDiscount] = useState("");
  const [note, setNote] = useState("");
  const [terms, setTerms] = useState("");
  const toast = useRef(null);

  const [subheader, setSubheader] = useState("");
  const [productName, setProductName] = useState("");

  console.log("productName@@ :>> ", productName);

  const [quantity, setQuantity] = useState("");
  const [mrp, setMrp] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  console.log("amount@@ :>> ", amount);
  const [list, setList] = useState([]);
  console.log("list@@34 :>> ", list);
  const [subTotal, setTotal] = useState(0);
  console.log("subTotal@@ :>> ", subTotal);
  const [discountvalue, setDiscountValue] = useState("");
  const [afterDiscount, setAfterDiscount] = useState("");
  const [gst, setGst] = useState(0);
  const [shipping, setShipping] = useState("");
  const [grandTotal, setGrandTotal] = useState("");

  const componentRef = useRef();

  const [showProposal, setShowProposal] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  console.log("getvaluessss", getValues());

  const [CustomerName, setCustomerName] = useState("");
  const [customerId, setCustomerSelectName] = useState([]);
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    getCustomer();
  }, []);

  const getCustomer = async () => {
    await Api.get(`addCustomer/getCustomer`).then((res) => {
      setCustomerList(res.data.data);
    });
  };

  const setCustomerData = async (e) => {
    await Api.post(`addCustomer/getoneCustomer`, { id: e }).then((res) => {
      console.log(res.data);
      setValue("customerName", res.data.data?.fullName);
      setValue("customerAddress", res.data.data?.addressWithPincode);
      setValue("gstin", res.data.data?.gstinDetails);
    });
  };

  const [productList, setProductList] = useState([]);
  const [productId, setProductId] = useState([]);
  const { Option } = Select;

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    await Api.get(`addProduct/getProduct`).then((res) => {
      setProductList(res.data.data);
      reset();
    });
  };

  const setProductData = async (e) => {
    await Api.post(`addProduct/getoneProduct`, { id: e }).then((res) => {
      console.log(res.data);
      setProductName(res.data.data.productName);
      setPrice(res.data.data.price);
    });
  };

  // Calculate items amount function
  useEffect(() => {
    const calculateAmount = (amount) => {
      setAmount(quantity * price);
    };

    calculateAmount(amount);
  }, [amount, price, quantity, setAmount]);

  // Calculate total amount of items in table
  useEffect(() => {
    let rows = document.querySelectorAll(".amount");
    let sum = 0;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].className === "amount") {
        sum += isNaN(rows[i].innerHTML) ? 0 : parseInt(rows[i].innerHTML);
      }
    }
    setTotal(sum);
    setValue("subTotal", sum);
  });

  const handleCreateFormSubmit = async () => {
    const createProposalDetails = {
      proposalNumber: getValues().proposalNumber,
      customerId: getValues().customerId,
      customerName: getValues().customerName,
      customerAddress: getValues().customerAddress,
      gstin: getValues().gstin,
      length: getValues().length,
      width: getValues().width,
      depth: getValues().depth,
      purpose: getValues().purpose,
      quotationTitle: getValues().quotationTitle,
      date: getValues().date,
      place: getValues().place,
      subheader: getValues().subheader,
      productId: getValues().productId,
      // productName: getValues().productName,
      quantity: getValues().quantity,
      price: getValues().price,
      amount: getValues().amount,
      // mrp: getValues().mrp,
      subTotal: getValues().subTotal,
      discountvalue: getValues().discountvalue,
      discountType: getValues().discountType,
      afterDiscount: getValues().afterDiscount,
      gst: getValues().gst,
      shipping: getValues().shipping,
      grandTotal: getValues().grandTotal,
      note: getValues().note,
      terms: getValues().terms,
    };
    await Api.post(`addProposal/createProposal`, createProposalDetails).then(
      (res) => {
        console.log("res.data", res.data);
        if (res.status === 200) {
          toast.success("Proposal Created Successfully!");
        }
        reset();
      }
    );
  };
  const onSubmit = (data) => {
    handleCreateFormSubmit();
  };

  const onDiscount = (e, setValue) => {
    console.log(discountvalue);
    setDiscount(e.value);
    if (e.value === "%") {
      const discounts =
        Number(subTotal) - (Number(subTotal) * Number(discountvalue)) / 100;
      setAfterDiscount(discounts);
      setValue("afterDiscount", discounts);
      console.log(setAfterDiscount);
    } else {
      const discounts = subTotal - discountvalue;
      setAfterDiscount(discounts);
      setValue("afterDiscount", discounts);

      console.log(e.value);
    }
  };

  const onGstChange = (e, setValue) => {
    console.log(setGst);
    setGst(e.value);
    setValue("gst", e.value);
    const grandTotals =
      Number(afterDiscount) + (Number(afterDiscount) * Number(gst)) / 100;
    setGrandTotal(grandTotals);
    setValue("grandTotal", grandTotals);
  };

  const onShippingChange = (e) => {
    setShipping(e.value);
    setValue("shipping", e.value);
    const grandTotals = Number(shipping) + grandTotal;
    setGrandTotal(grandTotals);
    setValue("grandTotal", grandTotals);
  };

  const onChangeSubtotal = (e, setValue) => {
    setTotal(e.target.value);
    console.log(setTotal);
    setValue("subTotal", e.value);
  };

  const onProductNameChange = (e, setValue) => {
    setProductName(e.value);
    setValue("productName", e);
  };

  const onQuantityChange = (e) => {
    setQuantity(e.target.value);
    setValue("quantity", e);
  };

  const Discountselect = [
    { label: "%", value: "%" },
    { label: "fixed", value: "fixed" },
  ];

  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className="p-error">{errors[name].message}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };

  return (
    <div>
      <div className="p-5 Form container-fluid">
        {showProposal ? (
          <Card className="surface-0 shadow-2 p-3 border-1 border-50 border-round">
            <div className="pages-title mb-1">Add Proposal</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row className="mt-1">
                <Col lg={4} className="pb-1">
                  <label className="input-title pe-5">Proposal Number</label>
                  <br />
                  <Controller
                    name="proposalNumber"
                    control={control}
                    rules={{ required: "This field is required." }}
                    render={({ field }) => (
                      <InputNumber
                        className="mt-1"
                        style={{
                          width: "95%",
                          borderRadius: "5px",
                          height: "37px",
                        }}
                        id={field.name}
                        ref={field.ref}
                        value={field.value}
                        onBlur={field.onBlur}
                        useGrouping={false}
                        onValueChange={(e) => field.onChange(e)}
                      />
                    )}
                  />
                  <br />
                  {getFormErrorMessage("proposalNumber")}
                </Col>
                <InputText
                  type="hidden"
                  name="customerName"
                  id="customerName"
                  value={CustomerName}
                  {...register("customerName", { required: true })}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    setValue("customerName", e);
                  }}
                />
                <Col lg={4} className="pb-1">
                  <label>Customer Name</label>
                  <br />
                  <Select
                    style={{ width: "95%" }}
                    className="create-select"
                    name="customerId"
                    {...register("customerId", { required: true })}
                    placeholder="Select a CustomerName"
                    onChange={(e) => {
                      setCustomerData(e);
                      setCustomerSelectName(e);
                      setValue("customerId", e);
                    }}
                  >
                    {customerList?.map((list, i) => {
                      return (
                        <Option value={list?._id} key={i}>
                          {list?.fullName}
                        </Option>
                      );
                    })}
                  </Select>
                  {customerId.length > 0
                    ? null
                    : errors.customerId && (
                        <small className="p-error">
                          Customer Name is required
                        </small>
                      )}
                </Col>
                <Col lg={4} className="pb-1">
                  <label className="input-title pe-5">Customer Address</label>
                  <br />
                  <InputTextarea
                    name="customerAddress"
                    id="customerAddress"
                    className="mt-1 input-text-area"
                    style={{ width: "95%" }}
                    {...register("customerAddress", { require: true })}
                  />
                  <br />
                </Col>
                <Col lg={4} className="pb-1">
                  <label className="input-title pe-5">Gstin</label>
                  <br />
                  <InputText
                    name="gstin"
                    id="gstin"
                    className="mt-1 Create-input"
                    style={{ width: "95%" }}
                    {...register("gstin", { required: true })}
                    // onChange= {(e) => setValue("gstin", e)}
                  />
                  <br />
                </Col>
                <Col lg={4} className="pb-1">
                  <label className="input-title pe-5">Length</label>
                  <br />
                  <Controller
                    name="length"
                    control={control}
                    rules={{ required: "Length Name is required." }}
                    render={({ field }) => (
                      <InputNumber
                        className="mt-1"
                        style={{
                          width: "95%",
                          borderRadius: "5px",
                          height: "37px",
                        }}
                        suffix={" feet"}
                        id={field.name}
                        ref={field.ref}
                        useGrouping={false}
                        value={field.value}
                        onBlur={field.onBlur}
                        onValueChange={(e) => field.onChange(e)}
                      />
                    )}
                  />
                  <br />
                  {getFormErrorMessage("length")}
                </Col>
                <Col lg={4} className="pb-1">
                  <label className="input-title pe-5">Width</label>
                  <br />
                  <Controller
                    name="width"
                    control={control}
                    rules={{ required: "Width Name is required." }}
                    render={({ field }) => (
                      <InputNumber
                        className="mt-1"
                        style={{
                          width: "95%",
                          borderRadius: "5px",
                          height: "37px",
                        }}
                        suffix={" feet"}
                        id={field.name}
                        ref={field.ref}
                        value={field.value}
                        useGrouping={false}
                        onBlur={field.onBlur}
                        onValueChange={(e) => field.onChange(e)}
                      />
                    )}
                  />
                  <br />
                  {getFormErrorMessage("width")}
                </Col>
                <Col lg={4} className="pb-1">
                  <label className="input-title pe-5">Depth</label>
                  <br />
                  <Controller
                    name="depth"
                    control={control}
                    rules={{ required: "Depth Name is required." }}
                    render={({ field }) => (
                      <InputNumber
                        className="mt-1"
                        style={{
                          width: "95%",
                          borderRadius: "5px",
                          height: "37px",
                        }}
                        suffix={" feet"}
                        id={field.name}
                        ref={field.ref}
                        useGrouping={false}
                        value={field.value}
                        onBlur={field.onBlur}
                        onValueChange={(e) => field.onChange(e)}
                      />
                    )}
                  />
                  <br />
                  {getFormErrorMessage("depth")}
                </Col>

                <Col lg={4} className="pb-1">
                  <label className="input-title pe-5">
                    Purpose of this solution
                  </label>
                  <br />
                  <InputText
                    className="mt-1 Create-input"
                    style={{ height: "37px", width: "95%" }}
                    {...register("purpose", {
                      required: true,
                    })}
                  />
                  <br />
                  {errors?.purpose?.type === "required" && (
                    <small className="p-error">This field is required</small>
                  )}
                </Col>
                <Col lg={4} className="pb-1">
                  <label className="input-title pe-5">Quotation Title</label>
                  <br />
                  <InputText
                    className="mt-1 Create-input"
                    style={{ height: "37px", width: "95%" }}
                    {...register("quotationTitle", {
                      required: true,
                    })}
                  />
                  <br />
                  {errors?.quatationTitle?.type === "required" && (
                    <small className="p-error">This field is required</small>
                  )}
                </Col>
              </Row>
              <Row className="mt-2">
                <Col lg={4} className="pb-1">
                  <label className="input-title pe-5 pb-2">Date</label>
                  <input
                    className="mt-1 Create-input"
                    type="date"
                    id="date"
                    name="date"
                    {...register("date", { required: true })}
                  />
                  <br />
                  {errors?.date?.type === "required" && (
                    <small className="p-error">This field is required</small>
                  )}
                </Col>
                <Col lg={4} className="pb-1">
                  <label className="input-title pe-5 pb-2">Place</label>
                  <InputText
                    className="Create-input mt-1"
                    style={{ height: "37px", width: "95%" }}
                    {...register("place", {
                      required: true,
                    })}
                  />
                  <br />
                  {errors?.place?.type === "required" && (
                    <small className="p-error">This field is required</small>
                  )}
                </Col>
              </Row>

              <Row className="mt-3">
                <div>
                  <div className="heading-div">
                    <span className="form-heading-fields">Table Fields</span>
                  </div>
                  <div>
                    <div className="md:grid grid-cols-2 gap-x-10">
                      <div className="flex flex-col">
                        <label htmlFor="subheader">Sub Header</label>
                        <InputText
                          type="text"
                          name="subheader"
                          id="subheader"
                          placeholder="Enter subheader if you want"
                          value={subheader}
                          {...register("subheader", { required: false })}
                          onChange={(e) => setSubheader(e.target.value)}
                        />
                      </div>

                      {/* <InputText
                        type="hidden"
                        name="productName"
                        id="productName"
                        value={productName}
                        {...register("productName", { required: true })}
                        onChange={onProductNameChange}
                      /> */}

                      <div className="flex flex-col">
                        <label htmlFor="productId">Product Name</label>
                        <Select
                          style={{ width: "100%" }}
                          className="create-select"
                          name="productId"
                          {...register("productId", { required: true })}
                          placeholder="Select a Product"
                          onChange={(e) => {
                            setProductData(e);
                            setProductId(e);
                            setValue("productId", e);
                          }}
                        >
                          {productList?.map((list, i) => {
                            return (
                              <Option value={list?._id} key={i}>
                                {list?.productName}
                              </Option>
                            );
                          })}
                        </Select>
                        {productId.length > 0
                          ? null
                          : errors.productId && (
                              <small className="p-error">
                                Product Name is required
                              </small>
                            )}
                      </div>
                    </div>
                    <div className="md:grid grid-cols-4 gap-x-10">
                      <div className="flex flex-col">
                        <label htmlFor="quantity">Quantity</label>
                        <InputText
                          type="text"
                          name="quantity"
                          id="quantity"
                          value={quantity}
                          {...register("quantity", { required: true })}
                          onChange={onQuantityChange}
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="price">Price</label>
                        <InputText
                          type="text"
                          name="price"
                          id="price"
                          value={price}
                          // {...register("price", { required: true })}
                          onChange={(e) => {
                            setPrice(e.target.value);
                            setValue("price", e);
                          }}
                        />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="amount">Amount</label>
                        <InputText
                          type="text"
                          name="amount"
                          id="amount"
                          value={amount}
                          onChange={(e) => {
                            setAmount(e.target.value);
                            setValue("amount", e);
                          }}
                          disabled
                        />
                      </div>

                      {/* <div className="flex flex-col">
                        <label htmlFor="mrp">MRP / Unit</label>
                        <InputText
                          type="text"
                          name="mrp"
                          id="mrp"
                          value={mrp}
                          onChange={(e) => {
                            setMrp(e.target.value);
                            setValue("mrp", e);
                          }}
                        />
                      </div> */}
                    </div>
                  </div>
                  <TableForm
                    subheader={subheader}
                    setSubheader={setSubheader}
                    productName={productName}
                    setProductName={setProductName}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    price={price}
                    setPrice={setPrice}
                    mrp={mrp}
                    setMrp={setMrp}
                    amount={amount}
                    setAmount={setAmount}
                    list={list}
                    setList={setList}
                  />
                </div>
              </Row>
              <Row>
                <Col className="mt-2" lg={4}>
                  <label htmlFor="subtotal" className="input-title pe-5 pb-1">
                    subTotal
                  </label>
                  <InputNumber
                    type="text"
                    id="subTotal"
                    className="mt-1 input-number"
                    minFractionDigits={2}
                    maxFractionDigits={5}
                    value={subTotal}
                    {...register("subTotal", {
                      required: true,
                    })}
                    onChange={onChangeSubtotal}
                    disabled
                  />
                </Col>
                <Col className="mt-2" lg={4}>
                  <label htmlFor="discount" className="input-title pe-5 pb-1">
                    Discount {"(-)"}
                  </label>
                  <div className="d-flex align-items-center justify-conent-between gap-x-2">
                    <InputNumber
                      type="text"
                      id="discountValue"
                      name="discountValue"
                      useGrouping={false}
                      value={discountvalue}
                      onChange={(e) => {
                        setDiscountValue(e.value);
                        setValue("discountValue", e.value);
                      }}
                      style={{ height: "37px", width: "50%" }}
                      className="mt-1 create-discount"
                    />
                    <Dropdown
                      style={{ height: "37px", width: "90%" }}
                      placeholder="%"
                      className="align-items-center mt-1 mr-3"
                      value={discount}
                      {...register("discountType", {
                        required: true,
                      })}
                      options={Discountselect}
                      onChange={(e) => onDiscount(e, setValue)}
                    />
                  </div>
                </Col>
                <Col className="mt-2" lg={4}>
                  <label className="input-title pe-5 pb-1">
                    After Discount
                  </label>
                  <InputNumber
                    id="afterDiscount"
                    name="afterDiscount"
                    type="text"
                    className="mt-1 input-number"
                    value={afterDiscount}
                    onChange={(e) => setAfterDiscount(e.target.value)}
                    disabled
                    {...register("afterDiscount", {
                      required: true,
                    })}
                    minFractionDigits={2}
                    maxFractionDigits={5}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="mt-2" lg={4}>
                  <label className="input-title pe-5 pb-1">Gst</label>
                  <InputNumber
                    type="text"
                    name="gst"
                    className="mt-1 input-number"
                    minDigits={3}
                    suffix=" %"
                    value={gst}
                    {...register("gst", { required: true })}
                    onChange={(e) => onGstChange(e, setValue)}
                    useGrouping={false}
                  />
                </Col>
                <Col className="mt-2" lg={4}>
                  <label className="input-title pe-5 pb-1">
                    Shipping Other (+)
                  </label>
                  <InputNumber
                    type="text"
                    className="mt-1 input-number"
                    minFractionDigits={2}
                    maxFractionDigits={5}
                    useGrouping={false}
                    {...register("shipping", {
                      required: true,
                    })}
                    value={shipping}
                    onChange={onShippingChange}
                  />
                </Col>
                <Col className="mt-2" lg={4}>
                  <label className="input-title pe-5 pb-1">Grand Total</label>
                  <InputNumber
                    type="text"
                    className="mt-1 input-number"
                    value={grandTotal}
                    {...register("grandTotal", {
                      required: true,
                    })}
                    onValueChange={(e) => setGrandTotal(e.target.value)}
                    minFractionDigits={2}
                    disabled
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <label className="input-title pe-5 pb-1">
                    Additional Note
                  </label>
                  <br />
                  <InputTextarea
                    placeholder="Additional Note"
                    className="mt-1"
                    style={{ width: "98%" }}
                    value={note}
                    cols={114}
                    {...register("note", {
                      required: true,
                      onChange: (e) => {
                        setNote(e.target.value);
                      },
                    })}
                  />
                  <br />
                  {errors.note && (
                    <small className="p-error">Note is required</small>
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  <label className="input-title pe-5 pb-1">
                    Terms & Conditions
                  </label>
                  <br />
                  <InputTextarea
                    placeholder="Terms & Conditions"
                    className="mt-1"
                    style={{ width: "98%" }}
                    value={terms}
                    cols={114}
                    {...register("terms", {
                      required: true,
                      onChange: (e) => {
                        setTerms(e.target.value);
                      },
                    })}
                  />
                  <br />
                  {errors.terms && (
                    <small className="p-error">
                      Terms & Conditions is required
                    </small>
                  )}
                </Col>
              </Row>
              <div className="submitbuttons d-flex justify-content-start p-2">
                <Button
                  className="form-button p-button-sm px-4 m-2"
                  type="submit"
                  onClick={() => {
                    handleSubmit();
                    handleCreateFormSubmit();
                  }}
                >
                  Save
                </Button>
                <Button
                  className="form-button px-4 p-button-success p-button-sm m-2"
                  type="button"
                  onClick={() => setShowProposal(false)}
                >
                  Preview
                </Button>
                <Button
                  className="form-button px-4 p-button-secondary p-button-sm m-2"
                  type="reset"
                >
                  Reset
                </Button>
              </div>
            </form>
          </Card>
        ) : (
          <div className="mt-3 bg-white mb-3 mx-4 py-4">
            <div
              className="mt-3 px-4 xl:grid grid-cols xl:items-start bg-white py-4"
              ref={componentRef}
            >
              <Header proposalNumber={getValues().proposalNumber} />
              <CustomerDetails
                customerName={getValues().customerName}
                customerAddress={getValues().customerAddress}
                gstin={getValues().gstin}
                length={getValues().length}
                width={getValues().width}
                depth={getValues().depth}
                purpose={getValues().purpose}
              />
              <QuotationHeading
                quotationTitle={getValues().quotationTitle}
                date={getValues().date}
                place={getValues().place}
              />
              <Table
                subheader={subheader}
                productName={productName}
                quantity={quantity}
                price={price}
                amount={amount}
                mrp={mrp}
                list={list}
                setList={setList}
                subTotal={getValues().subTotal}
                setTotal={setTotal}
              />
              <DetailsLeft
                terms={getValues().terms}
                otherTerms={getValues().note}
              />
            </div>
            <div className="print-btn">
              <Button
                className="p-button p-button-success d-felx justify-content-center align-items-center"
                onClick={() => setShowProposal(true)}
              >
                Edit Information
              </Button>

              <div>
                <ReactToPrint
                  trigger={() => (
                    <Button className="p-button d-felx justify-content-center align-items-center">
                      Print / Download
                    </Button>
                  )}
                  content={() => componentRef.current}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
