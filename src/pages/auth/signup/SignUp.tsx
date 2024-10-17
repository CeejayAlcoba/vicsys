import { IUser } from "../../../interfaces/firebase/IUser";
import FormGroupItems, {
  FormGroupItemsProps,
} from "../../../components/FormControl";
import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import vicsys1 from "../../../assets/vicsys1.png";
import Swal from "sweetalert2";
import { useState } from "react";
import accountService from "../../../firebase/services/accountService";

export default function SignUp() {
  const _accountService = accountService();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const formGroupItems: FormGroupItemsProps[] = [
    {
      name: "name",
      rules: [{ required: true, message: "Please input the name!" }],
      component: <Input placeholder="Name" />,
    },
    {
      name: "email",
      rules: [{ required: true, message: "Please input the email!" }],
      component: <Input type="email" placeholder="Email" />,
    },
    {
      name: "password",
      rules: [
        { required: true, message: "Please input the password!" },
        { min: 6, message: "Password should be at least 6 characters" },
      ],
      component: <Input.Password placeholder="Password" />,
    },
    {
      name: "birthday",
      rules: [{ required: true, message: "Please input the birthday!" }],
      component: <Input type="date" placeholder="Birthday" />,
    },
  ];

  const onFinish = async (data: IUser) => {
    try {
      setError("");
      await _accountService.signup(data);
      Swal.fire({
        icon: "success",
        title: "Successfully signup!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    } catch (_e: any) {
      let e: Error = _e;
      setError(e.message);
    }
  };

  return (
    <>
      <div className="form-signin w-100 m-auto">
        <Form onFinish={onFinish}>
          <center>
            <img src={vicsys1} style={{ width: 300 }} />
            <h4 className=" mb-3 fw-normal">Signup</h4>
            <p className="text-danger"> {error}</p>
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
          <button className="mb-3 btn btn-primary w-100" type="submit">
            Signup
          </button>
          <p>
            Already have an account? <a href="login"> Log in.</a>
          </p>
          <p className="mt-5 mb-3 text-body-secondary">&copy; Bentayarn 2024</p>
        </Form>
      </div>
    </>
  );
}
