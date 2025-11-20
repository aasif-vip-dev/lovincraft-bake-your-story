import React, { createContext, useContext, useState, useEffect } from "react";

interface Referral {
  id: string;
  referredEmail: string;
  status: "pending" | "completed";
  pointsEarned: number;
  date: string;
}

interface ReferralContextType {
  referralCode: string;
  referrals: Referral[];
  totalReferralPoints: number;
  applyReferralCode: (code: string) => void;
  getReferralCode: () => string | null;
  completeReferral: (email: string) => void;
  shareReferralLink: () => string;
}

const ReferralContext = createContext<ReferralContextType | undefined>(undefined);

export const ReferralProvider: React.FC<{ children: React.ReactNode; userId?: string }> = ({ 
  children, 
  userId = "guest" 
}) => {
  // Generate unique referral code for this user
  const [referralCode] = useState<string>(() => {
    const saved = localStorage.getItem(`lovincraft-referral-code-${userId}`);
    if (saved) return saved;
    
    const newCode = `LOVIN${userId.substring(0, 4).toUpperCase()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    localStorage.setItem(`lovincraft-referral-code-${userId}`, newCode);
    return newCode;
  });

  const [referrals, setReferrals] = useState<Referral[]>(() => {
    const saved = localStorage.getItem(`lovincraft-referrals-${userId}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedReferralCode, setAppliedReferralCode] = useState<string | null>(() => {
    return localStorage.getItem("lovincraft-applied-referral");
  });

  useEffect(() => {
    localStorage.setItem(`lovincraft-referrals-${userId}`, JSON.stringify(referrals));
  }, [referrals, userId]);

  const totalReferralPoints = referrals.reduce((sum, ref) => sum + ref.pointsEarned, 0);

  const applyReferralCode = (code: string) => {
    if (code && code !== referralCode) {
      localStorage.setItem("lovincraft-applied-referral", code);
      setAppliedReferralCode(code);
    }
  };

  const getReferralCode = () => {
    return appliedReferralCode;
  };

  const completeReferral = (email: string) => {
    // Check if this user used a referral code
    const referrerCode = localStorage.getItem("lovincraft-applied-referral");
    
    if (referrerCode && referrerCode !== referralCode) {
      // Find the referrer and add a completed referral
      const referrerId = findUserIdByReferralCode(referrerCode);
      if (referrerId) {
        const referrerReferrals = localStorage.getItem(`lovincraft-referrals-${referrerId}`);
        const referrals = referrerReferrals ? JSON.parse(referrerReferrals) : [];
        
        // Add new completed referral
        referrals.push({
          id: `ref-${Date.now()}`,
          referredEmail: email,
          status: "completed",
          pointsEarned: 100, // Bonus points for successful referral
          date: new Date().toISOString(),
        });
        
        localStorage.setItem(`lovincraft-referrals-${referrerId}`, JSON.stringify(referrals));
      }
      
      // Clear the applied referral code after first purchase
      localStorage.removeItem("lovincraft-applied-referral");
      setAppliedReferralCode(null);
    }
  };

  const findUserIdByReferralCode = (code: string): string | null => {
    // Search through localStorage for the user with this referral code
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("lovincraft-referral-code-")) {
        const storedCode = localStorage.getItem(key);
        if (storedCode === code) {
          return key.replace("lovincraft-referral-code-", "");
        }
      }
    }
    return null;
  };

  const shareReferralLink = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}?ref=${referralCode}`;
  };

  return (
    <ReferralContext.Provider
      value={{
        referralCode,
        referrals,
        totalReferralPoints,
        applyReferralCode,
        getReferralCode,
        completeReferral,
        shareReferralLink,
      }}
    >
      {children}
    </ReferralContext.Provider>
  );
};

export const useReferral = () => {
  const context = useContext(ReferralContext);
  if (context === undefined) {
    throw new Error("useReferral must be used within a ReferralProvider");
  }
  return context;
};
