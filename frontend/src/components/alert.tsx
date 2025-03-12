import { Check, CircleX, X } from "lucide-react";
import { useAlert } from "../hooks/useAlert";

const icons = {
  success: Check,
  error: CircleX,
};

export function Alert() {
  const { alerts } = useAlert();

  if (!alerts.length) {
    return null;
  }

  const { title, description, type } = alerts[0];
  const Icon = icons[type];

  return (
    <div className={`alert alert--${type}`}>
      <div className="alert__content">
        <Icon />
        <div className="alert__text">
          <strong className="alert__title">{title}</strong>
          <span className="alert__description">{description}</span>
        </div>
      </div>
      <button className="alert__dismiss">
        <X />
      </button>
    </div>
  );
}
