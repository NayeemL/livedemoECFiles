import React, { useState, useEffect } from "react";
import { Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputMask } from "primereact/inputmask";
import "./userstyle.css";
import Api from "../../Api";
import { ToastContainer, toast } from "react-toastify";

const Registration = () => {
  const [service, setService] = useState("");
  const [amount, setAmount] = useState("");
  const defaultValues = {
    companyType: "",
    companyName: "",
    email: "",
    aadharNo: "",
    panNo: "",
    service: "",
    amount: "",
  };
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues });
  console.log("getvaluessss", getValues());

  const navigate = useNavigate();

  // useEffect(() => {
  //   Registration();
  //   }
  // );

  const handleRegistration = async () => {
    const FormDetails = {
      companyType: getValues().companyType.name,
      companyName: getValues().companyName,
      email: getValues().email,
      aadharNo: getValues().aadharNo,
      panNo: getValues().panNo,
      service: getValues().service.name,
      amount: getValues().amount,
    };
    Api.post(`registration/registration`, FormDetails).then((res) => {
      console.log("res.data", res.data);
      if (res.status === 200) {
        toast.success("Registred SuccessFully");
        setTimeout(()=>{
          navigate("/admin");
        }, 1000);
      }
      reset();
    });
  }; 

  const onSubmit = (data) => {
    console.log(data);
    handleRegistration();
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const role = [
    { name: "Proprietorship Company", code: "proprietorship" },
    { name: "Partnership Company", code: "partnership" },
    { name: "Limited Liability Company", code: "Limited-liability" },
    { name: "Private Limited Company", code: "private limited" },
    { name: "private Limited Company", code: "public limited" },
    { name: "TRUST OR NGO", code: "TRUST" },
  ];

  const servicesList = [
    { name: "GST Registration Free", id: 0 },
    { name: "GST Return Monthly", id: 500 },
    { name: "GST Return Quarterly", id: 1400 },
    { name: "GST Return Half yearly", id: 2500 },
    { name: "GST Return Annually", id: 4800 },
    { name: "GST Activation", id: 1000 },
    { name: "GST Cancellation", id: 500 },
    { name: "Change of Constitution", id: 1000 },
    { name: "GST Refund", id: 3000 },
  ];

  return (
    <div className="p-4">
      <ToastContainer />
      <Card
        className="surface-0 shadow-2 p-5 border-1 border-50 border-round"
        style={{ width: "450px" }}
      >
        <div className="flex justify-center pb-2">
          <span className="text-lg text-current antialiased">
            Application for GST Registration
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-1">
            <Col className="pb-3">
              <Controller
                name="companyType"
                control={control}
                rules={{ required: "Type of Company is required." }}
                render={({ field }) => (
                  <div className="p-inputgroup">
                    <span
                      className="p-inputgroup-addon"
                      style={{
                        backgroundColor: "#f1f1f1",
                        borderColor: "#f1f1f1",
                      }}
                    >
                      <RiIcons.RiArrowDownSFill style={{ fontSize: "26px" }} />
                    </span>
                    <Dropdown
                      className="input-regs-fields"
                      autoComplete="off"
                      value={field.value}
                      optionLabel="name"
                      placeholder="Type of Company"
                      options={role}
                      onChange={(e) => field.onChange(e.value)}
                    />
                  </div>
                )}
              />
              {getFormErrorMessage("companyType")}
            </Col>
            <Col className="pb-3">
              <Controller
                name="companyName"
                control={control}
                rules={{ required: "Company Name is required." }}
                render={({ field }) => (
                  <div className="p-inputgroup">
                    <span
                      className="p-inputgroup-addon"
                      style={{
                        backgroundColor: "#f1f1f1",
                        borderColor: "#f1f1f1",
                      }}
                    >
                      <RiIcons.RiAccountPinCircleFill
                        style={{ fontSize: "26px" }}
                      />
                    </span>
                    <InputText
                      className="input-regs-fields"
                      placeholder="Company name"
                      id={field.name}
                      ref={field.ref}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                    />
                  </div>
                )}
              />
              {getFormErrorMessage("companyName")}
            </Col>
            <Col className="pb-3">
              <Controller
                name="PhoneNumber"
                control={control}
                rules={{ required: "PhoneNumber is required." }}
                render={({ field }) => (
                  <>
                    <div className="p-inputgroup">
                      <span
                        className="p-inputgroup-addon"
                        style={{
                          backgroundColor: "#f1f1f1",
                          borderColor: "#f1f1f1",
                        }}
                      >
                        <RiIcons.RiPhoneFill style={{ fontSize: "26px" }} />
                      </span>
                      <InputMask
                        className="input-regs-fields"
                        id={field.name}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        mask="99999-99999"
                        placeholder="Your Phone"
                      />
                    </div>
                    {getFormErrorMessage(field.name)}
                  </>
                )}
              />
            </Col>
            <Col className="pb-3">
              <div className="p-inputgroup">
                <span
                  className="p-inputgroup-addon"
                  style={{
                    backgroundColor: "#f1f1f1",
                    borderColor: "#f1f1f1",
                  }}
                >
                  <RiIcons.RiMailFill style={{ fontSize: "26px" }} />
                </span>
                <InputText
                  name="email"
                  type="email"
                  autoComplete="off"
                  className="input-regs-fields"
                  placeholder="Your email"
                  style={{ width: "100%", outline: "none" }}
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Entered value does not match email format",
                    },
                  })}
                />
              </div>
              {errors?.email?.type === "required" && (
                <small className="p-error">Email is required</small>
              )}
            </Col>

            <Col className="pb-3">
              <Controller
                name="aadharNo"
                control={control}
                rules={{ required: "aadharNumber is required." }}
                render={({ field }) => (
                  <>
                    <div className="p-inputgroup">
                      <span
                        className="p-inputgroup-addon"
                        style={{
                          backgroundColor: "#f1f1f1",
                          borderColor: "#f1f1f1",
                        }}
                      >
                        <FaIcons.FaAddressCard style={{ fontSize: "26px" }} />
                      </span>
                      <InputText
                        keyfilter="alphanum"
                        className="input-regs-fields"
                        id={field.name}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        placeholder="Aadhar Number"
                      />
                    </div>
                    {getFormErrorMessage(field.name)}
                  </>
                )}
              />
            </Col>

            <Col className="pb-3">
              <Controller
                name="panNo"
                control={control}
                rules={{ required: "aadharNumber is required." }}
                render={({ field }) => (
                  <>
                    <div className="p-inputgroup">
                      <span
                        className="p-inputgroup-addon"
                        style={{
                          backgroundColor: "#f1f1f1",
                          borderColor: "#f1f1f1",
                        }}
                      >
                        <FaIcons.FaRegAddressCard
                          style={{ fontSize: "26px" }}
                        />
                      </span>
                      <InputText
                        keyfilter="alphanum"
                        className="input-regs-fields"
                        id={field.name}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        placeholder="Enter PAN Number"
                      />
                    </div>
                    {getFormErrorMessage(field.name)}
                  </>
                )}
              />
            </Col>
            <Col className="pb-3">
              <div className="p-inputgroup">
                <span
                  className="p-inputgroup-addon"
                  style={{
                    backgroundColor: "#f1f1f1",
                    borderColor: "#f1f1f1",
                  }}
                >
                  <RiIcons.RiArrowDownSFill style={{ fontSize: "26px" }} />
                </span>
                <Dropdown
                  filter
                  className="input-regs-fields"
                  placeholder="Type of Services"
                  value={service}
                  options={servicesList}
                  {...register("service", { required: true })}
                  optionLabel={"name"}
                  optionValue={"id"}
                  onChange={(e) => {
                    setService(e.value);
                    setAmount(e.target.value);
                    setValue("amount", e.value);
                  }}
                />
              </div>
              {errors.service && (
                <small className="p-error">Services is required</small>
              )}
            </Col>
            <Col>
              <div className="p-inputgroup">
                <span
                  className="p-inputgroup-addon"
                  style={{
                    backgroundColor: "#f1f1f1",
                    borderColor: "#f1f1f1",
                  }}
                >
                  <FaIcons.FaRupeeSign style={{ fontSize: "20px" }} />
                </span>
                <InputNumber
                  className="input-regs-fields"
                  name="amount"
                  value={amount}
                  {...register("amount", { required: true })}
                  mode="currency"
                  currency="INR"
                  currencyDisplay="code"
                  locale="en-IN"
                  disabled
                />
              </div>
            </Col>
          </div>
          <div className="submitbuttons d-flex justify-content-center p-2">
            <Button className="form-button p-button-sm m-2 px-5" type="submit">
              <b>Pay Now</b>
            </Button>
            <Button
              className="form-button p-button-secondary p-button-sm m-2 px-5"
              type="reset"
            >
              <b>Cancel</b>
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Registration;
