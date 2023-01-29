import Form from "react-bootstrap/Form";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthenticationBox from "../components/common/AuthenticationBox/AuthenticationBox";
import ButtonForm from "../components/common/Button/ButtonForm";
import InputForm from "../components/common/Input/InputForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { loadData } from "../utils/localStorage";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function checkEmailExist(email) {
    const usersData = loadData("userData");
    if (usersData === null) {
      toast.error("Unable to find User");
    }
    const isUserExsit = usersData.filter((item) => item.email === email);
    if (isUserExsit.length > 0) {
      return true;
    }
    return false;
  }

  const submitForm = (data, event) => {
    event.preventDefault();
    const check = checkEmailExist(data.email);
    if (check) {
      toast.success("reset password link sent to your email");
    } else {
      toast.error("User not exist");
    }
  };

  return (
    <main className="d-flex wrapper m-auto my-5">
      <section className="w-100 d-none d-md-flex w-md-50  bg-white left">
        <AuthenticationBox />
      </section>

      <section className="w-100 h-100 w-md-50 right ">
        <div className="form px-4 px-lg-4 px-xl-5 bg-white py-4">
          {/* /title form */}
          <section className="pt-5  w-100  mb-5">
            <h3 className="text-center text-primary-dark font-weight-bold py-2 font-large">
              <legend className=""> Forgot Password</legend>
            </h3>
            <p className="mt-5 text-center text-primary-light font-small">
              Enter the email address you used when you joined and we’ll send
              you instructions to reset your password.
            </p>
          </section>

          {/* form */}
          <Form onSubmit={handleSubmit(submitForm)}>
            <InputForm
              type="email"
              name="email"
              lable="Email"
              icon={<FaEnvelope className="icon" />}
              reg={register("email")}
              error={errors.email}
            />

            <ButtonForm value="Reset Password" />
          </Form>

          {/* footer form */}
          <section className="py-4 text-start d-flex flex-column flex-md-row justify-content-center align-items-center justify-content-md-between end-form font-small">
            <span>Do you remember your password?</span>
            <Link to="/login">Login</Link>
          </section>
        </div>
      </section>
    </main>
  );
};

export default ForgetPassword;
