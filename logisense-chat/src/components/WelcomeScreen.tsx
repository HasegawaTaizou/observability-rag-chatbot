import { LogiSenseLogo } from "./LogiSenseLogo";

export const WelcomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
      {/* LogiSense Logo Image */}
      <div className="mb-2 animate-fade-in w-[140px] mt-[24px]">
        <LogiSenseLogo />
      </div>

      <div className="space-y-4 animate-fade-in">
        <h1 className="text-3xl font-semibold text-foreground">
          Olá. No que posso te ajudar?
        </h1>
        <p className="text-muted-foreground max-w-md">
          Analise o que acontece nos bastidores. Pergunte sobre logs de erro, picos de acesso ou comportamentos do sistema para encontrar respostas valiosas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 max-w-2xl w-full">
        {/* Dialog Balloon Style Cards */}
        <div className="relative p-4 rounded-2xl bg-chat-assistant text-chat-assistant-foreground hover:bg-chat-assistant/80 transition-colors cursor-pointer">
          {/* Speech Bubble Tail */}
          <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-chat-assistant"></div>
          <h3 className="font-medium text-sm mb-2">🚨 Erros Críticos</h3>
          <p className="text-xs opacity-80">
            Quais foram os logs de erro de hoje?
          </p>
        </div>

        <div className="relative p-4 rounded-2xl bg-chat-assistant text-chat-assistant-foreground hover:bg-chat-assistant/80 transition-colors cursor-pointer">
          <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-chat-assistant"></div>
          <h3 className="font-medium text-sm mb-2">🔍 Busca por ID</h3>
          <p className="text-xs opacity-80">
            Encontre todos os logs da transação 12345.
          </p>
        </div>

        <div className="relative p-4 rounded-2xl bg-chat-assistant text-chat-assistant-foreground hover:bg-chat-assistant/80 transition-colors cursor-pointer">
          <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-chat-assistant"></div>
          <h3 className="font-medium text-sm mb-2">📈 Performance da API</h3>
          <p className="text-xs opacity-80">
            Qual o tempo de resposta da API de login?
          </p>
        </div>

        <div className="relative p-4 rounded-2xl bg-chat-assistant text-chat-assistant-foreground hover:bg-chat-assistant/80 transition-colors cursor-pointer">
          <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-chat-assistant"></div>
          <h3 className="font-medium text-sm mb-2">💡 Tendências</h3>
          <p className="text-xs opacity-80">
            Que picos de acesso você identifica no sistema?
          </p>
        </div>
      </div>
    </div>
  );
};
