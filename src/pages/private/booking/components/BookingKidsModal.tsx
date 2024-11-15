import { Button, Card, Modal, Table, message } from "antd";
import { IEvent } from "../../../../interfaces/firebase/IEvent";
import { useQuery } from "@tanstack/react-query";
import childrenService from "../../../../firebase/services/childrenService";
import { useEffect, useState } from "react";
import IChild from "../../../../interfaces/firebase/IChild";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import DataTable, { ColumnConfig } from "../../../../components/DataTable";
import bookingService from "../../../../firebase/services/bookingService";
import Swal from "sweetalert2";
import useUserContext from "../../../../contexts/useUserContext";

interface IChildBook extends IChild {
  status?: "New" | "Current";
}

export default function BookingKidsModal(props: {
  selectedEvent: IEvent | null;
  setSelectedEvent: (value: IEvent) => void;
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
}) {
  const { selectedEvent, isOpen, setIsOpen } = props;
  const { user } = useUserContext();
  if (!user?.uid) return;

  const _childrenService = childrenService();
  const [newBookChildren, setNewBookChildren] = useState<IChildBook[]>([]);
  const [bookedChildren, setBookedChildren] = useState<IChild[]>([]);
  const [children, setChildren] = useState<IChild[]>([]);
  const _bookingService = bookingService();

  const handlGetCurrentChildren = async () => {
    const currentChildren = await _childrenService.getByEventId(
      selectedEvent?.id || ""
    );
    setBookedChildren(currentChildren);

    const response = await _childrenService.getAll();
    const filteredChildren = response.filter(
      (child) =>
        !currentChildren.some((currentChild) => currentChild.id === child.id)
    );

    setChildren(filteredChildren ?? []);
  };
  useEffect(() => {
    if (isOpen) {
      handlGetCurrentChildren();
    }

    return () => {
      setChildren([]);
      setBookedChildren([]);
      setNewBookChildren([]);
    };
  }, [isOpen]);

  const handleBookChild = (child: IChild) => {
    setNewBookChildren((prev) => [...prev, { ...child, status: "New" }]);
    setChildren(children.filter((c) => c.id !== child.id));
    message.success(`${child.firstName} has been booked successfully!`);
  };

  const handleRemoveBooking = (child: IChild) => {
    setChildren([...children, child]);
    setNewBookChildren(newBookChildren.filter((c) => c.id !== child.id));
    message.info(`${child.firstName}'s booking has been removed.`);
  };

  const handleBookChildren = async () => {
    if (!selectedEvent?.id || newBookChildren.length == 0)
      throw new Error("selectedEvent.id or newBookChildren must not null");
    await _bookingService.bookChildren(selectedEvent.id, newBookChildren);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Children successfully booked",
      showConfirmButton: false,
      timer: 1500,
    });
    setIsOpen(false);
  };

  const availableChildrenColumns: ColumnConfig[] = [
    // {
    //   title: "Parent",
    //   dataIndex: "parentName",
    // },
    {
      title: "Name",
      dataIndex: "",
      render: (value: IChild) => `${value.lastName}, ${value.firstName}`,
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Action",
      dataIndex: "",
      render: (_: any, record: IChild) => (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => handleBookChild(record)}
        >
          Book
        </Button>
      ),
    },
  ];

  const bookedChildrenColumns: ColumnConfig[] = [
    // {
    //   title: "Parent",
    //   dataIndex: "parentName",
    // },
    {
      title: "Name",
      dataIndex: "",
      render: (value: IChild) => `${value.lastName}, ${value.firstName}`,
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Action",
      dataIndex: "",
      render: (child: IChildBook) => {
        if (child?.status == "New")
          return (
            <Button
              danger
              icon={<MinusOutlined />}
              onClick={() => handleRemoveBooking(child)}
            />
          );
        return "Current";
      },
    },
  ];

  return (
    <Modal
      open={isOpen}
      onOk={handleBookChildren}
      onCancel={() => setIsOpen(false)}
      okText="Book now"
      width={1500}
    >
      <Card>
        <div>
          <Card title="My Available Children">
            <DataTable
              columns={availableChildrenColumns}
              dataSource={children}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </Card>

          <Card title="My Booked Children">
            <DataTable
              columns={bookedChildrenColumns}
              dataSource={[...newBookChildren, ...bookedChildren]}
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </div>
      </Card>
    </Modal>
  );
}
