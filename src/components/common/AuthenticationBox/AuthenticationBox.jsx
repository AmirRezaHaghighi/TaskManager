import "./AuthenticationBox.scss";
import logo from "../../../assets/images/tripsi-logo.png";

const AuthenticationBox = () => {
  return (
    <div className="AuthenticationBox w-100 h-100 p-5 ">
      <div className="d-flex flex-column align-items-center glass default-border-radius w-100 h-100">
        <div className="m">
          <section className="px-1 px-lg-2 px-xl-5">
            <img src={logo} alt="Logo" className="logo" />;
          </section>
          <section className="text-center text-white">
            <h2 className="pb-2 px-4">Welcome To Tripsi</h2>
            <h6 className="px-2">
              The most reliable supplier of tourism products in Iran
            </h6>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationBox;
