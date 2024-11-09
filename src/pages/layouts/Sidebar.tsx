import { Menu, Modal } from "antd";
import Sider from "antd/es/layout/Sider";
import {
  PieChartOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  QrcodeOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import useSidebarContext from "./contexts/useSidebarContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import accountService from "../../firebase/services/accountService";

type MenuItem = Required<MenuProps>["items"][number];

export default function Sidebar() {
  const navigate = useNavigate();
  const [isLogoutModelOpen, setIsLogoutModelOpen] = useState(false);
  const _accountService = accountService();
  const items: MenuItem[] = [
    {
      label: "Dashboard",
      key: "1",
      icon: <HomeOutlined />,
      onClick: () => navigate("/"),
    },
    {
      label: "Peoples",
      key: "2",
      icon: <UserOutlined />,
      onClick: () => navigate("users"),
    },
    {
      label: "Non-Tech Users",
      key: "3",
      icon: <UserOutlined />,
      onClick: () => navigate("nontechusers"),
    },
    {
      label: "Events",
      key: "4",
      icon: <PieChartOutlined />,
      onClick: () => navigate("events"),
    },

    {
      label: "Account",
      key: "sub1",
      icon: <SettingOutlined />,
      children: [
        {
          label: "Settings",
          key: "5",
          icon: <SettingOutlined />,
          onClick: () => navigate("account-settings"),
        },
        {
          label: "Logout",
          key: "6",
          icon: <LogoutOutlined />,
          onClick: () => handleLogout(),
        },
      ],
    },
    {
      label: "Test",
      key: "sub2",
      icon: <QrcodeOutlined />,
      children: [
        {
          label: "QR",
          key: "7",
          onClick: () => navigate("test"),
        },
      ],
    },
    {
      label: "Ticket Categories",
      key: "8",
      icon: <UserOutlined />,
      onClick: () => navigate("ticket-categories"),
    },
    {
      label: "Kids list",
      key: "9",
      icon: <UserOutlined />,
      onClick: () => navigate("kids-list"),
    },
    {
      label: "My Purchase",
      key: "10",
      icon: <ShoppingCartOutlined />,
      onClick: () => navigate("my-purchase"),
    },
  ];

  const { collapsed, setCollapsed } = useSidebarContext();
  const siderStyle: React.CSSProperties = {
    overflow: "auto",
    position: "fixed",
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: "thin",
    scrollbarColor: "unset",
  };

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Logout",
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        await _accountService.logout();
        navigate("/login");
      }
    });
  };

  const LogoutConfimationModal = () => {
    return (
      <Modal
        open={isLogoutModelOpen}
        onOk={handleLogout}
        onCancel={() => setIsLogoutModelOpen(false)}
      >
        <center>
          <h4>Logout</h4>
          <p>Are you sure you want to logout?</p>
        </center>
      </Modal>
    );
  };

  return (
    <>
      <LogoutConfimationModal />
      {!collapsed && (
        <Sider
          style={siderStyle}
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu theme="dark" mode="inline" items={items} />
        </Sider>
      )}
    </>
  );
}
