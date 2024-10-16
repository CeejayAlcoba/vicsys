import { useQuery } from "@tanstack/react-query";
import userService from "../../../firebase/services/userService";
import { Button, Modal, Form, Input } from "antd";
import { ColumnsType } from "antd/es/table";
import { IUser } from "../../../interfaces/firebase/IUser";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import DataTable from "../../../components/DataTable";
import FormGroupItems, {
  FormGroupItemsProps,
} from "../../../components/FormControl";
export default function UserPage() {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isOpenSaveModal, setIsOpenSaveModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const _userService = userService();
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
      ],
      component: <Input type="password" />,
    },
    {
      name: "birthday",
      label: "Birthday",
      rules: [{ required: true, message: "Please input the birthday!" }],
      component: <Input type="date" />,
    },
  ];
  const updateFromGroups: FormGroupItemsProps[] = addFormGroups.filter(
    (c) => c.name !== "password"
  );

  const columns: ColumnsType<IUser> = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
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
              console.log(data);
              setSelectedUser(data);
              setIsOpenSaveModal(true);
            }}
          />
        </>
      ),
    },
  ];

  const handleSave = async (values: IUser) => {
    if (selectedUser) {
      await _userService.update(selectedUser.id || "", values);
    } else {
      await _userService.add(values);
    }
    refetch();
    setIsOpenSaveModal(false);
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
    const [form] = Form.useForm();

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
            email: selectedUser?.email || "",
            birthday: selectedUser?.birthday || "",
          }}
          layout="vertical"
        >
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
