import { useQuery } from "@tanstack/react-query";
import nonTechUserService from "../../../firebase/services/nonTechUserService";
import { Button, Modal, Form, Input } from "antd";
import { ColumnsType } from "antd/es/table";
import { INonTechUser } from "../../../interfaces/firebase/INonTechUser";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import DataTable from "../../../components/DataTable";
import FormGroupItems, {
  FormGroupItemsProps,
} from "../../../components/FormControl";
export default function NonTechUserPage() {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isOpenSaveModal, setIsOpenSaveModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<INonTechUser | null>(null);
  const [error, setError] = useState<string>("");
  const [form] = Form.useForm();
  const _nonTechUserService = nonTechUserService();
  const { data, refetch } = useQuery({
    queryKey: ["nontechuser"],
    queryFn: async () => await _nonTechUserService.getAll(),
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
  ];
  const updateFromGroups: FormGroupItemsProps[] = addFormGroups.filter(
    (c) => c.name !== "password"
  );

  const columns: ColumnsType<INonTechUser> = [
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
      render: (data: INonTechUser) => (
        <>
          <Button
            type="primary"
            danger
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              form.setFieldsValue(data);
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

  const handleSave = async (values: INonTechUser) => {
    setError("");
    try {
      if (selectedUser) {
        await _nonTechUserService.update(selectedUser.id || "", values);
      } else {
        await _nonTechUserService.add(values);
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
        await _nonTechUserService.deleteById(selectedUser?.id || "");
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
            email: selectedUser?.email || "",
            birthday: selectedUser?.birthday || "",
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
