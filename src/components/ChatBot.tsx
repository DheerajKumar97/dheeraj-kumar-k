import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Dheeraj's AI assistant.\n\nDheeraj helps businesses grow by turning your data into clear insights that guide better decisions through powerful and easy-to-understand Power BI dashboards. He helps you find opportunities to increase profits, improve efficiency, and track what truly matters for business success. Dheeraj also helps maintain and organize your data, set up the right data systems to collect, clean, and analyze it, and provide insights that guide you to make confident and smarter business decisions.\n\nAre you interested to connect with Dheeraj?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Check if we should try to collect info (after several exchanges)
      const shouldCollectInfo = newMessages.length > 8;

      const { data, error } = await supabase.functions.invoke("chat-bot", {
        body: { 
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          collectInfo: shouldCollectInfo 
        },
      });

      if (error) throw error;

      console.log("Response from chat-bot:", data);

      // Check if AI used a tool (submitted contact info)
      if (data.choices?.[0]?.message?.tool_calls?.length > 0) {
        const toolCall = data.choices[0].message.tool_calls[0];
        if (toolCall.function.name === "submit_contact_info") {
          const contactInfo = JSON.parse(toolCall.function.arguments);
          console.log("Contact info extracted:", contactInfo);

          // Send email
          const { data: emailData, error: emailError } = await supabase.functions.invoke(
            "send-to-whatsapp",
            { body: contactInfo }
          );

          if (emailError) throw emailError;

          setMessages([
            ...newMessages,
            {
              role: "assistant",
              content: "Perfect! I've sent your information to Dheeraj via email. He'll get back to you soon. Thank you for reaching out!",
            },
          ]);

          toast({
            title: "Message Sent",
            description: "Your information has been sent to Dheeraj via email.",
          });
        }
      } else {
        // Regular message response
        const assistantMessage = data.choices?.[0]?.message?.content || "I'm sorry, I didn't understand that.";
        setMessages([...newMessages, { role: "assistant", content: assistantMessage }]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "I'm sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
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
        <Card className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-full h-[calc(100vh-2rem)] md:w-96 md:h-[500px] max-w-md shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">Chat with Dheeraj</h3>
              <p className="text-xs opacity-90">AI Assistant</p>
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
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border shadow-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
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
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
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
