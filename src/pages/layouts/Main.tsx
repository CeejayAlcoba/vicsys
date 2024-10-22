import { useState } from "react";
import { Layout } from "antd";
import { SidebarContext } from "./contexts/useSidebarContext";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import HeaderLayout from "./HeaderLayout";
import { TicketQrContext } from "../private/ticket/qr/useTicketQrContext";

const { Content } = Layout;

export default function Main() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const open = async (qrValue: string) => {
    const qrValEncoded = encodeURI(qrValue);
    navigate(`/ticket-qr/${qrValEncoded}`);
  };

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <TicketQrContext.Provider value={{ open }}>
        <Layout style={{ minHeight: "100vh" }}>
          <Sidebar />
          <Layout
            style={{
              marginInlineStart: collapsed ? 0 : 200,
            }}
          >
            <HeaderLayout />
            <Content style={{ margin: "24px 16px 0" }}>
              <div className="container-fluid">
                <Outlet />
              </div>
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </TicketQrContext.Provider>
    </SidebarContext.Provider>
  );
}
