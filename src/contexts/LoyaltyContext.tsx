import React, { createContext, useContext, useState, useEffect } from "react";

type RewardTier = "bronze" | "silver" | "gold" | "platinum";

interface LoyaltyPoints {
  userId: string;
  points: number;
  tier: RewardTier;
  totalSpent: number;
  totalPurchases: number;
  totalReviews: number;
  totalShares: number;
}

interface Transaction {
  id: string;
  userId: string;
  points: number;
  type: "purchase" | "review" | "share" | "signup" | "birthday";
  description: string;
  date: string;
}

interface LoyaltyContextType {
  userPoints: LoyaltyPoints | null;
  transactions: Transaction[];
  addPoints: (points: number, type: Transaction["type"], description: string) => void;
  getTierBenefits: (tier: RewardTier) => TierBenefits;
  getDiscountPercentage: () => number;
}

interface TierBenefits {
  name: string;
  minPoints: number;
  discount: number;
  benefits: string[];
}

const tierThresholds: Record<RewardTier, TierBenefits> = {
  bronze: {
    name: "Bronze Baker",
    minPoints: 0,
    discount: 5,
    benefits: ["5% discount on all purchases", "Early access to new products", "Birthday bonus points"],
  },
  silver: {
    name: "Silver Chef",
    minPoints: 500,
    discount: 10,
    benefits: ["10% discount on all purchases", "Free shipping on orders over $50", "Exclusive recipe access", "Priority customer support"],
  },
  gold: {
    name: "Gold Artisan",
    minPoints: 1500,
    discount: 15,
    benefits: ["15% discount on all purchases", "Free shipping on all orders", "Monthly free sample kit", "VIP customer support", "Access to masterclasses"],
  },
  platinum: {
    name: "Platinum Master",
    minPoints: 3000,
    discount: 20,
    benefits: ["20% discount on all purchases", "Free shipping worldwide", "Quarterly premium gift box", "24/7 VIP support", "Exclusive masterclass invitations", "First access to limited editions"],
  },
};

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

export const LoyaltyProvider: React.FC<{ children: React.ReactNode; userId?: string }> = ({ children, userId = "guest" }) => {
  const [userPoints, setUserPoints] = useState<LoyaltyPoints | null>(() => {
    const saved = localStorage.getItem(`lovincraft-loyalty-${userId}`);
    return saved ? JSON.parse(saved) : {
      userId,
      points: 0,
      tier: "bronze" as RewardTier,
      totalSpent: 0,
      totalPurchases: 0,
      totalReviews: 0,
      totalShares: 0,
    };
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(`lovincraft-transactions-${userId}`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (userPoints) {
      localStorage.setItem(`lovincraft-loyalty-${userId}`, JSON.stringify(userPoints));
    }
  }, [userPoints, userId]);

  useEffect(() => {
    localStorage.setItem(`lovincraft-transactions-${userId}`, JSON.stringify(transactions));
  }, [transactions, userId]);

  const calculateTier = (points: number): RewardTier => {
    if (points >= 3000) return "platinum";
    if (points >= 1500) return "gold";
    if (points >= 500) return "silver";
    return "bronze";
  };

  const addPoints = (points: number, type: Transaction["type"], description: string) => {
    setUserPoints(prev => {
      if (!prev) return null;
      const newPoints = prev.points + points;
      const newTier = calculateTier(newPoints);
      
      const updates: Partial<LoyaltyPoints> = { points: newPoints, tier: newTier };
      
      if (type === "purchase") updates.totalPurchases = (prev.totalPurchases || 0) + 1;
      if (type === "review") updates.totalReviews = (prev.totalReviews || 0) + 1;
      if (type === "share") updates.totalShares = (prev.totalShares || 0) + 1;
      
      return { ...prev, ...updates };
    });

    const transaction: Transaction = {
      id: `trans-${Date.now()}`,
      userId,
      points,
      type,
      description,
      date: new Date().toISOString(),
    };
    setTransactions(prev => [transaction, ...prev]);
  };

  const getTierBenefits = (tier: RewardTier): TierBenefits => {
    return tierThresholds[tier];
  };

  const getDiscountPercentage = (): number => {
    return userPoints ? tierThresholds[userPoints.tier].discount : 0;
  };

  return (
    <LoyaltyContext.Provider
      value={{
        userPoints,
        transactions,
        addPoints,
        getTierBenefits,
        getDiscountPercentage,
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
};

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext);
  if (context === undefined) {
    throw new Error("useLoyalty must be used within a LoyaltyProvider");
  }
  return context;
};

export { tierThresholds };
export type { RewardTier, TierBenefits };