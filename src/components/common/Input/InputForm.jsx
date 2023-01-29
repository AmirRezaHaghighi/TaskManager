import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./InputForm.scss";

const InputForm = ({
  type = "text",
  name = "",
  lable = "",
  icon = "",
  error = "",
  reg,
  placeholder = "",
}) => {
  return (
    <Form.Group className="mb-3 text-start " controlId={name}>
      <Form.Label className="ps-3 text-dark-text">{lable}</Form.Label>
      <InputGroup className="mb-3 input-group-lg ">
        {icon && <InputGroup.Text>{icon}</InputGroup.Text>}
        <Form.Control type={type} placeholder={placeholder} {...reg} />
      </InputGroup>
      {error && <p className="ps-3 text-danger">{error.message}</p>}
    </Form.Group>
  );
};

InputForm.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  lable: PropTypes.string,
  icon: PropTypes.element,
  error: PropTypes.string,
  reg: PropTypes.func,
  placeholder: PropTypes.string,
};

InputForm.defaultProps = {
  type: "text",
  name: "",
  lable: "",
  icon: "",
  error: "",
  reg: () => {},
  placeholder: "",
};

export default InputForm;
