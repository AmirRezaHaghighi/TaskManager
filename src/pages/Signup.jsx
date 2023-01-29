import Form from "react-bootstrap/Form";
import { FaUserAlt, FaEnvelope, FaKey } from "react-icons/fa";
import AuthenticationBox from "../components/common/AuthenticationBox/AuthenticationBox";
import ButtonForm from "../components/common/Button/ButtonForm";
import InputForm from "../components/common/Input/InputForm";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { loadData, saveData } from "../utils/localStorage";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(8).required(),
  termsOfService: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const submitForm = (data, event) => {
    event.preventDefault();
    let oldData = loadData("userData");
    const userId = uuid();
    if (oldData) {
      const check = checkExist(data.email, oldData);
      if (!check) {
        saveData("userData", [...oldData, { ...data, id: userId }]);
        saveData("activeUser", userId);
        toast.success("User register successfully");
        navigate("/taskmanager");
      } else {
        toast.error("User exist");
      }
    } else {
      saveData("userData", [{ ...data, id: userId }]);
      saveData("activeUser", userId);
      toast.success("User register successfully");
      navigate("/taskmanager");
    }
  };

  function checkExist(id, data) {
    const exsit = data.filter((item) => item.email === id);
    if (exsit.length > 0) {
      return true;
    }
    return false;
  }

  return (
    <main className="d-flex wrapper m-auto my-5">
      <section className="w-100  d-none d-md-flex w-md-50  bg-white left">
        <AuthenticationBox />
      </section>

      <section className="w-100 w-md-50 right">
        <div className="form px-4 px-lg-4 px-xl-5 bg-white py-4">
          {/* /title form */}
          <section className="py-xl-5  w-100  mb-5">
            <h3 className="text-center text-primary-dark font-weight-bold ">
              <legend className="">Signup</legend>
            </h3>
          </section>

          {/* form */}
          <Form onSubmit={handleSubmit(submitForm)}>
            <InputForm
              type="text"
              name="firstName"
              lable="First Name"
              icon={<FaUserAlt className="icon" />}
              reg={register("firstName")}
              error={errors.firstName}
            />

            <InputForm
              type="text"
              name="lastName"
              lable="Last Name"
              icon={<FaUserAlt className="icon" />}
              reg={register("lastName")}
              error={errors.lastName}
            />

            <InputForm type="text" name="Phone Number" lable="Phone Number" />

            <InputForm
              type="email"
              name="email"
              lable="Email"
              icon={<FaEnvelope className="icon" />}
              reg={register("email")}
              error={errors.email}
            />

            <InputForm
              type="password"
              name="password"
              lable="Password"
              icon={<FaKey className="icon" />}
              reg={register("password")}
              error={errors.password}
            />

            <Form.Group
              className="mb-3 input-group-lg text-start"
              controlId="formBasicCheckbox"
            >
              <div className="form-check">
                <input
                  type="checkbox"
                  name="selectCheckbox"
                  id="selectCheckbox"
                  {...register("termsOfService")}
                  className={`form-check-input ${
                    errors.termsOfService ? "is-invalid" : ""
                  }`}
                />
                <label htmlFor="termsOfService" className="form-check-label">
                  A I have read and accepted the rules and regulations of Tripsi
                </label>
                <div className="invalid-feedback">
                  {errors.termsOfService?.message}
                </div>
              </div>
            </Form.Group>

            <ButtonForm value="Signup" />
          </Form>

          {/* footer form */}
          <section className="py-4 text-start d-flex flex-column flex-md-row justify-content-center align-items-center justify-content-md-between font-small end-form">
            <span>I have Tripsi account</span>
            <Link to="/login">Login</Link>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Signup;
