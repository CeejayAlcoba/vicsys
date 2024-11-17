// NotificationSender.js

import { useQuery } from "@tanstack/react-query";
import notificationService from "../../../firebase/services/notificationService";

const NotificationCreate = () => {
  const _notificationService = notificationService();
  const { isFetching } = useQuery({
    queryKey: ["test"],
    queryFn: _notificationService.sendMessage,
  });
  if (isFetching) return <h1>loading</h1>;
  return <h1>done</h1>;
};

export default NotificationCreate;
