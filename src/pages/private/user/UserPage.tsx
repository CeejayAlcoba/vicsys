import { useQuery } from "@tanstack/react-query";
import userService from "../../../firebase/services/userService";
import { Button, Modal, Form, Input, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import { IUser } from "../../../interfaces/firebase/IUser";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import DataTable from "../../../components/DataTable";
import FormGroupItems, {
  FormGroupItemsProps,
} from "../../../components/FormControl";
import accountService from "../../../firebase/services/accountService";
export default function UserPage() {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isOpenSaveModal, setIsOpenSaveModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string>("");
  const [form] = Form.useForm();
  const _userService = userService();
  const _accounService = accountService();
  const { data, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await _userService.getAll(),
    initialData: [],
  });
  const addFormGroups: FormGroupItemsProps[] = [
    {
      name: "name",
      label: "Name",
      rules: [{ required: true, message: "Please input the name!" }],
      component: <Input />,
    },
    {
      name: "contact",
      label: "Contact",
      rules: [{ required: true, message: "Please input the contact!" }],
      component: <Input />,
    },
    {
      name: "age",
      label: "Age",
      rules: [{ required: true, message: "Please input the age!" }],
      component: <Input type="number" />,
    },
    {
      name: "email",
      label: "Email",
      rules: [{ required: true, message: "Please input the email!" }],
      component: <Input type="email" />,
    },
    {
      name: "password",
      label: "Password",
      rules: [
        { required: !selectedUser, message: "Please input the password!" },
        { min: 6, message: "Password should be at least 6 characters" },
      ],
      component: <Input type="password" />,
    },
    {
      name: "birthday",
      label: "Birthday",
      rules: [{ required: true, message: "Please input the birthday!" }],
      component: <Input type="date" />,
    },
    {
      name: "gender",
      label: "Gender",
      rules: [{ required: true, message: "Please input the gender!" }],
      component: (
        <Select placeholder="Select Gender">
          <Select.Option value="Male">Male</Select.Option>
          <Select.Option value="Female">Female</Select.Option>
        </Select>
      ),
    },
    {
      name: "ministry",
      label: "Ministry",
      rules: [{ required: true, message: "Please input the ministry!" }],
      component: (
        <Select placeholder="Select Ministry">
          <Select.Option value="Victory Group Leaders">
            Victory Group Leaders
          </Select.Option>
          <Select.Option value="Ushering Ministry">
            Ushering Ministry
          </Select.Option>
          <Select.Option value="Music Ministry">Music Ministry</Select.Option>
          <Select.Option value="Kids Ministry">Kids Ministry</Select.Option>
          <Select.Option value="Stage Management">
            Stage Management
          </Select.Option>
          <Select.Option value="Technical Support">
            Technical Support
          </Select.Option>
          <Select.Option value="Communication">Communication</Select.Option>
          <Select.Option value="Prayer Ministry">Prayer Ministry</Select.Option>
          <Select.Option value="Admin Support">Admin Support</Select.Option>
          <Select.Option value="Real Life Coaches">
            Real Life Coaches
          </Select.Option>
          <Select.Option value="Special Project Teams">
            Special Project teams
          </Select.Option>
        </Select>
      ),
    },
  ];
  const updateFromGroups: FormGroupItemsProps[] = addFormGroups.filter(
    (c) => c.name !== "password"
  );

  const columns: ColumnsType<IUser> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Contact",
      dataIndex: "contact",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Ministry",
      dataIndex: "ministry",
      render: (data: string) => (
        <>
          {console.log(data)}
          <Select defaultValue={data} style={{ width: 180 }}>
            <Select.Option value="Victory Group Leaders">
              Victory Group Leaders
            </Select.Option>
            <Select.Option value="Ushering Ministry">
              Ushering Ministry
            </Select.Option>
            <Select.Option value="Music Ministry">Music Ministry</Select.Option>
            <Select.Option value="Kids Ministry">Kids Ministry</Select.Option>
            <Select.Option value="Stage Management">
              Stage Management
            </Select.Option>
            <Select.Option value="Technical Support">
              Technical Support
            </Select.Option>
            <Select.Option value="Communication">Communication</Select.Option>
            <Select.Option value="Prayer Ministry">
              Prayer Ministry
            </Select.Option>
            <Select.Option value="Admin Support">Admin Support</Select.Option>
            <Select.Option value="Real Life Coaches">
              Real Life Coaches
            </Select.Option>
            <Select.Option value="Special Project Teams">
              Special Project teams
            </Select.Option>
          </Select>
        </>
      ),
    },
    {
      title: "Actions",
      render: (data: IUser) => (
        <>
          <Button
            type="primary"
            danger
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              setSelectedUser(data);
              setIsOpenDeleteModal(true);
            }}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            style={{ marginLeft: 8 }}
            onClick={() => {
              form.setFieldsValue(data);
              setSelectedUser(data);
              setIsOpenSaveModal(true);
            }}
          />
        </>
      ),
    },
  ];

  const handleSave = async (values: IUser) => {
    setError("");
    try {
      if (selectedUser) {
        await _userService.update(selectedUser.id || "", values);
      } else {
        await _accounService.signup(values);
      }
    } catch (_e: any) {
      let e: Error = _e;
      setError(e.message);
    }
    if (!error) {
      refetch();
      setIsOpenSaveModal(false);
    }
  };

  const DeleteModalConfirmation = () => (
    <Modal
      title="Are you sure you want to delete?"
      open={isOpenDeleteModal}
      onOk={async () => {
        await _userService.deleteById(selectedUser?.id || "");
        refetch();
        setIsOpenDeleteModal(false);
      }}
      onCancel={() => setIsOpenDeleteModal(false)}
    >
      <p>Email: {selectedUser?.email}</p>
    </Modal>
  );

  const SaveUserModal = () => {
    const handleFormSubmit = async () => {
      try {
        const values = await form.validateFields();
        await handleSave(values);
        form.resetFields();
        setSelectedUser(null);
      } catch (error) {
        console.error("Failed to save user:", error);
      }
    };

    return (
      <Modal
        title={selectedUser ? "Update User Information" : "Add New User"}
        open={isOpenSaveModal}
        onOk={handleFormSubmit}
        onCancel={() => {
          setIsOpenSaveModal(false);
          form.resetFields();
          setSelectedUser(null);
        }}
      >
        <Form
          form={form}
          initialValues={{
            name: selectedUser?.name || "",
            contact: selectedUser?.contact || "",
            age: selectedUser?.age || "",
            email: selectedUser?.email || "",
            birthday: selectedUser?.birthday || "",
            gender: selectedUser?.gender || "",
            ministry: selectedUser?.ministry || "",
          }}
          layout="vertical"
        >
          <p className="text-danger">{error}</p>
          <FormGroupItems
            items={selectedUser ? updateFromGroups : addFormGroups}
          />
        </Form>
      </Modal>
    );
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: 16 }}
        onClick={() => {
          setIsOpenSaveModal(true);
          setSelectedUser(null);
        }}
      >
        Add User
      </Button>
      <DeleteModalConfirmation />
      <SaveUserModal />
      <DataTable dataSource={data} columns={columns} />
    </>
  );
}
