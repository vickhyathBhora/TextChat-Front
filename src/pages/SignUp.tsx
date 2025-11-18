import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation Schema
const SignupSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Required"),

  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).+$/,
      "Password must contain one letter, one number, and one special character"
    )
    .required("Required"),

  confirmPassword: Yup.string()
   .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).+$/,
      "Password must contain one letter, one number, and one special character"
    )
    .required("Required"),
});

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => (prev ? false : true));
  };
const signFetch = async (values: any,actions:any) => {
  try {
    const res = await fetch("https://textchat-server.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.text();
    console.log("Response:", data);
    alert("Signup Success:data saved in db");
      actions.resetForm(); 
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong!");
  }
};

  return (
    <div className="main">
      <div className="FormDiv">
        <h1 className="header">Signup</h1>

        <Formik
          initialValues={{
            phone: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values,actions) => {
            signFetch(values,actions);
          }}
        >
          {() => (
            <Form className="form">
              {/* PHONE */}
              <div className="formDiv1">
                <label className="PhLable">Phone Number</label>
                <Field name="phone" type="text" className="PhField" />
                <ErrorMessage name="phone" component="div" className="PhError" />
              </div>

              {/* PASSWORD */}
              <div className="PassDiv">
                <label className="PassLable">Password</label>

                <div className="InputWithIcon">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="PassField"
                  />

                  <button type="button" className="IconButton" onClick={togglePassword}>
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>

                <ErrorMessage name="password" component="div" className="PassError" />
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="PassDiv">
                <label className="PassLable">Confirm Password</label>

                <div className="InputWithIcon">
                  <Field
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    className="PassField"
                  />

                  <button type="button" className="IconButton" onClick={togglePassword}>
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>

                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="PassError"
                />
              </div>

              {/* BUTTONS */}
              <div className="buttonDiv">
                <button type="submit" className="SubmitButton">
                  Submit
                </button>

                <button type="button" onClick={() => navigate("/login")} className="SubmitButton">
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
