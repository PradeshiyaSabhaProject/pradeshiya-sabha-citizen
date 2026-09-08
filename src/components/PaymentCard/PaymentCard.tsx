import { useNavigate } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import type { PaymentCardData } from "../../types/payment";
import "./PaymentCard.css";

interface PaymentCardProps {
  card: PaymentCardData;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ card }) => {
  const navigate = useNavigate();
  const Icon = card.icon;

  const handleClick = (): void => {
    navigate(card.path);
  };

  return (
    <article
      className="payment-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${card.title} – ${card.description}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick();
      }}
    >
      <div className="payment-card__icon-wrap">
        <Icon className="payment-card__icon" aria-hidden="true" />
      </div>

      <div className="payment-card__body">
        <h3 className="payment-card__title">{card.title}</h3>
        <p className="payment-card__desc">{card.description}</p>
      </div>

      <div className="payment-card__arrow" aria-hidden="true">
        <MdArrowForward />
      </div>
    </article>
  );
};

export default PaymentCard;
