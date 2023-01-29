import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import "./ButtonForm.scss";

const ButtonForm = ({ value, width }) => {
  return (
    <Button type="submit" className={`w-${width} btn-height-static mt-2`}>
      {value}
    </Button>
  );
};

ButtonForm.propTypes = {
  value: PropTypes.string,
  width: PropTypes.number,
};

ButtonForm.defaultProps = {
  value: "",
  width: "100",
};

export default ButtonForm;
