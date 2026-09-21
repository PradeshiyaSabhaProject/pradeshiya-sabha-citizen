import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import { miscServices } from "../../data/miscServices";
import "./MiscellaneousPage.css";

const MiscellaneousPage: React.FC = () => {
  return (
    <div className="misc-page">
      {/* Decorative top strip */}
      <div className="misc-page__hero" aria-hidden="true" />

      <div className="misc-page__container">
        <Breadcrumb
          items={[
            { label: "Payments", path: "/payments" },
            { label: "Miscellaneous" },
          ]}
        />

        <div className="misc-page__header">
          <div className="misc-page__header-badge">
            <span>Miscellaneous Services</span>
          </div>
          <h1 className="misc-page__title">Miscellaneous Payments</h1>
          <p className="misc-page__description">
            Select the service you wish to pay for. All payments are processed
            securely through the Homagama Pradeshiya Sabha payment gateway.
          </p>
        </div>

        <div className="misc-page__count">
          <span className="misc-page__count-number">{miscServices.length}</span>
          <span className="misc-page__count-label">services available</span>
        </div>

        <div className="misc-page__grid">
          {miscServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiscellaneousPage;
