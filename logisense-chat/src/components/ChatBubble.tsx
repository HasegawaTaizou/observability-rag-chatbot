import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm'; 

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  isTyping?: boolean;
}

export const ChatBubble = ({ message, isUser, isTyping }: ChatBubbleProps) => {
  return (
    <div className={cn(
      "flex w-full mb-6",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[80%] px-6 py-4 rounded-3xl animate-fade-in",
        isUser
          ? "bg-chat-user text-chat-user-foreground ml-auto rounded-br-lg"
          : "bg-chat-assistant text-chat-assistant-foreground mr-auto rounded-bl-lg"
      )}>
        {isTyping ? (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
          </div>
        ) : (
          <div className={cn(
            "prose prose-sm",
            isUser ? "prose-invert text-white" : "dark:prose-invert"
          )}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeHighlight]}
            >
              {message}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};