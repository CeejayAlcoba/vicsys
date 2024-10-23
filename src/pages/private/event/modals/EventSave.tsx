import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Space,
  Modal,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import useEventContext from "../useEventContext";
import { useEffect } from "react";
import { convertUnixToDate } from "../../../../utils/dateTimeFormat";
import EventImageUpload from "../components/EventImageUpload";
import { IEventSave } from "../../../../interfaces/firebase/IEvent";
import eventService from "../../../../firebase/services/eventService";
import Swal from "sweetalert2";

export default function EventSaveModal() {
  const {
    isSaveModalOpen,
    setIsSaveModalOpen,
    selectedEvent,
    setImageUpload,
    setSelectedEvent,
    imageUpload,
    refetch,
  } = useEventContext();
  const _eventService = eventService();
  const [form] = Form.useForm();
  const onFinish = async (values: IEventSave) => {
    try {
      const formattedValues: IEventSave = {
        ...values,
        image: imageUpload ?? values.image,
      };
      form.validateFields();
      if (selectedEvent?.id) {
        await _eventService.update(selectedEvent.id, formattedValues);
      } else {
        await _eventService.add(formattedValues);
      }
      setIsSaveModalOpen(false);
      setImageUpload(null);
      setSelectedEvent(null);
      refetch();
      Swal.fire({
        icon: "success",
        title: "Event successfully saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (_e: any) {
      let e: Error = _e;
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (selectedEvent) {
      const formattedValues = {
        ...selectedEvent,
        startTime: convertUnixToDate(selectedEvent.startTime),
        endTime: convertUnixToDate(selectedEvent.endTime),
      };
      form.setFieldsValue(formattedValues);
      return;
    }
    form.setFieldsValue({
      eventName: "",
      description: "",
      endTime: "",
      startTime: "",
      image: "",
      venue: "",
      ticketCategories: [],
    });
  }, [isSaveModalOpen]);

  return (
    <Modal
      title={selectedEvent ? "Update Event" : "Create Event"}
      open={isSaveModalOpen}
      onCancel={() => {
        setIsSaveModalOpen(false);
      }}
      footer={null}
    >
      <Form
        name="event-create"
        layout="vertical"
        form={form}
        onFinish={onFinish}
      >
        <div className="overflow-auto" style={{ height: 400 }}>
          {/* Upload Image */}
          <EventImageUpload initialSrc={selectedEvent?.image} />

          <Form.Item
            label="Event Name"
            name="eventName"
            rules={[
              { required: true, message: "Please input the event name!" },
            ]}
          >
            <Input placeholder="Enter event name" />
          </Form.Item>

          {/* Venue */}
          <Form.Item
            label="Venue"
            name="venue"
            rules={[{ required: true, message: "Please input the venue!" }]}
          >
            <Input placeholder="Enter venue" />
          </Form.Item>

          {/* Description */}
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input the event description!",
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter event description" />
          </Form.Item>

          <div className="d-flex gap-2">
            {/* Start Time */}
            <Form.Item
              label="Start Time"
              name="startTime"
              rules={[
                { required: true, message: "Please select the start time!" },
              ]}
            >
              <DatePicker
                showTime
                format="MM/DD/YYYY HH:mm A"
                placeholder="Select start time"
              />
            </Form.Item>

            {/* End Time */}
            <Form.Item
              label="End Time"
              name="endTime"
              rules={[
                { required: true, message: "Please select the end time!" },
              ]}
            >
              <DatePicker
                showTime
                format="MM/DD/YYYY HH:mm A"
                placeholder="Select end time"
              />
            </Form.Item>
          </div>

          {/* Ticket Categories */}
          <Form.List name="ticketCategories">
            {(fields, { add, remove }) => (
              <>
                <label>Ticket Categories</label>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "category"]}
                      rules={[{ required: true, message: "Missing category" }]}
                    >
                      <Input placeholder="Category" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "price"]}
                      rules={[{ required: true, message: "Missing price" }]}
                    >
                      <InputNumber
                        placeholder="Price"
                        min={0}
                        formatter={(value) => `₱${value}`}
                      />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, "totalTickets"]}
                      rules={[
                        { required: true, message: "Missing total tickets" },
                      ]}
                    >
                      <InputNumber placeholder="Total Tickets" min={0} />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Ticket Category
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </div>
        <Form.Item className="p-2 d-flex justify-content-end">
          <Button type="primary" htmlType="submit" style={{ marginRight: 5 }}>
            {selectedEvent ? "Update" : "Create"}
          </Button>
          <Button
            onClick={() => {
              setIsSaveModalOpen(false);
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}