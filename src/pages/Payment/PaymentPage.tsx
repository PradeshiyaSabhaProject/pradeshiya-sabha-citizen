import { MdElectricBolt, MdCategory } from "react-icons/md";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import PaymentCard from "../../components/PaymentCard/PaymentCard";
import type { PaymentCardData } from "../../types/payment";
import "./PaymentPage.css";

const paymentCategories: PaymentCardData[] = [
  {
    id: "utility",
    title: "Utility",
    description:
      "Pay your water, electricity, and other utility bills issued by the municipal authority quickly and securely.",
    icon: MdElectricBolt,
    path: "/payments/utility",
  },
  {
    id: "miscellaneous",
    title: "Miscellaneous",
    description:
      "Handle building permits, trade licenses, character certificates, fines, market stall fees, and other municipal charges.",
    icon: MdCategory,
    path: "/payments/miscellaneous",
  },
];

const PaymentPage: React.FC = () => {
  return (
    <div className="payment-page">
      {/* Page background strip */}
      <div className="payment-page__hero" aria-hidden="true" />

      <div className="payment-page__container">
        <Breadcrumb items={[{ label: "Payments" }]} />

        <div className="payment-page__header">
          <div className="payment-page__header-badge">
            <span>Payment Portal</span>
          </div>
          <h1 className="payment-page__title">Make a Payment</h1>
          <p className="payment-page__description">
            Select a payment category below to proceed with your municipal payment.
            All transactions are secured and processed instantly.
          </p>
        </div>

        <div className="payment-page__cards">
          {paymentCategories.map((card) => (
            <PaymentCard key={card.id} card={card} />
          ))}
        </div>

        <div className="payment-page__info">
          <div className="payment-page__info-item">
            <div className="payment-page__info-dot payment-page__info-dot--green" />
            <span>Secured by 256-bit encryption</span>
          </div>
          <div className="payment-page__info-item">
            <div className="payment-page__info-dot payment-page__info-dot--blue" />
            <span>Instant payment confirmation</span>
          </div>
          <div className="payment-page__info-item">
            <div className="payment-page__info-dot payment-page__info-dot--yellow" />
            <span>Official municipal receipts issued</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
