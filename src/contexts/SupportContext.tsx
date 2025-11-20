import React, { createContext, useContext, useState, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
  rating?: number;
  ratingFeedback?: string;
}

interface Ticket {
  id: string;
  subject: string;
  description: string;
  email: string;
  status: "open" | "in-progress" | "resolved" | "cancelled";
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  rating?: number;
  ratingFeedback?: string;
}

interface SupportContextType {
  tickets: Ticket[];
  createTicket: (subject: string, description: string, email: string) => string;
  updateTicket: (ticketId: string, updates: Partial<Ticket>) => void;
  getTicket: (ticketId: string) => Ticket | undefined;
  addMessageToTicket: (ticketId: string, message: Omit<Message, "id" | "timestamp">) => void;
  rateTicket: (ticketId: string, rating: number, feedback?: string) => void;
  rateMessage: (ticketId: string, messageId: string, rating: number, feedback?: string) => void;
}

const SupportContext = createContext<SupportContextType | undefined>(undefined);

export const SupportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const saved = localStorage.getItem("lovincraft-support-tickets");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("lovincraft-support-tickets", JSON.stringify(tickets));
  }, [tickets]);

  const createTicket = (subject: string, description: string, email: string): string => {
    const newTicket: Ticket = {
      id: `TICKET-${Date.now()}`,
      subject,
      description,
      email,
      status: "open",
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTickets(prev => [newTicket, ...prev]);
    return newTicket.id;
  };

  const updateTicket = (ticketId: string, updates: Partial<Ticket>) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === ticketId
          ? { ...ticket, ...updates, updatedAt: new Date().toISOString() }
          : ticket
      )
    );
  };

  const getTicket = (ticketId: string) => {
    return tickets.find(t => t.id === ticketId);
  };

  const addMessageToTicket = (ticketId: string, message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === ticketId
          ? {
              ...ticket,
              messages: [...ticket.messages, newMessage],
              updatedAt: new Date().toISOString(),
            }
          : ticket
      )
    );
  };

  const rateTicket = (ticketId: string, rating: number, feedback?: string) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === ticketId
          ? { 
              ...ticket, 
              rating, 
              ratingFeedback: feedback,
              updatedAt: new Date().toISOString() 
            }
          : ticket
      )
    );
  };

  const rateMessage = (ticketId: string, messageId: string, rating: number, feedback?: string) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === ticketId
          ? {
              ...ticket,
              messages: ticket.messages.map(msg =>
                msg.id === messageId
                  ? { ...msg, rating, ratingFeedback: feedback }
                  : msg
              ),
              updatedAt: new Date().toISOString(),
            }
          : ticket
      )
    );
  };

  return (
    <SupportContext.Provider
      value={{
        tickets,
        createTicket,
        updateTicket,
        getTicket,
        addMessageToTicket,
        rateTicket,
        rateMessage,
      }}
    >
      {children}
    </SupportContext.Provider>
  );
};

export const useSupport = () => {
  const context = useContext(SupportContext);
  if (context === undefined) {
    throw new Error("useSupport must be used within a SupportProvider");
  }
  return context;
};
