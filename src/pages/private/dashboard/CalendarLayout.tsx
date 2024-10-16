import { Calendar, theme } from "antd";

export default function CalendarLayout() {
  const { token } = theme.useToken();
  const wrapperStyle: React.CSSProperties = {
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div style={wrapperStyle}>
      <Calendar fullscreen={false} />
    </div>
  );
}
