import Form from "react-bootstrap/Form";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthenticationBox from "../components/common/AuthenticationBox/AuthenticationBox";
import ButtonForm from "../components/common/Button/ButtonForm";
import InputForm from "../components/common/Input/InputForm";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { loadData, saveData } from "../utils/localStorage";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(8).required(),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();


  function checkAuthentication(email, pass) {
    const usersData = loadData("userData");
    if (usersData === null) {
      toast.error("Unable to find User");
      navigate("/signup");
    }
    const isUserExsit = usersData.filter(
      (item) => item.email === email && item.password === pass
    );
    if (isUserExsit.length > 0) {
      return true;
    }
    return false;
  }

  const submitForm = (data, event) => {
    event.preventDefault();
    const result = checkAuthentication(data.email, data.password);
    if (result) {
      toast.success("you are login successfully");
      navigate("/taskmanager");
    } else {
      toast.error("Username or password incorrect");
    }
  };

  return (
    <main className="d-flex wrapper m-auto my-5 h-100">
      <section className="w-100 d-none d-md-flex w-md-50  bg-white left">
        <AuthenticationBox />
      </section>

      <section className="w-100 h-100 w-md-50 right">
        <div className="form px-4 px-lg-4 px-xl-5 bg-white py-4">
          {/* /title form */}
          <section className="py-5 w-100">
            <h3 className="text-center text-primary-dark font-weight-bold py-2">
              <legend className="">Login</legend>
            </h3>
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

            <InputForm
              type="password"
              name="password"
              lable="Password"
              icon={<FaKey className="icon" />}
              reg={register("password")}
              error={errors.password}
            />

            <ButtonForm value="Login" />
          </Form>

          {/* footer form */}
          <section className="end-form font-small">
            <div className="py-4 text-start d-flex flex-column flex-md-row justify-content-center align-items-center justify-content-md-between">
              <span>Forgot your password</span>
              <Link to="/forget-password">Password recovery</Link>
            </div>

            <div className=" text-start d-flex flex-column flex-md-row justify-content-center align-items-center justify-content-md-between">
              <span>Have not registered before?</span>
              <Link to="/signup">Signup</Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default Login;
