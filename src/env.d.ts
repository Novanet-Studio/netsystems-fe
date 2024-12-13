/// <reference types="astro/client" />

import type { JSX } from "react";

namespace App {
  interface PaymentFormInfo {
    title: string;
    subtitle: string;
    bannerImage: string;
    form: JSX.Element;
    label?: string;
    stepIndicator?: JSX.Element;
  }

  interface PaymentMethodItem {
    bank: string;
    logoImage: string;
  }

  type Bank = {
    code: string;
    name: string;
    legalName: string;
    shortName: string;
    rif: string;
    url: string;
  };

  type PayContextType = {
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
  };
}
