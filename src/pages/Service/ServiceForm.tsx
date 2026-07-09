import { useState, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdArrowBack, MdArrowForward, MdReceipt } from "react-icons/md";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { miscServices } from "../../data/miscServices";
import "./ServiceForm.css";

const ServiceForm: React.FC = () => {
  const { service: serviceSlug } = useParams<{ service: string }>();
  const navigate = useNavigate();

  const [referenceNumber, setReferenceNumber] = useState<string>("");
  const [nic, setNic] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const serviceData = miscServices.find((s) => s.slug === serviceSlug);
  const serviceName = serviceData?.title ?? (serviceSlug ?? "Unknown Service");

  const formatSlug = (slug: string): string =>
    slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  const displayName = serviceData?.title ?? formatSlug(serviceSlug ?? "");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="service-form-page">
      <div className="service-form-page__hero" aria-hidden="true" />

      <div className="service-form-page__container">
        <Breadcrumb
          items={[
            { label: "Payments", path: "/payments" },
            { label: "Miscellaneous", path: "/payments/miscellaneous" },
            { label: displayName },
          ]}
        />

        <button
          className="service-form-page__back"
          type="button"
          onClick={() => navigate("/payments/miscellaneous")}
          aria-label="Go back to Miscellaneous services"
        >
          <MdArrowBack />
          <span>Back to Services</span>
        </button>

        <div className="service-form-page__card">
          <div className="service-form-page__card-header">
            <div className="service-form-page__icon-wrap">
              <MdReceipt className="service-form-page__icon" aria-hidden="true" />
            </div>
            <div>
              <p className="service-form-page__label">Payment for</p>
              <h1 className="service-form-page__title">{displayName}</h1>
            </div>
          </div>

          {submitted ? (
            <div className="service-form-page__success" role="alert">
              <div className="service-form-page__success-icon">✓</div>
              <h2 className="service-form-page__success-title">
                Details Submitted
              </h2>
              <p className="service-form-page__success-desc">
                Your {serviceName} payment details have been received. You will
                be redirected to the payment gateway.
              </p>
              <button
                className="service-form-page__btn"
                type="button"
                onClick={() => navigate("/payments/miscellaneous")}
              >
                Back to Miscellaneous
              </button>
            </div>
          ) : (
            <form
              className="service-form-page__form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="service-form-page__field">
                <label
                  htmlFor="referenceNumber"
                  className="service-form-page__field-label"
                >
                  Reference Number
                  <span className="service-form-page__required" aria-hidden="true">
                    {" "}*
                  </span>
                </label>
                <input
                  id="referenceNumber"
                  type="text"
                  className="service-form-page__input"
                  placeholder="e.g. REF-2024-00123"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  required
                  autoComplete="off"
                  aria-required="true"
                />
                <span className="service-form-page__hint">
                  Enter the reference number from your notice or invoice.
                </span>
              </div>

              <div className="service-form-page__field">
                <label
                  htmlFor="nic"
                  className="service-form-page__field-label"
                >
                  National Identity Card (NIC)
                  <span className="service-form-page__required" aria-hidden="true">
                    {" "}*
                  </span>
                </label>
                <input
                  id="nic"
                  type="text"
                  className="service-form-page__input"
                  placeholder="e.g. 199012345678 or 901234567V"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                  required
                  autoComplete="off"
                  maxLength={12}
                  aria-required="true"
                />
                <span className="service-form-page__hint">
                  Enter your 9-digit NIC (old format) or 12-digit NIC (new format).
                </span>
              </div>

              <button
                className="service-form-page__btn"
                type="submit"
                disabled={!referenceNumber.trim() || !nic.trim()}
                aria-disabled={!referenceNumber.trim() || !nic.trim()}
              >
                <span>Continue to Payment</span>
                <MdArrowForward className="service-form-page__btn-icon" aria-hidden="true" />
              </button>
            </form>
          )}
        </div>

        <div className="service-form-page__disclaimer">
          <span>🔒</span>
          <span>
            This is an official Homagama Pradeshiya Sabha payment portal.
            Your information is encrypted and secure.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceForm;
