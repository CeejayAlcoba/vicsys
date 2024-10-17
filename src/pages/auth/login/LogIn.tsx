import { Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import FormGroupItems, {
  FormGroupItemsProps,
} from "../../../components/FormControl";
import { IUserLogin } from "../../../interfaces/firebase/IUser";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import vicsys1 from "../../../assets/vicsys1.png";
import { useState } from "react";
import accountService from "../../../firebase/services/accountService";

const formGroupItems: FormGroupItemsProps[] = [
  {
    name: "email",
    rules: [{ required: true, message: "Please input the email!" }],
    component: (
      <Input type="email" prefix={<UserOutlined />} placeholder="Email" />
    ),
  },
  {
    name: "password",
    rules: [{ required: true, message: "Please input the password!" }],
    component: (
      <Input.Password prefix={<LockOutlined />} placeholder="Password" />
    ),
  },
];
export default function LogIn() {
  const _accountService = accountService();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const onFinish = async (values: IUserLogin) => {
    try {
      setError("");
      await _accountService.login(values);
      navigate("/");
    } catch (_e: any) {
      let e: Error = _e;
      setError(e.message);
    }
  };

  return (
    <>
      <main className="form-signin">
        <Form onFinish={onFinish}>
          <center>
            <img src={vicsys1} style={{ width: 300 }} />
            <h4 className=" mb-3 fw-normal">Login</h4>
            <p className="text-danger"> {error}</p>
          </center>
          <FormGroupItems items={formGroupItems} />

          <div className="forgot-password">
            <a href="">Forgot Password?</a>
          </div>

          <button className="mb-3 btn btn-primary w-100" type="submit">
            Login
          </button>
          <p>
            New here? <a href="signup"> Create an account.</a>
          </p>
          <br />
        </Form>
      </main>
      <p className="bottom">&copy;2024</p>
    </>
  );
}
