import { useState } from "react";
import { Layout } from "antd";
import { SidebarContext } from "./contexts/useSidebarContext";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import HeaderLayout from "./HeaderLayout";

const { Content } = Layout;

export default function Main() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout style={{ marginInlineStart: collapsed ? 0 : 200 }}>
          <HeaderLayout />
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div className="container-fluid">
              <Outlet />
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </SidebarContext.Provider>
  );
}
