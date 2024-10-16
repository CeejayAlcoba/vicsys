import { Button, Layout, theme } from "antd";
import useSidebarContext from "./contexts/useSidebarContext";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import vicsys1 from "../../assets/vicsys1.png";

const { Header } = Layout;
export default function HeaderLayout() {
  const { collapsed, setCollapsed } = useSidebarContext();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
        display: "flex",
        justifyContent: " space-between",
      }}
    >
      <div>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <img src={vicsys1} style={{ width: 120 }} />
      </div>
      <div style={{ marginRight: 40 }}>
        <UserOutlined
          style={{
            fontSize: "16px",
            marginRight: 10,
          }}
        />
        Admin
      </div>
    </Header>
  );
}
