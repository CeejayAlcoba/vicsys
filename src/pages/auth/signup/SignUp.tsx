import { IUser } from "../../../interfaces/firebase/IUser";
import FormGroupItems, {
  FormGroupItemsProps,
} from "../../../components/FormControl";
import userService from "../../../firebase/services/userService";
import { Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";
import "./SignUp.css";
import vicsys1 from "../../../assets/vicsys1.png";

export default function SignUp() {
  const _userService = userService();
  const navigate = useNavigate();

  const formGroupItems: FormGroupItemsProps[] = [
    {
      name: "email",
      rules: [{ required: true, message: "Please input the email!" }],
      component: <Input type="email" placeholder="Email" />,
    },
    {
      name: "password",
      rules: [{ required: true, message: "Please input the password!" }],
      component: <Input.Password placeholder="Password" />,
    },
    {
      name: "birthday",
      rules: [{ required: true, message: "Please input the birthday!" }],
      component: <Input type="date" placeholder="Birthday" />,
    },
  ];

  const onFinish = async (data: IUser) => {
    await _userService.add(data);
    notification.open({
      icon: <CheckOutlined style={{ color: "green" }} />,
      message: "Successfully signed up",
    });
    navigate("/login");
  };

  return (
    <>
      <div className="form-signin w-100 m-auto">
        <Form onFinish={onFinish}>
          <center>
            <img className="mb-4" src={vicsys1} style={{ width: 200 }} />
            <h4 className=" mb-3 fw-normal">Register</h4>
          </center>

          <FormGroupItems items={formGroupItems} />

          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="flexCheckDefault"
            />
            <label className="form-check-label">Remember me</label>
          </div>
          <button
            className="btn btn-success w-100"
            type="button"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
          <br />
          <div className="w-100 text-center">or</div>
          <button className="btn btn-primary w-100" type="submit">
            Register
          </button>
          <p className="mt-5 mb-3 text-body-secondary">&copy; Bentayarn 2024</p>
        </Form>
      </div>
    </>
  );
}
