import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="bg-surface border-t border-border p-6">
      <form onSubmit={handleSubmit} className="flex items-center gap-3 max-w-4xl mx-auto">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua pergunta..."
          disabled={disabled}
          className={cn(
            "flex-1 rounded-full border-border bg-input text-input-foreground",
            "focus:ring-2 focus:ring-primary focus:border-transparent",
            "px-6 py-3 text-sm placeholder:text-muted-foreground"
          )}
        />
        <Button
          type="submit"
          disabled={!message.trim() || disabled}
          className={cn(
            "rounded-full w-11 h-11 p-0 shrink-0",
            "bg-primary hover:bg-primary/90 text-primary-foreground",
            "transition-all duration-200 hover:animate-pulse-glow",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};