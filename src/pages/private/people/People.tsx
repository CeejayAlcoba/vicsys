import { useQuery } from "@tanstack/react-query";
import peopleService from "../../../firebase/services/peopleService";
import { Button, Modal, Form, Input, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import { IPeople } from "../../../interfaces/firebase/IPeople";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import DataTable from "../../../components/DataTable";
import FormGroupItems, {
  FormGroupItemsProps,
} from "../../../components/FormControl";

export default function NonTechUserPage() {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isOpenSaveModal, setIsOpenSaveModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IPeople | null>(null);
  const [error, setError] = useState<string>("");
  const [form] = Form.useForm();
  const _peopleService = peopleService();
  const { data, refetch } = useQuery({
    queryKey: ["peoplelist"],
    queryFn: async () => await _peopleService.getAll(),
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
      name: "age",
      label: "Age",
      rules: [{ required: true, message: "Please input the age!" }],
      component: <Input type="number" />,
    },
    {
      name: "contact",
      label: "Contact",
      rules: [{ required: true, message: "Please input the contact!" }],
      component: <Input type="number" />,
    },
    {
      name: "ministry",
      label: "Ministry",
      rules: [{ required: true, message: "Please input the ministry!" }],
      component: (
        <Select placeholder="Select Ministry">
          <Select.Option value="Victory Group Leaders">Victory Group Leaders</Select.Option>
          <Select.Option value="Ushering Ministry">Ushering Ministry</Select.Option>
          <Select.Option value="Music Ministry">Music Ministry</Select.Option>
          <Select.Option value="Kids Ministry">Kids Ministry</Select.Option>
          <Select.Option value="Stage Management">Stage Management</Select.Option>
          <Select.Option value="Technical Support">Technical Support</Select.Option>
          <Select.Option value="Communication">Communication</Select.Option>
          <Select.Option value="Prayer Ministry">Prayer Ministry</Select.Option>
          <Select.Option value="Admin Support">Admin Support</Select.Option>
          <Select.Option value="Real Life Coaches">Real Life Coaches</Select.Option>
          <Select.Option value="Special Project Teams">Special Project teams</Select.Option>
        </Select>
      ),
    },
    {
      name: "gender",
      label: "Gender",
      rules: [{ required: true, message: "Please input the gender!" }],
      component: (
        <Select placeholder="Select Gender">
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
        </Select>
      ),
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

  const columns: ColumnsType<IPeople> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Contact",
      dataIndex: "contact",
    },
    {
      title: "Ministry",
      dataIndex: "ministry",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
    },
    {
      title: "Actions",
      render: (data: IPeople) => (
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

  const handleSave = async (values: IPeople) => {
    setError("");
    try {
      if (selectedUser) {
        await _peopleService.update(selectedUser.id || "", values);
      } else {
        await _peopleService.add(values);
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
        await _peopleService.deleteById(selectedUser?.id || "");
        refetch();
        setIsOpenDeleteModal(false);
      }}
      onCancel={() => setIsOpenDeleteModal(false)}
    ></Modal>
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
