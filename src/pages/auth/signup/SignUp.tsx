import { IUser } from "../../../interfaces/firebase/IUser";
import FormGroupItems, {
  FormGroupItemsProps,
} from "../../../components/FormControl";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import vicsys1 from "../../../assets/vicsys1.png";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import accountService from "../../../firebase/services/accountService";
import IChild from "../../../interfaces/firebase/IChild";
import AddChildModal from "./modal/ChildrenModal";
import childrenService from "../../../firebase/services/childrenService";
import useUserContext from "../../../contexts/useUserContext";
import { useForm } from "antd/es/form/Form";

export default function SignUp() {
  const _accountService = accountService();
  const _childService = childrenService();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [children, setChildren] = useState<IChild[]>([]);
  const [isAddChildModalVisible, setIsAddChildModalVisible] = useState(false);
  const [childData, setChildData] = useState<IChild>({
    firstName: "",
    lastName: "",
    nickname: "",
    dateOfBirth: "",
    gender: "Male",
    age: 0,
    hasFoodAllergies: false,
    foodAllergies: "",
  });
  const [form] = useForm();

  const formGroupItems: FormGroupItemsProps[] = [
    {
      name: "name",
      rules: [{ required: true, message: "Please input the name!" }],
      component: <Input placeholder="Name" />,
    },
    {
      name: "email",
      rules: [{ required: true, message: "Please input the email!" }],
      component: <Input type="email" placeholder="Email" disabled={!!user} />,
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
      const { uid } = await _accountService.signup(data);
      if (children) {
        await _childService.addMany(uid, children);
      }

      Swal.fire({
        icon: "success",
        title: "Successfully signed up!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    } catch (_e: any) {
      const e: Error = _e;
      setError(e.message);
    }
  };
  useEffect(() => {
    if (user) {
      form.setFieldValue("email", user.email);
    }
  }, []);

  return (
    <div className="d-flex justify-content-between">
      <AddChildModal
        isModalVisible={isAddChildModalVisible}
        setIsModalVisible={setIsAddChildModalVisible}
        setChildren={setChildren}
        setChildData={setChildData}
        childData={childData}
        children={children}
      />
      <div className="form-signin">
        <Form onFinish={onFinish} form={form}>
          <center>
            <img src={vicsys1} style={{ width: 300 }} />
            <h4 className="mb-3 fw-normal">Signup</h4>
            <p className="text-danger"> {error}</p>
          </center>

          <FormGroupItems items={formGroupItems} />
          <Button onClick={() => setIsAddChildModalVisible(true)}>
            Add Child
          </Button>

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
    </div>
  );
}
