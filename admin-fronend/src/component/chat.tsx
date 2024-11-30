import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, LogOut } from "lucide-react";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("Mr. A");
  const [messages, setMessages] = useState([
    { user: "Agent", time: "11:00", text: "Hello" },
    { user: "Mr. A", time: "11:01", text: "Hi, There" },
    { user: "Agent", time: "11:02", text: "Thank you" },
  ]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        { user: "Agent", time: new Date().toLocaleTimeString(), text: message },
      ]);
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 w-full">
      {/* Left Panel: User List */}
      <div className="border-r border-gray-200 bg-white">
        <ScrollArea className="h-full">
          {[
            { name: "Mr. A", preview: "Thank you" },
            { name: "Mr. B", preview: "Hi, I would..." },
            { name: "Mr. C", preview: "Ok" },
          ].map((user) => (
            <div
              key={user.name}
              onClick={() => handleSelectUser(user.name)}
              className={`flex items-center gap-2 p-3 cursor-pointer border-b border-gray-200 hover:bg-gray-50 
                ${user.name === selectedUser ? "bg-gray-100" : ""}`}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col ">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-gray-500">{user.preview}</span>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-2 mb-4 ${
                msg.user === "Agent" ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback>{msg.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <div
                className={`flex flex-col ${
                  msg.user === "Agent" ? "items-start" : "items-end"
                }`}
              >
                <div className="bg-gray-200 rounded-lg px-3 py-2 max-w-[80%]">
                  <p className="text-sm">{msg.text}</p>
                </div>
                <span className="text-xs text-gray-500 mt-1">{msg.time}</span>
              </div>
            </div>
          ))}
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter Text Here..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </div>
      </div>

      {/* Right Panel: User Info */}
      <div className="w-52 border-l border-gray-200 bg-white p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <span className="text-sm">Agent 1</span>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-8 text-center">
          <Avatar className="h-20 w-20 mx-auto mb-4">
            <AvatarFallback>{selectedUser.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-medium mb-4">{selectedUser}</h3>
          <div className="space-y-1 text-sm text-gray-500 mb-6">
            <p>Name: -</p>
            <p>LastName: -</p>
            <p>Email: -</p>
          </div>
          <div className="space-y-2">
            <Button className="w-full">Export</Button>
            <Button variant="destructive" className="w-full">
              Block
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;