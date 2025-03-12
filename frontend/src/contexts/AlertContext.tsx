import { createContext, ReactNode, useContext, useState } from "react";

interface Alert {
  title: string;
  description: string;
  type: "success" | "error";
}

interface AlertContextType {
  alerts: Alert[];
  setAlerts: React.Dispatch<React.SetStateAction<Alert[]>>;
}

const AlertContext = createContext<AlertContextType>({} as AlertContextType);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  return (
    <>
      <AlertContext.Provider value={{ alerts, setAlerts }}>{children}</AlertContext.Provider>
    </>
  );
}

export function useAlertContext() {
  const context = useContext(AlertContext);
  return context;
}
