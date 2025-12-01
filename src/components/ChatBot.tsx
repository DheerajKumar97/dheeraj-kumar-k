import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string | JSX.Element;
}

type ChatState = "CHAT" | "ASK_FIRST_NAME" | "ASK_LAST_NAME" | "ASK_EMAIL" | "ASK_PHONE" | "ASK_BUSINESS_TYPE" | "ASK_MESSAGE" | "COMPLETED";

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: (
                <>
                    <span className="font-bold">Hi there! I'm Dheeraj's AI Assistant.</span>
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
    const [chatState, setChatState] = useState<ChatState>("CHAT");
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

    // Knowledge Base
    const knowledgeBase = {
        about: {
            keywords: ["who", "about", "tell me about", "describe", "introduction", "summary", "who is"],
            response: "Dheeraj is a **Results-driven AI Enabled Business Intelligence Developer & Data Analyst** leveraging **6+ years of expertise** in **Power BI**, **Tableau**, **SQL**, **PySpark**, **Microsoft Fabric** and **Advanced Analytics Techniques** with **100% Committed** to delivering high-quality data insights and driving data-centric solutions for optimal business outcomes.\n\nHe specializes in transforming complex data into clear, actionable insights through intuitive BI dashboards and robust data systems."
        },
        contact: {
            keywords: ["contact", "email", "phone", "reach", "linkedin", "github"],
            response: "**Contact Information:**\n\n📧 Email: dheeraj8428@gmail.com\n📞 Phone: 9042803289\n📍 Location: Bangalore, 560035\n💼 LinkedIn: https://www.linkedin.com/in/dheerajkumar1997/\n🔗 GitHub: https://github.com/dheerajkumar1997\n\nWould you like to connect with Dheeraj?"
        },
        experience: {
            keywords: ["experience", "work", "job", "career", "years", "companies", "worked"],
            response: "**Professional Experience (6+ Years):**\n\n🏢 **Current:** Senior Software Engineer at Exusia Inc (Globant Division) - Oct 2025 onwards\n\n🏢 **Previous Roles:**\n• Business Intelligence Consultant at Encora Inc (Sept 2022 - Sept 2025)\n• Associate Consultant at Capgemini (Feb 2022 - Nov 2022)\n• Data Engineer at Origers Solutions (Jul 2019 - Oct 2021)\n\nDheeraj has 6+ years of experience in Business Intelligence, Data Analytics, and Data Engineering."
        },
        skills: {
            keywords: ["skills", "technologies", "tools", "proficient", "expertise", "know"],
            response: "**Technical Skills:**\n\n📊 **BI Tools:** Power BI, Tableau (Desktop, Prep, Cloud), Power Automate\n💻 **Programming:** Python, SQL (T-SQL), PySpark, OOP\n🗄️ **Databases:** MS SQL Server, MySQL, PostgreSQL, Snowflake, Databricks\n☁️ **Cloud:** Microsoft Fabric, Azure, Databricks\n🤖 **AI Tools:** Lovable AI, n8n, Zapier, ChatGPT, Claude AI\n📈 **Data Engineering:** ETL Pipelines, Data Modeling, Star/Snowflake Schema"
        },
        certifications: {
            keywords: ["certification", "certified", "certificate", "credentials", "qualified"],
            response: "**Certifications:**\n\n🏅 Microsoft Power BI Data Analyst Associate (PL-300)\n🏅 Microsoft Fabric Data Engineer Associate (DP-700)\n🏅 Tableau Desktop Specialist (TDS-C01)\n🏅 Tableau Data Analyst (TDA-C01)\n\nAll certifications are industry-recognized and validate Dheeraj's expertise in BI and Data Analytics."
        },
        projects: {
            keywords: ["project", "portfolio", "work", "built", "developed", "created"],
            response: "**Key Projects:**\n\n🚀 **Data Engineering Pipeline:** End-to-end modern data pipeline on Databricks using PySpark, Delta Live Tables, Medallion Architecture\n\n🤖 **Gen AI - Multi-LLM Document Chatbot:** Python-Streamlit chatbot for PDF, DOCX, HTML interaction using Groq, Gemini, HuggingFace\n\n✅ **RAG-Based Data Quality Validator:** Python-Streamlit app with 24+ validations using HuggingFace, Gemini, FAISS\n\n💬 **Text to SQL Chat Interface:** Automated SQL query generation tool (30% productivity boost)"
        },
        achievements: {
            keywords: ["achievement", "accomplishment", "success", "delivered", "improved"],
            response: "**Key Achievements:**\n\n📊 Developed 250+ interactive dashboards in Power BI and Tableau\n🚀 Migrated 195+ Tableau reports to Power BI\n⚡ Achieved 30% reduction in dashboard load times\n📈 Delivered 20% boost in operational efficiency\n✅ Reduced data-related issues by 95%\n🤖 Enhanced report development efficiency by 35% using AI Copilot"
        },
        powerbi: {
            keywords: ["power bi", "powerbi", "pbi", "dax", "power query"],
            response: "**Power BI Expertise:**\n\n✅ Power BI Desktop, Service, Report Builder\n✅ DAX (Data Analysis Expressions)\n✅ Power Query & M Language\n✅ Row-Level Security (RLS)\n✅ Power BI REST API\n✅ Power Automate Integration\n✅ Microsoft Fabric OneLake\n\nDheeraj has developed 250+ Power BI dashboards and migrated 195+ Tableau reports to Power BI."
        },
        tableau: {
            keywords: ["tableau", "tabpy", "lod"],
            response: "**Tableau Expertise:**\n\n✅ Tableau Desktop, Prep, Cloud\n✅ LOD Expressions (Level of Detail)\n✅ TabPy Integration with Python\n✅ Advanced Visualizations\n✅ Row-Level Security\n✅ Tableau Certified (TDS-C01, TDA-C01)\n\nDheeraj is a certified Tableau professional with extensive experience in creating interactive dashboards."
        },
        education: {
            keywords: ["education", "degree", "study", "university", "college", "graduated"],
            response: "**Education:**\n\n🎓 B.Tech in Computer Science Engineering (2015-2019)\n\nDheeraj has a strong foundation in computer science and has built his career in data analytics and business intelligence."
        },
        location: {
            keywords: ["location", "where", "based", "city", "bangalore"],
            response: "**Location:**\n\n📍 Bangalore, Karnataka, India (560035)\n\nDheeraj is based in Bangalore and is open to remote opportunities as well."
        }
    };

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

    const addAssistantMessage = (content: string) => {
        setMessages(prev => [...prev, { role: "assistant", content: formatResponse(content) }]);
    };

    const formatResponse = (text: string): JSX.Element => {
        const lines = text.split('\n');

        const processBoldText = (line: string): (string | JSX.Element)[] => {
            const parts: (string | JSX.Element)[] = [];
            const regex = /\*\*(.*?)\*\*/g;
            let lastIndex = 0;
            let match;
            let keyCounter = 0;

            while ((match = regex.exec(line)) !== null) {
                if (match.index > lastIndex) {
                    parts.push(line.substring(lastIndex, match.index));
                }
                parts.push(<span key={`bold-${keyCounter++}`} className="font-bold">{match[1]}</span>);
                lastIndex = match.index + match[0].length;
            }

            if (lastIndex < line.length) {
                parts.push(line.substring(lastIndex));
            }

            return parts.length > 0 ? parts : [line];
        };

        return (
            <>
                {lines.map((line, index) => {
                    const trimmedLine = line.trim();

                    if (!trimmedLine) {
                        return <div key={index} className="h-2"></div>;
                    }

                    if (trimmedLine.match(/^[•✅🏅📊🚀⚡📈🤖📧📞📍💼🔗🏢💻🗄️☁️🎓]/)) {
                        return <div key={index} className="ml-2 mb-1">{processBoldText(trimmedLine)}</div>;
                    }

                    return <div key={index} className="mb-1">{processBoldText(trimmedLine)}</div>;
                })}
            </>
        );
    };

    const searchKnowledgeBase = (query: string): string => {
        const lowerQuery = query.toLowerCase();
        const words = lowerQuery.split(/\s+/);

        // Check for positive connection responses
        const positiveResponses = [
            'yes', 'sure', 'absolutely', 'definitely', 'interested',
            'please', 'connect', 'happy to', 'sounds good', 'go ahead',
            'i am interested', "let's connect", "i'd like", "i would",
            'of course', 'why not', 'okay', 'ok', 'yep', 'yeah', 'yup'
        ];

        const hasPositiveResponse = positiveResponses.some(phrase => lowerQuery.includes(phrase));

        if (hasPositiveResponse && chatState === "CHAT") {
            setChatState("ASK_FIRST_NAME");
            return "Great! I'd be happy to help you connect with Dheeraj. Let me collect some information.\n\nWhat is your First Name?";
        }

        let bestMatch = { category: "", score: 0 };

        Object.entries(knowledgeBase).forEach(([category, data]) => {
            let score = 0;
            data.keywords.forEach(keyword => {
                if (lowerQuery.includes(keyword)) {
                    score += 10;
                } else {
                    words.forEach(word => {
                        if (keyword.includes(word) || word.includes(keyword)) {
                            score += 3;
                        }
                    });
                }
            });

            if (score > bestMatch.score) {
                bestMatch = { category, score };
            }
        });

        if (bestMatch.score > 5) {
            return knowledgeBase[bestMatch.category as keyof typeof knowledgeBase].response;
        }

        if (/^(hi|hello|hey|greetings)/i.test(lowerQuery)) {
            return "Hello! I'm here to help you learn about Dheeraj's professional background. You can ask me about his:\n\n• Experience & Career\n• Skills & Technologies\n• Certifications\n• Projects\n• Achievements\n• Contact Information\n\nWhat would you like to know?";
        }

        if (/\b(hire|connect|contact|work with|collaborate)\b/i.test(lowerQuery)) {
            setChatState("ASK_FIRST_NAME");
            return "Great! I'd be happy to help you connect with Dheeraj. Let me collect some information.\n\nWhat is your First Name?";
        }

        return "I'm not sure about that specific question, but I can tell you about:\n\n• Dheeraj's **Experience** (6+ years in BI & Data Analytics)\n• His **Skills** (Power BI, Tableau, Python, SQL)\n• **Certifications** (Microsoft & Tableau certified)\n• **Projects** (Data Engineering, Gen AI, RAG systems)\n• **Contact Information**\n\nWhat would you like to know more about?";
    };

    const sendEmail = async (data: any) => {
        try {
            const response = await fetch('http://localhost:3001/api/send-contact-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Email sending failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Email error:', error);
            throw error;
        }
    };

    const processUserInput = async (text: string) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 600));

        try {
            switch (chatState) {
                case "CHAT":
                    const response = searchKnowledgeBase(text);
                    addAssistantMessage(response);
                    break;

                case "ASK_FIRST_NAME":
                    if (!text.trim()) {
                        addAssistantMessage("Please provide your first name.");
                        setIsLoading(false);
                        return;
                    }
                    setFormData(prev => ({ ...prev, firstName: text.trim() }));
                    addAssistantMessage("Thanks! What is your Last Name?");
                    setChatState("ASK_LAST_NAME");
                    break;

                case "ASK_LAST_NAME":
                    if (!text.trim()) {
                        addAssistantMessage("Please provide your last name.");
                        setIsLoading(false);
                        return;
                    }
                    setFormData(prev => ({ ...prev, lastName: text.trim() }));
                    addAssistantMessage("Got it. What is your Email Address?");
                    setChatState("ASK_EMAIL");
                    break;

                case "ASK_EMAIL":
                    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    if (!emailRegex.test(text.trim())) {
                        addAssistantMessage("Please provide a valid email address (e.g., john.doe@gmail.com).");
                        setIsLoading(false);
                        return;
                    }
                    setFormData(prev => ({ ...prev, email: text.trim() }));
                    addAssistantMessage("Perfect. What is your Phone Number? (e.g., +91 9876543210)");
                    setChatState("ASK_PHONE");
                    break;

                case "ASK_PHONE":
                    if (!text.trim()) {
                        addAssistantMessage("Please provide your phone number.");
                        setIsLoading(false);
                        return;
                    }
                    setFormData(prev => ({ ...prev, phone: text.trim() }));
                    addAssistantMessage("What type of business are you in? Please select an option below:");
                    setShowBusinessOptions(true);
                    setChatState("ASK_BUSINESS_TYPE");
                    break;

                case "ASK_BUSINESS_TYPE":
                    setFormData(prev => ({ ...prev, businessType: text }));
                    setShowBusinessOptions(false);
                    addAssistantMessage("Almost done! Please tell me more about your needs or project.");
                    setChatState("ASK_MESSAGE");
                    break;

                case "ASK_MESSAGE":
                    setFormData(prev => ({ ...prev, message: text }));
                    const finalData = {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        phone: formData.phone,
                        businessType: formData.businessType,
                        message: text
                    };

                    // Send email
                    try {
                        await sendEmail(finalData);
                        addAssistantMessage(
                            `Perfect! I've sent your information to Dheeraj:\n\n` +
                            `Name: ${finalData.firstName} ${finalData.lastName}\n` +
                            `Email: ${finalData.email}\n` +
                            `Phone: ${finalData.phone}\n` +
                            `Business Type: ${finalData.businessType}\n\n` +
                            `✅ **Emails sent successfully!**\n` +
                            `• Dheeraj has received your request\n` +
                            `• You'll receive a confirmation email shortly\n\n` +
                            `Dheeraj will get back to you within 24 hours. Thank you!`
                        );
                    } catch (error) {
                        addAssistantMessage(
                            `I've collected your information:\n\n` +
                            `Name: ${finalData.firstName} ${finalData.lastName}\n` +
                            `Email: ${finalData.email}\n` +
                            `Phone: ${finalData.phone}\n` +
                            `Business Type: ${finalData.businessType}\n\n` +
                            `⚠️ Email sending failed. Please make sure the backend server is running.\n` +
                            `Your information: ${JSON.stringify(finalData)}`
                        );
                    }

                    setChatState("COMPLETED");
                    break;

                case "COMPLETED":
                    addAssistantMessage("I have already collected your information. Dheeraj will contact you shortly! Feel free to ask me anything else about his work.");
                    setChatState("CHAT");
                    break;
            }
        } catch (error) {
            console.error("Error processing input:", error);
            addAssistantMessage("I encountered an error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");

        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        await processUserInput(userMessage);
    };

    const handleOptionClick = async (option: string) => {
        setShowBusinessOptions(false);
        setFormData(prev => ({ ...prev, businessType: option }));
        setMessages(prev => [...prev, { role: "user", content: option }]);

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 600));
        addAssistantMessage("Almost done! Please tell me more about your needs or project.");
        setChatState("ASK_MESSAGE");
        setIsLoading(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
                    size="icon"
                >
                    <MessageCircle className="h-6 w-6" />
                </Button>
            )}

            {isOpen && (
                <Card className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-full h-[calc(100vh-4rem)] md:w-[480px] md:h-[600px] lg:w-[520px] lg:h-[650px] max-w-md md:max-w-xl shadow-2xl z-50 flex flex-col">
                    <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg">Chat with Dheeraj</h3>
                            <p className="text-xs opacity-90">Smart Assistant</p>
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
                                    <div className="text-sm whitespace-pre-wrap">
                                        {message.content}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {showBusinessOptions && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {businessOptions.map((option) => (
                                    <Button
                                        key={option}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleOptionClick(option)}
                                        className="text-xs bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                                        disabled={isLoading}
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
                                onClick={handleSendMessage}
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
