import { Button, Form, Input, Modal, Radio } from "antd";
import IChild from "../../../../interfaces/firebase/IChild";
import FormGroupItems, {
  FormGroupItemsProps,
} from "../../../../components/FormControl";
import { useForm } from "antd/es/form/Form";
import { ColumnsType } from "antd/es/table";
import DataTable from "../../../../components/DataTable";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

type AddChildModalProps = {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setChildren: React.Dispatch<React.SetStateAction<IChild[]>>;
  setChildData: React.Dispatch<React.SetStateAction<IChild>>;
  childData: IChild;
  children: IChild[];
};

export default function AddChildModal(props: AddChildModalProps) {
  const {
    isModalVisible,
    setChildren,
    setChildData,
    childData,
    children,
    setIsModalVisible,
  } = props;

  const [form] = useForm();
  const handleRemoveChild = (index: number) => {
    setChildren(children.filter((_, i) => i !== index));
  };
  const childFormGroupItems: FormGroupItemsProps[] = [
    {
      label: "First Name",
      name: "firstName",
      rules: [{ required: true, message: "Please input the first name!" }],
      component: <Input placeholder="First Name" />,
    },
    {
      label: "Last Name",
      name: "lastName",
      rules: [{ required: true, message: "Please input the last name!" }],
      component: <Input placeholder="Last Name" />,
    },
    {
      label: "Nickname",
      name: "nickname",
      rules: [{ required: true, message: "Please input the nickname!" }],
      component: <Input placeholder="Nickname" />,
    },
    {
      label: "Date of Birth",
      name: "birthday",
      rules: [{ required: true, message: "Please input the date of birth!" }],
      component: <Input type="date" placeholder="Date of Birth" />,
    },
    {
      label: "Gender",
      name: "gender",
      rules: [{ required: true, message: "Please select the gender!" }],
      component: (
        <Radio.Group>
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
        </Radio.Group>
      ),
    },
    {
      label: "Age",
      name: "age",
      rules: [{ required: true, message: "Please input the age!" }],
      component: <Input type="number" placeholder="Age" />,
    },
    {
      label: "Food Allergies",
      name: "hasFoodAllergies",
      rules: [{ required: true, message: "Please indicate food allergies!" }],
      component: (
        <Radio.Group
          onChange={(e) => {
            setChildData((prev) => ({
              ...prev,
              hasFoodAllergies: e.target.value,
            }));
            form.validateFields(["foodAllergies"]);
          }}
        >
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      ),
    },
    {
      label: "List of Food Allergies",
      name: "foodAllergies",
      rules: [
        {
          required: false,
          message: "Please list the food allergies!",
          validator: (_, value) => {
            const hasAllergies = form.getFieldValue("hasFoodAllergies");
            if (hasAllergies && !value) {
              return Promise.reject(
                new Error("Please list the food allergies!")
              );
            }
            return Promise.resolve();
          },
        },
      ],
      component: (
        <Input
          placeholder="Food Allergies"
          disabled={!form.getFieldValue("hasFoodAllergies")}
        />
      ),
    },
  ];

  const onOk = async () => {
    const values: IChild = await form.validateFields();
    setChildren((prev) => [...prev, values]);
    form.resetFields();
  };
  const columns: ColumnsType<IChild> = [
    {
      title: "Name",
      render: (data: IChild) => (
        <>
          {data.lastName}, {data.firstName}
        </>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
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
      title: "Food Allergies",
      dataIndex: "hasFoodAllergies",
      render: (hasFoodAllergies: boolean) => (
        <>
          {hasFoodAllergies ? (
            <CheckCircleOutlined style={{ color: "green" }} />
          ) : (
            <CloseCircleOutlined style={{ color: "red" }} />
          )}
        </>
      ),
    },
    {
      title: "Actions",
      render: (data: IChild, _: any, index: number) => (
        <>
          <Button type="link" danger onClick={() => handleRemoveChild(index)}>
            Remove
          </Button>
        </>
      ),
    },
  ];

  return (
    <Modal
      title="Children"
      width={1200}
      visible={isModalVisible}
      okText="Add"
      onOk={onOk}
      onCancel={() => setIsModalVisible(false)}
    >
      <div className="d-flex justify-content-center gap-5">
        <DataTable
          columns={columns}
          dataSource={children}
          style={{ width: 700 }}
        />
        <Form
          layout="vertical"
          style={{ width: 400 }}
          form={form}
          initialValues={childData}
        >
          <FormGroupItems items={childFormGroupItems} />
        </Form>
      </div>
    </Modal>
  );
}
