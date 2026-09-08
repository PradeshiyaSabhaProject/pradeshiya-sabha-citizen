import {
  MdApartment,
  MdVerified,
  MdGavel,
  MdStorefront,
  MdShoppingBag,
  MdReceipt,
} from "react-icons/md";
import type { MiscService } from "../types/service";

export const miscServices: MiscService[] = [
  {
    id: "building-permit",
    title: "Building Permit",
    slug: "building-permit",
    description:
      "Apply for approval to construct, renovate, or extend a building within the municipal limits.",
    icon: MdApartment,
  },
  {
    id: "character-certificate",
    title: "Character Certificate",
    slug: "character-certificate",
    description:
      "Obtain an official character certificate issued by Homagama Pradeshiya Sabha for personal or professional use.",
    icon: MdVerified,
  },
  {
    id: "penalty-fine",
    title: "Penalty / Fine",
    slug: "penalty-fine",
    description:
      "Pay outstanding penalties or fines issued by the municipal authority for regulatory non-compliance.",
    icon: MdGavel,
  },
  {
    id: "trade-license",
    title: "Trade License",
    slug: "trade-license",
    description:
      "Register or renew your trade license to legally operate a business within the municipal area.",
    icon: MdStorefront,
  },
  {
    id: "market-stall-fee",
    title: "Market Stall Fee",
    slug: "market-stall-fee",
    description:
      "Pay the periodic market stall rental fee for your allocated space in municipal markets.",
    icon: MdShoppingBag,
  },
  {
    id: "other-charges",
    title: "Other Charges",
    slug: "other-charges",
    description:
      "Settle miscellaneous municipal charges not covered by specific service categories above.",
    icon: MdReceipt,
  },
];