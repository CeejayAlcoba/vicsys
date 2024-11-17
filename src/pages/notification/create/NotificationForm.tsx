import React, { useState } from "react";

import { Button, Input } from "antd";
import axios from "axios";

const NotificationCreate: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendNotification = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/send-notification",
        {
          title,
          body,
          token,
        }
      );
      console.log(response.data);
      alert("Notification sent successfully");
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to send notification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Send Push Notification</h2>
      <Input
        placeholder="Notification Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Input
        placeholder="Notification Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Input
        placeholder="Device Registration Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button
        type="primary"
        onClick={handleSendNotification}
        loading={loading}
        disabled={loading}
      >
        Send Notification
      </Button>
    </div>
  );
};

export default NotificationCreate;
