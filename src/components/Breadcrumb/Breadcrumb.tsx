import { Link } from "react-router-dom";
import { MdChevronRight, MdHome } from "react-icons/md";
import type { BreadcrumbItem } from "../../types/breadcrumb";
import "./Breadcrumb.css";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb__list">
        <li className="breadcrumb__item">
          <Link to="/payments" className="breadcrumb__link breadcrumb__link--home" aria-label="Dashboard">
            <MdHome className="breadcrumb__home-icon" />
            <span>Dashboard</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="breadcrumb__item">
              <MdChevronRight className="breadcrumb__separator" aria-hidden="true" />
              {isLast || !item.path ? (
                <span className="breadcrumb__current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link to={item.path} className="breadcrumb__link">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
