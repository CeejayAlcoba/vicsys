import { createContext, useContext } from "react";

type TicketQrContextType = {
  open: (qrValue: string) => void;
};

export const TicketQrContext = createContext<TicketQrContextType | null>(null);

export default function useTicketQrContext() {
  const context = useContext(TicketQrContext);
  if (!context) {
    throw new Error(
      "useTicketQrContext must be used within a TicketQrProvider"
    );
  }
  return context;
}
