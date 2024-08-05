import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, Spin } from "antd";
import { MdEdit } from "react-icons/md";
import { IEmployeeDetails } from "../../store/EmployeeDetails";
import { useFormik } from "formik";
import { BACKEND_URL, HttpStatusCodes } from "../../utils/config";
import * as Yup from "yup";
import { useStore } from "../../hooks/useStore";
import { message } from "antd";
import { FormattedMessage } from "react-intl";

interface TextErrorProps {
  name: string;
}
const TextError: React.FC<TextErrorProps> = ({ name }) => {
  return (
    <div className="error" style={{ color: "red" }}>
      {name}
    </div>
  );
};

const EmployeeModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      name: "",
      city: "",
      salary: "",
    });
    console.log("errors", formik.errors);

    return () => {
      formik.setTouched({});
    };
  }, [isModalOpen]);
  const {
    rootStore: { employeeDetailsStore },
  } = useStore();

  const initialValues = {
    name: "",
    city: "",
    salary: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    salary: Yup.string().required("Required"),
  });

  const onSubmit = async (values: any) => {
    employeeDetailsStore.setLoading(true)
    console.log("Form data", values);

    const resp = await fetch(`${BACKEND_URL}/api/employee`, {
      method: "POSt",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(values),
    });
    if (resp.status == HttpStatusCodes.CREATED) {
      const data: IEmployeeDetails = await resp.json();
      employeeDetailsStore.addEmployee(data);
      message.success("Added Successfully");
    } else {
      message.error("Error");
    }
    setIsModalOpen(false);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal} style={{ marginLeft: "16px" }}>
        <FormattedMessage id="add-employee" />
      </Button>

      <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel}
      okButtonProps={{ style: { display: 'none' } } }
      cancelButtonProps={{ style: { display: 'none' } } }
      >
        <form
          className="flex flex-col gap-2 font-bold"
          onSubmit={formik.handleSubmit}
        >
          <div className="form-control w-full h-full flex gap-6">
            <label htmlFor="name">Name</label>
            <input
              className="border-gray-950 border"
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <TextError name={formik.errors.name} />
            ) : null}
          </div>

          <div className="form-control  w-full h-full flex gap-6">
            <label className=" " htmlFor="city">
              city
            </label>
            <input
              className="border-gray-950 border"
              type="text"
              id="city"
              name="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
            {formik.touched.city && formik.errors.city ? (
              <TextError name={formik.errors.city} />
            ) : null}
          </div>

          <div className="form-control  w-full h-full flex gap-6">
            <label className=" " htmlFor="salary">
              salary
            </label>
            <input
              className="border-gray-950 border"
              type="text"
              id="salary"
              name="salary"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.salary}
            />
            {formik.touched.salary && formik.errors.salary ? (
              <TextError name={formik.errors.salary} />
            ) : null}
          </div>
          <button
            className="w-full h-fit p-2 rounded-full text-white bg-blue-700"
            type="submit"
          >
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
};

export default EmployeeModal;
