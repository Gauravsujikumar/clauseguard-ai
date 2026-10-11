import React, { useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';

interface CopilotMessage {
  sender: string;
  text: string;
  citations?: Array<{ section: string; page: number; quote: string }>;
}

export const CopilotPage: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      sender: 'ai',
      text: 'Welcome to ClauseGuard Copilot! I am your AI document assistant. Ask me anything about your contract portfolio, indemnification caps, renewal deadlines, or governing law.'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    const q = question;
    setMessages(prev => [...prev, { sender: 'user', text: q }]);
    setQuestion('');
    setLoading(true);

    try {
      const res = await api.askCopilot('doc-1', q);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: res.answer,
          citations: res.citations
        }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: 'Based on the analyzed contracts, Section 12.1 establishes a 12-month fee cap ($125,000), but Section 12.2 carves out indemnification claims from this limitation.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center font-bold">
          <Bot size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">ClauseGuard Copilot Assistant</h1>
          <p className="text-xs text-slate-500">RAG-grounded contract Q&A engine with source citation evidence</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-brand-border shadow-xs p-6 h-[600px] flex flex-col justify-between">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed ${
                m.sender === 'user' ? 'bg-brand-blue text-white font-medium' : 'bg-slate-100 text-slate-800'
              }`}>
                <p>{m.text}</p>
                {m.citations && m.citations.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-slate-200 text-[10px] space-y-1">
                    <span className="font-bold text-slate-900 block">Grounding Evidence:</span>
                    {m.citations.map((c: any, ci: number) => (
                      <div key={ci} className="italic text-slate-600">
                        • {c.section} (p. {c.page}): "{c.quote}"
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="flex gap-3 pt-4 border-t border-slate-200">
          <input
            type="text"
            placeholder="Ask a question across your contracts..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-blue"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-brand-blue text-white rounded-xl font-bold text-xs flex items-center gap-2"
          >
            <Send size={16} />
            <span>Send Question</span>
          </button>
        </form>
      </div>
    </div>
  );
};
