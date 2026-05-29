import React, { createContext, useContext, useState, useCallback } from "react";

export type UserRole = "publisher" | "partner" | null;

interface User {
  address: string;
  displayAddress: string;
  role: UserRole;
  level: "seed" | "breaker" | "conqueror";
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isConnecting: boolean;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  connectWallet: () => Promise<void>;
  disconnect: () => void;
  setRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const generateMockAddress = () => {
  const chars = "0123456789abcdef";
  let addr = "0x";
  for (let i = 0; i < 40; i++) {
    addr += chars[Math.floor(Math.random() * chars.length)];
  }
  return addr;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("solarpact_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    // Simulate wallet connection delay
    await new Promise((r) => setTimeout(r, 1500));
    const address = generateMockAddress();
    const newUser: User = {
      address,
      displayAddress: `${address.slice(0, 6)}...${address.slice(-4)}`,
      role: null,
      level: "seed",
      avatar: `https://api.dicebear.com/7.x/shapes/svg?seed=${address.slice(2, 8)}`,
    };
    setUser(newUser);
    localStorage.setItem("solarpact_user", JSON.stringify(newUser));
    setIsConnecting(false);
  }, []);

  const disconnect = useCallback(() => {
    setUser(null);
    localStorage.removeItem("solarpact_user");
  }, []);

  const setRole = useCallback((role: UserRole) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, role };
      localStorage.setItem("solarpact_user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isConnecting,
        showAuthModal,
        setShowAuthModal,
        connectWallet,
        disconnect,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
