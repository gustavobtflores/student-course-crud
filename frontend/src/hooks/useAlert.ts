import { useAlertContext } from "../contexts/AlertContext";

interface Alert {
  title: string;
  description: string;
  type: "success" | "error";
}

export function useAlert() {
  const { alerts, setAlerts } = useAlertContext();

  function alert(data: Alert) {
    setAlerts((prev) => {
      const newAlerts = prev.slice();
      newAlerts.push(data);

      return newAlerts;
    });
  }

  function clear() {
    setAlerts([]);
  }

  return { alert, clear, alerts };
}
