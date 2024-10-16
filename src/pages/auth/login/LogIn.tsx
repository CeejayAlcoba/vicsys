import { Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import FormGroupItems, {
  FormGroupItemsProps,
} from "../../../components/FormControl";
import { IUserLogin } from "../../../interfaces/firebase/IUser";
import accountService from "../../../firebase/services/accountService";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import vicsys1 from "../../../assets/vicsys1.png";

const formGroupItems: FormGroupItemsProps[] = [
  {
    name: "email",
    rules: [{ required: true, message: "Please input the email!" }],
    component: <Input prefix={<UserOutlined />} placeholder="Email" />,
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
  const _accounService = accountService();
  const navigate = useNavigate();
  const onFinish = async (values: IUserLogin) => {
    try {
      await _accounService.login(values);
      navigate("/");
    } catch (ex: any) {
      console.log(ex);
    }
  };

  return (
    <>
      <main className="form-signin">
        <Form onFinish={onFinish}>
          <img src={vicsys1} className="img-fluid mx-auto d-block" alt="" />
          <br />

          <FormGroupItems items={formGroupItems} />

          <div className="forgot-password">
            <a href="adminlogin.php">Forgot Password?</a>
          </div>

          <button className="btn btn-success w-100" type="submit">
            Sign in
          </button>
        </Form>
      </main>
      <p className="bottom">&copy;2024</p>
    </>
  );
}
