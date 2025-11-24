import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string | JSX.Element;
}

type ChatState =
  | "IDLE"
  | "ASK_INTEREST"
  | "ASK_FIRST_NAME"
  | "ASK_LAST_NAME"
  | "ASK_EMAIL"
  | "ASK_PHONE"
  | "ASK_BUSINESS_TYPE"
  | "ASK_MESSAGE"
  | "COMPLETED";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: (
        <>
          <span className="font-bold">Hi there! I'm Dheeraj’s Assistant.</span>
          {"\n\n"}
          Dheeraj is a Business Intelligence and Data Analytics professional who helps organizations unlock growth by turning complex data into clear, actionable insights. Through intuitive BI dashboards and robust data systems, he empowers business leaders to:
          {"\n\n"}
          ✅ Identify revenue opportunities
          {"\n"}
          ✅ Improve operational efficiency
          {"\n"}
          ✅ Track performance with meaningful KPIs
          {"\n"}
          ✅ Make confident, data-driven decisions
          {"\n\n"}
          Backed by hands-on expertise across end-to-end data pipelines—data collection, cleaning, modeling, and visualization—Dheeraj ensures that your data is reliable, accessible, and aligned with strategic business goals.
          {"\n\n"}
          He also holds multiple industry-recognized certifications, including:
          {"\n\n"}
          🏅 <span className="font-bold">Microsoft Power BI Data Analyst – PL-300</span>
          {"\n"}
          🏅 <span className="font-bold">Microsoft Fabric Data Engineer Associate – DP-700</span>
          {"\n"}
          🏅 <span className="font-bold">Tableau Desktop Specialist – TDS-C01</span>
          {"\n"}
          🏅 <span className="font-bold">Tableau Data Analyst – TDA-C01</span>
          {"\n\n"}
          If you're looking to enhance analytics, optimize reporting, or modernize your BI ecosystem, Dheeraj would be happy to connect and support your business.
          {"\n\n"}
          Are you interested to connect with Dheeraj?
        </>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [chatState, setChatState] = useState<ChatState>("ASK_INTEREST");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessType: "",
    message: ""
  });

  const [showBusinessOptions, setShowBusinessOptions] = useState(false);

  const businessOptions = [
    "Telecom Industry", "E-commerce", "IT Industry", "Sales & Marketing",
    "Media & Entertainment", "Travel & Tourism", "Finance and Banking",
    "Supply Chain Logistics", "Health Care", "Fitness & Recreation",
    "Gaming Industry", "Education Industry", "Manufacturing",
    "Procurement Management", "Social Media Analysis", "Other"
  ];

  // Auto-open chatbot after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showBusinessOptions]);

  const addAssistantMessage = (text: string) => {
    setMessages(prev => [...prev, { role: "assistant", content: text }]);
  };

  const processUserInput = async (text: string) => {
    // Simulate thinking delay
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    setIsLoading(false);

    switch (chatState) {
      case "ASK_INTEREST":
        if (text.toLowerCase().includes("yes") || text.toLowerCase().includes("sure") || text.toLowerCase().includes("ok")) {
          addAssistantMessage("Great! Let's get you connected. First, what is your First Name?");
          setChatState("ASK_FIRST_NAME");
        } else {
          addAssistantMessage("No problem! Feel free to reach out later if you change your mind.");
          setChatState("IDLE");
        }
        break;

      case "ASK_FIRST_NAME":
        setFormData(prev => ({ ...prev, firstName: text }));
        addAssistantMessage("Thanks! What is your Last Name?");
        setChatState("ASK_LAST_NAME");
        break;

      case "ASK_LAST_NAME":
        setFormData(prev => ({ ...prev, lastName: text }));
        addAssistantMessage("Got it. What is your Email Address?");
        setChatState("ASK_EMAIL");
        break;

      case "ASK_EMAIL":
        // Strict Email Validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const [localPart, domainPart] = text.split('@');

        let emailError = "";
        if (!text.includes('@')) {
          emailError = "Email must contain an '@' symbol.";
        } else if (!emailRegex.test(text)) {
          emailError = "Invalid email format.";
        } else if (text.includes('..')) {
          emailError = "Email cannot contain consecutive dots (..).";
        } else if (localPart.startsWith('.') || localPart.endsWith('.') || localPart.startsWith('-') || localPart.endsWith('-') || localPart.startsWith('_') || localPart.endsWith('_')) {
          emailError = "Local part cannot start or end with '.', '-', or '_'.";
        } else if (domainPart.startsWith('-') || domainPart.endsWith('-')) {
          emailError = "Domain cannot start or end with a hyphen.";
        }

        if (emailError) {
          addAssistantMessage(`Invalid Email: ${emailError} Please try again (e.g., john.doe@gmail.com).`);
          return;
        }

        setFormData(prev => ({ ...prev, email: text }));
        addAssistantMessage("Perfect. What is your Phone Number? (Must start with + followed by country code, e.g., +91 9876543210)");
        setChatState("ASK_PHONE");
        break;

      case "ASK_PHONE":
        // Strict Phone Validation
        let phoneError = "";
        const phoneTrimmed = text.trim();

        if (!phoneTrimmed.startsWith('+')) {
          phoneError = "Phone number must start with a country code (e.g., +1, +44, +91).";
        } else if (/[a-zA-Z]/.test(phoneTrimmed)) {
          phoneError = "Phone number cannot contain alphabets.";
        } else {
          // Check characters allowed after +
          const content = phoneTrimmed.slice(1);
          if (!/^[0-9\s-]+$/.test(content)) {
            phoneError = "Phone number contains invalid characters. Only digits, spaces, and hyphens are allowed.";
          } else {
            // Check digit count
            const digits = phoneTrimmed.replace(/\D/g, '');
            if (digits.length < 8 || digits.length > 15) {
              phoneError = `Phone number must be between 8 and 15 digits. You entered ${digits.length}.`;
            }
          }
        }

        if (phoneError) {
          addAssistantMessage(`Invalid Phone Number: ${phoneError} Please try again.`);
          return;
        }

        setFormData(prev => ({ ...prev, phone: phoneTrimmed }));
        addAssistantMessage("What type of business are you in? Please select an option below:");
        setShowBusinessOptions(true);
        setChatState("ASK_BUSINESS_TYPE");
        break;

      case "ASK_BUSINESS_TYPE":
        // This case is handled by handleOptionClick usually, but if they type it:
        setFormData(prev => ({ ...prev, businessType: text }));
        setShowBusinessOptions(false);
        addAssistantMessage("Almost done! Please tell me more about your needs or project.");
        setChatState("ASK_MESSAGE");
        break;

      case "ASK_MESSAGE":
        setFormData(prev => ({ ...prev, message: text }));
        setIsLoading(true);

        // Prepare data for submission
        const finalData = {
          ...formData,
          message: text,
          subject: `BI Request from ${formData.firstName} ${formData.lastName}`
        };

        try {
          const { error } = await supabase.functions.invoke("send-to-whatsapp", {
            body: finalData
          });

          if (error) {
            console.error("Supabase Function Error:", error);
            // Try to parse the error body if it exists
            let errorMessage = error.message;
            if (error instanceof Error && 'context' in error) {
              // @ts-ignore
              const context = error.context;
              try {
                const body = await context.json();
                if (body && body.error) {
                  errorMessage = body.error;
                }
              } catch (e) {
                const text = await context.text().catch(() => "No body");
                errorMessage = `Server Error: ${text.slice(0, 100)}`;
              }
            }
            throw new Error(errorMessage);
          }

          addAssistantMessage("Perfect! I've sent your information to Dheeraj via email. He'll get back to you soon. Thank you for reaching out!");
          toast({
            title: "Message Sent",
            description: "Your information has been sent to Dheeraj via email.",
          });
          setChatState("COMPLETED");
        } catch (error: any) {
          console.error("Error sending email:", error);
          addAssistantMessage(`Error: ${error.message || "Unknown error occurred"}. Please try again.`);
          toast({
            title: "Error",
            description: error.message || "Failed to send message. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
        break;

      case "COMPLETED":
        addAssistantMessage("I have already sent your message. Dheeraj will contact you shortly!");
        break;

      default:
        addAssistantMessage("I'm here if you need anything else.");
        break;
    }
  };

  const handleSendMessage = async (customMessage?: string) => {
    if ((!input.trim() && !customMessage) || isLoading) return;

    const userMessage = customMessage || input.trim();
    setInput("");

    // Add user message
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);

    // Process the input based on state
    await processUserInput(userMessage);
  };

  const handleOptionClick = (option: string) => {
    setShowBusinessOptions(false);
    // Manually trigger the state transition for business type
    setFormData(prev => ({ ...prev, businessType: option }));

    // Add user message visually
    setMessages(prev => [...prev, { role: "user", content: option }]);

    // Move to next step
    setTimeout(() => {
      addAssistantMessage("Almost done! Please tell me more about your needs or project.");
      setChatState("ASK_MESSAGE");
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-full h-[calc(100vh-4rem)] md:w-[480px] md:h-[600px] lg:w-[520px] lg:h-[650px] max-w-md md:max-w-xl shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">Chat with Dheeraj</h3>
              <p className="text-xs opacity-90">Assistant</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border shadow-sm"
                    }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}

            {/* Business Type Options */}
            {showBusinessOptions && (
              <div className="flex flex-wrap gap-2 mt-2">
                {businessOptions.map((option) => (
                  <Button
                    key={option}
                    variant="outline"
                    size="sm"
                    onClick={() => handleOptionClick(option)}
                    className="text-xs bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-background border shadow-sm p-3 rounded-lg">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-background">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading || showBusinessOptions}
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isLoading || showBusinessOptions}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBot;
