import React, { createContext, useContext, useState, useEffect } from "react";

interface GiftRegistry {
  id: string;
  name: string;
  occasion: string;
  date: string;
  createdBy: string;
  items: RegistryItem[];
  shareCode: string;
  message?: string;
}

interface RegistryItem {
  productId: number;
  productName: string;
  productPrice: number;
  productImage: string;
  quantity: number;
  purchased: number;
  purchasedBy?: { name: string; date: string }[];
}

interface GiftRegistryContextType {
  registries: GiftRegistry[];
  createRegistry: (registry: Omit<GiftRegistry, "id" | "shareCode" | "items">) => string;
  addItemToRegistry: (registryId: string, item: Omit<RegistryItem, "purchased" | "purchasedBy">) => void;
  markItemPurchased: (registryId: string, productId: number, purchaserName: string) => void;
  getRegistryByCode: (shareCode: string) => GiftRegistry | undefined;
  getUserRegistries: (userId: string) => GiftRegistry[];
  deleteRegistry: (registryId: string) => void;
}

const GiftRegistryContext = createContext<GiftRegistryContextType | undefined>(undefined);

export const GiftRegistryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [registries, setRegistries] = useState<GiftRegistry[]>(() => {
    const saved = localStorage.getItem("lovincraft-registries");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("lovincraft-registries", JSON.stringify(registries));
  }, [registries]);

  const generateShareCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const createRegistry = (registry: Omit<GiftRegistry, "id" | "shareCode" | "items">) => {
    const shareCode = generateShareCode();
    const newRegistry: GiftRegistry = {
      ...registry,
      id: `registry-${Date.now()}`,
      shareCode,
      items: [],
    };
    setRegistries(prev => [...prev, newRegistry]);
    return shareCode;
  };

  const addItemToRegistry = (registryId: string, item: Omit<RegistryItem, "purchased" | "purchasedBy">) => {
    setRegistries(prev =>
      prev.map(registry => {
        if (registry.id === registryId) {
          const existingItem = registry.items.find(i => i.productId === item.productId);
          if (existingItem) {
            return {
              ...registry,
              items: registry.items.map(i =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return {
            ...registry,
            items: [...registry.items, { ...item, purchased: 0, purchasedBy: [] }],
          };
        }
        return registry;
      })
    );
  };

  const markItemPurchased = (registryId: string, productId: number, purchaserName: string) => {
    setRegistries(prev =>
      prev.map(registry => {
        if (registry.id === registryId) {
          return {
            ...registry,
            items: registry.items.map(item => {
              if (item.productId === productId && item.purchased < item.quantity) {
                return {
                  ...item,
                  purchased: item.purchased + 1,
                  purchasedBy: [
                    ...(item.purchasedBy || []),
                    { name: purchaserName, date: new Date().toISOString() },
                  ],
                };
              }
              return item;
            }),
          };
        }
        return registry;
      })
    );
  };

  const getRegistryByCode = (shareCode: string) => {
    return registries.find(r => r.shareCode === shareCode);
  };

  const getUserRegistries = (userId: string) => {
    return registries.filter(r => r.createdBy === userId);
  };

  const deleteRegistry = (registryId: string) => {
    setRegistries(prev => prev.filter(r => r.id !== registryId));
  };

  return (
    <GiftRegistryContext.Provider
      value={{
        registries,
        createRegistry,
        addItemToRegistry,
        markItemPurchased,
        getRegistryByCode,
        getUserRegistries,
        deleteRegistry,
      }}
    >
      {children}
    </GiftRegistryContext.Provider>
  );
};

export const useGiftRegistry = () => {
  const context = useContext(GiftRegistryContext);
  if (context === undefined) {
    throw new Error("useGiftRegistry must be used within a GiftRegistryProvider");
  }
  return context;
};