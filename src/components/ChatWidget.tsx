import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Send, MessageCircle, Ticket } from "lucide-react";
import { useSupport } from "@/contexts/SupportContext";
import { toast } from "@/hooks/use-toast";
import loveLogo from "@/assets/love-logo.png";
import RatingComponent from "@/components/RatingComponent";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
  rating?: number;
  ratingFeedback?: string;
  showRating?: boolean;
}

const ChatWidget = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: t.chat.welcomeMessage,
      sender: "bot",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    description: "",
    email: "",
  });
  
  const { createTicket, rateMessage } = useSupport();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAutomatedResponse = (userMessage: string): string | null => {
    const message = userMessage.toLowerCase();

    // Keyword-based responses
    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return "Hello! How can I assist you with your baking journey today? 🎂";
    }
    
    if (message.includes("order") || message.includes("tracking")) {
      return "To track your order, please visit the 'Track Order' page in the navigation menu. You can also check your order history in your dashboard!";
    }
    
    if (message.includes("shipping") || message.includes("delivery")) {
      return "We offer free shipping on orders over $50! Standard delivery takes 3-5 business days. Express shipping is available at checkout.";
    }
    
    if (message.includes("payment") || message.includes("pay")) {
      return "We accept credit cards, PayPal, and cash on delivery. All payments are secure and encrypted.";
    }
    
    if (message.includes("return") || message.includes("refund")) {
      return "We offer a 30-day return policy on all products. Please contact us with your order number to initiate a return.";
    }
    
    if (message.includes("recipe") || message.includes("baking")) {
      return "Check out our recipe section for step-by-step baking guides! Each product comes with detailed instructions and tips.";
    }
    
    if (message.includes("ingredient") || message.includes("product")) {
      return "Browse our shop to discover premium baking ingredients and secret ingredient kits. Each product includes detailed descriptions and origin stories!";
    }
    
    if (message.includes("loyalty") || message.includes("points") || message.includes("rewards")) {
      return "Earn points with every purchase, review, and referral! Check your dashboard to see your current tier and benefits. 🎁";
    }
    
    if (message.includes("gift") || message.includes("registry")) {
      return "Create a gift registry for weddings, anniversaries, or special occasions! Share it with friends and family to receive the perfect baking gifts.";
    }
    
    if (message.includes("ticket") || message.includes("support") || message.includes("help")) {
      return "I can help with common questions, but for specific issues, I recommend creating a support ticket. Would you like to create one?";
    }

    return null;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Get automated response
    setTimeout(() => {
      const automatedResponse = getAutomatedResponse(inputMessage);
      
      if (automatedResponse) {
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          text: automatedResponse,
          sender: "bot",
          timestamp: new Date().toISOString(),
          showRating: true,
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        // Default response if no keyword match
        const defaultMessage: Message = {
          id: `bot-${Date.now()}`,
          text: "I'd love to help! For detailed assistance, please create a support ticket and our team will get back to you within 24 hours. 💌",
          sender: "bot",
          timestamp: new Date().toISOString(),
          showRating: true,
        };
        setMessages(prev => [...prev, defaultMessage]);
      }
    }, 500);
  };

  const handleCreateTicket = () => {
    if (!ticketForm.subject || !ticketForm.description || !ticketForm.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const ticketId = createTicket(
      ticketForm.subject,
      ticketForm.description,
      ticketForm.email
    );

    toast({
      title: "Ticket Created! 🎫",
      description: `Your ticket ${ticketId} has been created. We'll respond within 24 hours.`,
    });

    const botMessage: Message = {
      id: `bot-${Date.now()}`,
      text: `Thank you! Your support ticket ${ticketId} has been created. Our team will respond to ${ticketForm.email} within 24 hours. 📧`,
      sender: "bot",
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, botMessage]);

    setTicketForm({ subject: "", description: "", email: "" });
    setShowTicketForm(false);
  };

  const handleRateResponse = (messageId: string, rating: number, feedback?: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId
          ? { ...msg, rating, ratingFeedback: feedback, showRating: false }
          : msg
      )
    );
    
    toast({
      title: "Thank you for your feedback! 💝",
      description: "Your rating helps us improve our support experience.",
    });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-lg"
        size="icon"
      >
        <img src={loveLogo} alt="Support" className="h-8 w-8" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 w-96 shadow-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-2">
          <img src={loveLogo} alt="Support" className="h-8 w-8" />
          <div>
            <CardTitle className="text-lg">{t.common.brandName} {t.chatWidget.support}</CardTitle>
            <Badge variant="secondary" className="mt-1">
              <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
              {t.chatWidget.online}
            </Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {!showTicketForm ? (
          <>
            {/* Chat Messages */}
            <div className="h-80 space-y-4 overflow-y-auto rounded-lg bg-muted/30 p-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <div
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-background"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="mt-1 text-xs opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  
                  {/* Rating for bot messages */}
                  {message.sender === "bot" && (message.showRating || message.rating) && (
                    <div className="ml-2">
                      <RatingComponent
                        onRate={(rating, feedback) => handleRateResponse(message.id, rating, feedback)}
                        currentRating={message.rating}
                        currentFeedback={message.ratingFeedback}
                      />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={t.chat.placeholder}
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowTicketForm(true)}
            >
              <Ticket className="mr-2 h-4 w-4" />
              {t.chatWidget.createTicket}
            </Button>
          </>
        ) : (
          <>
            {/* Ticket Form */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="subject">{t.chatWidget.subject}</Label>
                <Input
                  id="subject"
                  value={ticketForm.subject}
                  onChange={(e) =>
                    setTicketForm({ ...ticketForm, subject: e.target.value })
                  }
                  placeholder={t.chatWidget.subjectPlaceholder}
                />
              </div>

              <div>
                <Label htmlFor="email">{t.auth.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={ticketForm.email}
                  onChange={(e) =>
                    setTicketForm({ ...ticketForm, email: e.target.value })
                  }
                  placeholder={t.chatWidget.emailPlaceholder}
                />
              </div>

              <div>
                <Label htmlFor="description">{t.chatWidget.description}</Label>
                <Textarea
                  id="description"
                  value={ticketForm.description}
                  onChange={(e) =>
                    setTicketForm({ ...ticketForm, description: e.target.value })
                  }
                  placeholder={t.chatWidget.descriptionPlaceholder}
                  rows={4}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleCreateTicket} className="flex-1">
                  <Ticket className="mr-2 h-4 w-4" />
                  {t.chatWidget.submitTicket}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowTicketForm(false)}
                >
                  {t.common.cancel}
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatWidget;
