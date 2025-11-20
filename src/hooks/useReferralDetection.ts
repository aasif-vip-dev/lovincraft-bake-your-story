import { useEffect } from "react";
import { useReferral } from "@/contexts/ReferralContext";

export const useReferralDetection = () => {
  const { applyReferralCode } = useReferral();

  useEffect(() => {
    // Check URL for referral code
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get("ref");

    if (refCode) {
      applyReferralCode(refCode);
      
      // Remove ref parameter from URL without page reload
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [applyReferralCode]);
};
