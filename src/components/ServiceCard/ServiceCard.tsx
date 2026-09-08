import { useNavigate } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import type { MiscService } from "../../types/service";
import "./ServiceCard.css";

interface ServiceCardProps {
  service: MiscService;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const navigate = useNavigate();
  const Icon = service.icon;

  const handleClick = (): void => {
    navigate(`/payments/miscellaneous/${service.slug}`);
  };

  return (
    <article
      className="service-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${service.title} – ${service.description}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
    >
      <div className="service-card__icon-wrap">
        <Icon className="service-card__icon" aria-hidden="true" />
      </div>

      <div className="service-card__body">
        <h3 className="service-card__title">{service.title}</h3>
        <p className="service-card__desc">{service.description}</p>
      </div>

      <div className="service-card__arrow" aria-hidden="true">
        <MdArrowForward />
      </div>
    </article>
  );
};

export default ServiceCard;
