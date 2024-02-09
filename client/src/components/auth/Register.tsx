import React, { useEffect } from "react";
import { registerUser } from "../../reducers/authSlice.ts";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppSelector, useAppDispatch } from "../../hooks.ts";

const Register = ({ history }) => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
  }, []);

  return (
    <div className="register">
      <h2 className="page-header">Register</h2>
      <Formik
        initialValues={{
          name: "",
          contact: "",
          email: "",
          username: "",
          password: "",
          password2: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          contact: Yup.string()
            .required("Required")
            .min(10, "Must be 10 characters")
            .max(10, "Must be 10 characters"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          username: Yup.string().required("Required"),
          password: Yup.string().required("Required"),
          password2: Yup.string().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          const newUser = {
            name: values.name,
            username: values.username,
            contact: values.contact,
            email: values.email,
            password: values.password,
            password2: values.password2,
          };
          dispatch(registerUser(newUser, history));
          setSubmitting(false);
        }}
      >
        <Form>
          <label htmlFor="name">name</label>
          <Field
            name="name"
            className="form-control"
            type="text"
            placeholder="Enter your name"
          />
          <ErrorMessage name="name" />
          <br />
          <label htmlFor="contact">contact number</label>
          <Field
            name="contact"
            className="form-control"
            type="text"
            placeholder="Enter your contact number"
          />
          <ErrorMessage name="contact" />
          <br />
          <label htmlFor="email">email</label>
          <Field
            name="email"
            className="form-control"
            type="email"
            placeholder="Enter your email"
          />
          <ErrorMessage name="username" />
          <br />
          <label htmlFor="username">username</label>
          <Field
            name="username"
            className="form-control"
            type="text"
            placeholder="Enter your username"
          />
          <ErrorMessage name="username" />
          <br />
          <label htmlFor="password">password</label>
          <Field
            name="password"
            className="form-control"
            type="password"
            placeholder="Enter your password"
          />
          <ErrorMessage name="password" />
          <br />
          <label htmlFor="password2">confirm password</label>
          <Field
            name="password2"
            className="form-control"
            type="password"
            placeholder="Enter your confirm password"
          />
          <ErrorMessage name="password2" />
          <br />
          <button type="submit" className="btn btn-info">
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
