import { useQuery } from "@tanstack/react-query";
import nonTechUserService from "../../../firebase/services/nonTechUserService";
import {
  Button,
  Modal,
  Form,
  Input,
  message,
  Card,
  Image,
  Typography,
  Tag,
  Select,
  Collapse,
  Alert,
} from "antd";
import { ColumnsType } from "antd/es/table";
import {
  INonTechUser,
  IMyPuchaseEvent,
} from "../../../interfaces/firebase/INonTechUser";
import {
  BookOutlined,
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import DataTable from "../../../components/DataTable";
import FormGroupItems, {
  FormGroupItemsProps,
} from "../../../components/FormControl";
import eventService from "../../../firebase/services/eventService";
import { IEvent, ITicketCategory } from "../../../interfaces/firebase/IEvent";
import { convertUnixToTimeText } from "../../../utils/dateTimeFormat";
import { Timestamp } from "firebase/firestore";
import MyPurchaseEventCollapse from "../../../components/MyPurchaseEventCollapse";
import { TicketStatus } from "../../../interfaces/firebase/ITicket";
import { v4 as uuidv4 } from "uuid";

export default function NonTechUserPage() {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isOpenSaveModal, setIsOpenSaveModal] = useState<boolean>(false);
  const [isOpenAssignEventModal, setIsOpenAssignEventModal] =
    useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<INonTechUser | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [error, setError] = useState<string>("");
  const [form] = Form.useForm();
  const _nonTechUserService = nonTechUserService();
  const _eventservice = eventService();
  const { data: nontechuser, refetch: refetchnontechuser } = useQuery({
    queryKey: ["nontechuser"],
    queryFn: async () => await _nonTechUserService.getAll(),
    initialData: [],
  });

  const { data: event, refetch: refetchevent } = useQuery({
    queryKey: ["events"],
    queryFn: async () => await _eventservice.getAll(),
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

  const columns: ColumnsType<INonTechUser> = [
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
      title: "My Purchases",
      render: (data: INonTechUser) => (
        <MyPurchaseEventCollapse
          refetch={refetchnontechuser}
          userId={data.id ?? ""}
          purchaseEvents={data.myPurchaseEvents ?? []}
        />
      ),
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
          <Button
            type="primary"
            shape="circle"
            icon={<BookOutlined />}
            style={{
              marginLeft: 8,
              backgroundColor: "#52c41a",
              borderColor: "#52c41a",
            }}
            onClick={() => {
              setSelectedUser(data);
              setIsOpenAssignEventModal(true);
            }}
          />
        </>
      ),
    },
  ];

  const handleSaveUser = async (values: INonTechUser) => {
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
      refetchnontechuser();
      setIsOpenSaveModal(false);
    }
  };

  const handleSaveToPurchase = async (
    event: IEvent,
    selectedTicketCategory: ITicketCategory
  ) => {
    if (!selectedUser?.id) return;

    try {
      const purchaseEvent: IMyPuchaseEvent = {
        eventId: event.id ?? "",
        imageUrl: event?.image ?? "",
        isPaid: false,
        ticketId: uuidv4(),
        location: event?.venue ?? "",
        status: TicketStatus.Pending,
        ticketName: selectedTicketCategory.ticketName,
      };

      const updatedUser: INonTechUser = {
        ...selectedUser,
        myPurchaseEvents: [
          ...(selectedUser.myPurchaseEvents || []),
          purchaseEvent,
        ],
      };

      await _nonTechUserService.update(selectedUser.id, updatedUser);
    } catch (error) {
      console.error("Failed to save purchase:", error);
      throw error;
    }
  };

  const handleSaveToAttendees = async (eventId: string) => {
    if (!selectedUser?.id) return;

    try {
      const selectedEvent = event.find((e) => e.id === eventId);
      if (!selectedEvent) throw new Error("Event not found");
      await _eventservice.addAttendee(eventId, selectedUser.id);
    } catch (error) {
      console.error("Failed to save attendee:", error);
      throw error;
    }
  };

  const DeleteModalConfirmation = () => (
    <Modal
      title="Are you sure you want to delete?"
      open={isOpenDeleteModal}
      onOk={async () => {
        await _nonTechUserService.deleteById(selectedUser?.id || "");
        refetchnontechuser();
        setIsOpenDeleteModal(false);
      }}
      onCancel={() => setIsOpenDeleteModal(false)}
    >
      <p>Email: {selectedUser?.email}</p>
    </Modal>
  );

  const AssignToEventModal = () => {
    console.log(selectedEvent);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
      null
    );

    const handleBooking = async () => {
      if (!selectedEventId || !selectedCategoryId) {
        message.error("Please select an event and ticket category");
        return;
      }

      try {
        const selectedEvent = event.find((e) => e.id === selectedEventId);
        if (!selectedEvent) throw new Error("Event not found");

        const selectedCategory = selectedEvent.ticketCategories.find(
          (tc) => tc.ticketCategoryId === selectedCategoryId
        );
        if (!selectedCategory) throw new Error("Ticket category not found");

        await Promise.all([
          handleSaveToPurchase(selectedEvent, selectedCategory),
          handleSaveToAttendees(selectedEventId),
        ]);

        await Promise.all([refetchnontechuser(), refetchevent()]);
        message.success("Event booked successfully!");
        setIsOpenAssignEventModal(false);
        setSelectedEvent(null);
        setSelectedEventId(null);
        setSelectedCategoryId(null);
      } catch (error) {
        console.error("Failed to book event:", error);
        message.error("Failed to book event. Please try again.");
      }
    };

    return (
      <Modal
        title="Book an Event"
        open={isOpenAssignEventModal}
        onOk={handleBooking}
        onCancel={() => {
          setIsOpenAssignEventModal(false);
          setSelectedEvent(null);
          setSelectedEventId(null);
          setSelectedCategoryId(null);
        }}
        width={600}
      >
        <div className="space-y-4">
          {event?.map((events) => (
            <Card
              key={events.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedEventId === events.id
                  ? "border-2 border-blue-500 bg-blue-50 shadow-lg transform scale-[1.02]"
                  : "border border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => {
                if (events.id) {
                  setSelectedEventId(events.id);
                }
              }}
            >
              <div className="flex items-start gap-4">
                <Image
                  src={events.image}
                  alt={events.eventName}
                  style={{ width: 120, height: 80, objectFit: "cover" }}
                  fallback="data:image/png;base64,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"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <Typography.Title level={5} className="!mb-1">
                        {events.eventName}
                      </Typography.Title>
                      <Typography.Text type="secondary">
                        {events.venue}
                      </Typography.Text>
                    </div>
                    <div className="flex flex-col gap-1">
                      {events.ticketCategories?.map((category, index) => (
                        <Tag
                          key={index}
                          color={
                            selectedEventId === events.id &&
                            selectedCategoryId === category.ticketCategoryId
                              ? "green"
                              : "blue"
                          }
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (events.id) {
                              setSelectedEventId(events.id);
                              setSelectedCategoryId(
                                category.ticketCategoryId || null
                              );
                            }
                          }}
                        >
                          {category.ticketName}: {category.ticketRemaining}/
                          {category.ticketTotal} Available
                        </Tag>
                      ))}
                    </div>
                  </div>
                  <Typography.Paragraph className="mt-2" ellipsis={{ rows: 2 }}>
                    {events.description}
                  </Typography.Paragraph>
                  <div className="flex justify-between items-start mt-2">
                    <Typography.Text>
                      <CalendarOutlined className="mr-2" />
                      {convertUnixToTimeText(events.startTime)}
                    </Typography.Text>
                    <div className="flex flex-col items-end">
                      {events.ticketCategories?.map((category, index) => (
                        <Typography.Text
                          key={index}
                          className={
                            selectedEventId === events.id &&
                            selectedCategoryId === category.ticketCategoryId
                              ? "font-bold text-blue-600"
                              : ""
                          }
                        >
                          {category.ticketName}: ₱{category.ticketPrice}
                        </Typography.Text>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {selectedEventId && !selectedCategoryId && (
          <Alert
            message="Please select a ticket category"
            type="info"
            showIcon
            className="mt-4"
          />
        )}

        {selectedEventId && selectedCategoryId && (
          <Alert
            message="Ready to book!"
            description="Click OK to confirm your booking."
            type="success"
            showIcon
            className="mt-4"
          />
        )}
      </Modal>
    );
  };

  const SaveUserModal = () => {
    const handleFormSubmit = async () => {
      try {
        const values = await form.validateFields();
        await handleSaveUser(values);
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
      <AssignToEventModal />
      <DataTable dataSource={nontechuser} columns={columns} />
    </>
  );
}
