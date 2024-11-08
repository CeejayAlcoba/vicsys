import { useQuery } from "@tanstack/react-query";
import userService from "../../../firebase/services/userService";
import { Button, Modal, Form, Input, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import { IUser } from "../../../interfaces/firebase/IUser";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import DataTable from "../../../components/DataTable";
import { FormGroupItemsProps } from "../../../components/FormControl";
import accountService from "../../../firebase/services/accountService";

import SaveUserModal from "./modal/SaveUserModal";
import childrenService from "../../../firebase/services/childrenService";
import Swal from "sweetalert2";
import ChildrenModal, {
  useChildrenModal,
} from "../../../components/ChildrenModal";
import { Role } from "../../../interfaces/firebase/Role";
import { IMyPuchaseEvent } from "../../../interfaces/firebase/INonTechUser";
import MyPurchaseEventCollapse from "../../../components/MyPurchaseEventCollapse";
export default function UserPage() {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isOpenSaveModal, setIsOpenSaveModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const [error, setError] = useState<string>("");
  const [form] = Form.useForm();
  const _userService = userService();
  const _childrenService = childrenService();
  const _accounService = accountService();
  const { data: users, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await _userService.getAll(),
    initialData: [],
  });
  const {
    children,
    setChildren,
    isChildrenModalVisible,
    setIsChildrenModalVisible,
    childData,
  } = useChildrenModal();
  useQuery({
    queryKey: ["users", selectedUser],
    queryFn: async () => {
      const result = await _childrenService.getByUserId(selectedUser?.id ?? "");
      setChildren(result);
      return result;
    },

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
    {
      name: "role",
      label: "Role",
      rules: [{ required: true, message: "Please input the role!" }],
      component: (
        <Select placeholder="Select Role">
          <Select.Option value={Role.Attendee}>{Role.Attendee}</Select.Option>
          <Select.Option value={Role.Volunteer}>{Role.Volunteer}</Select.Option>
          <Select.Option value={Role.Admin}>{Role.Admin}</Select.Option>
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
      title: "My Purchase Events",
      dataIndex: "myPurchaseEvents",
      render: (events: IMyPuchaseEvent[]) => (
        <MyPurchaseEventCollapse purchaseEvents={events} />
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role: string) => {
        if (role == Role.Attendee)
          return <span className="text-success">{role}</span>;
        if (role == Role.Volunteer)
          return <span className="text-info">{role}</span>;
        if (role == Role.Admin)
          return <span className="text-primary">{role}</span>;
        if (role == Role.SuperAdmin)
          return <span className="text-danger">{role}</span>;
        return role;
      },
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
        await _childrenService.updateManyByUserId(
          selectedUser.id || "",
          children
        );
      } else {
        await _accounService.signup(values);
      }
      Swal.fire({
        icon: "success",
        title: "User successfully saved!",
        showConfirmButton: false,
        timer: 1500,
      });
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

      <SaveUserModal
        form={form}
        handleSave={handleSave}
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
        isOpenSaveModal={isOpenSaveModal}
        setIsOpenSaveModal={setIsOpenSaveModal}
        setIsChildrenModalVisible={setIsChildrenModalVisible}
        updateFromGroups={updateFromGroups}
        addFormGroups={addFormGroups}
        children={children}
        error={error}
      />
      <ChildrenModal
        children={children}
        setChildren={setChildren}
        isModalVisible={isChildrenModalVisible}
        setIsModalVisible={setIsChildrenModalVisible}
        childData={childData}
      />
      <DeleteModalConfirmation />

      <DataTable dataSource={users} columns={columns} />
    </>
  );
}
