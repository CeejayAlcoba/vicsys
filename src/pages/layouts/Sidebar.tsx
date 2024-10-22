import { Menu, Modal } from "antd";
import Sider from "antd/es/layout/Sider";
import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
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
      icon: <PieChartOutlined />,
      onClick: () => navigate("/"),
    },
    {
      label: "People",
      key: "2",
      icon: <UserOutlined />,
      onClick: () => navigate("people"),
    },
    {
      label: "Users",
      key: "3",
      icon: <UserOutlined />,
      onClick: () => navigate("user"),
    },
    {
      label: "Events",
      key: "3",
      icon: <UserOutlined />,
      onClick: () => navigate("event"),
    },
    {
      label: "Non-Tech Users",
      key: "4",
      icon: <UserOutlined />,
      onClick: () => navigate("nontechuser"),
    },
    {
      label: "Auth",
      key: "sub1",
      icon: <DesktopOutlined />,
      children: [
        {
          label: "Login",
          key: "5",
          onClick: () => navigate("login"),
        },
        {
          label: "Signup",
          key: "6",
          onClick: () => navigate("signup"),
        },
      ],
    },
    {
      label: "Test",
      key: "sub2",
      icon: <DesktopOutlined />,
      children: [
        {
          label: "QR",
          key: "7",
          onClick: () => navigate("test"),
        },
      ],
    },
    {
      label: "Logout",
      key: "8",
      icon: <DesktopOutlined />,
      onClick: () => {
        handleLogout();
      },
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
