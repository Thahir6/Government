"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Scheme, Language, UserProfile, ChatMessage } from '@/types';
import { TRANSLATIONS } from '@/data/translations';
import { processRAGQuery } from '@/lib/ragEngine';
import { 
  Sparkles, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  ExternalLink, 
  User, 
  Bot, 
  HelpCircle,
  Building2,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface JanSahayAIChatProps {
  userProfile: UserProfile;
  schemes: Scheme[];
  currentLanguage: Language;
  onSelectScheme: (scheme: Scheme) => void;
}

export const JanSahayAIChat: React.FC<JanSahayAIChatProps> = ({
  userProfile,
  schemes,
  currentLanguage,
  onSelectScheme
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeAudioMessageId, setActiveAudioMessageId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const t = TRANSLATIONS[currentLanguage];

  // Initialize with multilingual greeting message
  useEffect(() => {
    const welcomeText = currentLanguage === 'te'
      ? `నమస్కారం ${userProfile.name}! నేను జనసహాయ్ AI సహాయకుడిని. అధికారిక ప్రభుత్వ గెజిట్లు మరియు నిబంధనల ఆధారంగా మీకు పథకాలు, స్కాలర్‌షిప్‌లు, పత్రాలు మరియు దరఖాస్తు విధానం గురించి సమాధానాలు ఇవ్వగలను. నన్ను ఏదైనా అడగండి!`
      : currentLanguage === 'hi'
      ? `नमस्ते ${userProfile.name}! मैं जनसहाय AI सहायक हूँ। आधिकारिक सरकारी राजपत्रों एवं नियमों के आधार पर योजनाओं, छात्रवृत्ति और आवश्यक दस्तावेजों की जानकारी दे सकता हूँ। आप क्या जानना चाहते हैं?`
      : `Hello ${userProfile.name}! I am JanSahay AI Assistant. Grounded strictly in verified government publications, I can help you discover schemes, explain eligibility criteria, list required documents, and guide your application. How may I assist you today?`;

    setMessages([
      {
        id: "msg_welcome",
        sender: "assistant",
        text: welcomeText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: currentLanguage
      }
    ]);
  }, [currentLanguage, userProfile.name]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Setup Web Speech API for Speech-to-Text
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = currentLanguage === 'te' ? 'te-IN' : currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
          setIsListening(false);
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [currentLanguage]);

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please type your query.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.lang = currentLanguage === 'te' ? 'te-IN' : currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        setIsListening(false);
      }
    }
  };

  // Text-to-Speech using browser SpeechSynthesis
  const speakText = (text: string, msgId: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      alert("Text-to-speech audio synthesis is not supported on this browser.");
      return;
    }

    if (isPlayingAudio && activeAudioMessageId === msgId) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setActiveAudioMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Strip markdown formatting for cleaner speech
    const cleanSpeech = text.replace(/[*#_•]/g, '').replace(/https?:\/\/[^\s]+/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.lang = currentLanguage === 'te' ? 'te-IN' : currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setActiveAudioMessageId(null);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setActiveAudioMessageId(null);
    };

    setActiveAudioMessageId(msgId);
    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMessage: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: currentLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Process via RAG Engine
    setTimeout(() => {
      const ragResponse = processRAGQuery(query, userProfile, currentLanguage, schemes);

      const botMessage: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'assistant',
        text: ragResponse.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: currentLanguage,
        citedSources: ragResponse.citedSources
      };

      setMessages(prev => [...prev, botMessage]);
    }, 400);
  };

  const suggestedQuestions = [
    t.aiSuggestedPrompt1,
    t.aiSuggestedPrompt2,
    t.aiSuggestedPrompt3,
    t.aiSuggestedPrompt4,
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 h-[calc(100vh-5rem)] flex flex-col">
      
      {/* Header */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center border border-blue-400/30 shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-white">{t.aiAssistantTitle}</h2>
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Verified RAG Active</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {t.aiAssistantSubtitle}
            </p>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <span className="text-[11px] text-slate-400">Answering in:</span>
          <span className="text-xs font-bold text-blue-400 ml-1">
            {currentLanguage === 'en' ? 'English' : currentLanguage === 'te' ? 'తెలుగు (Telugu)' : 'हिंदी (Hindi)'}
          </span>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 glass-panel rounded-2xl border border-white/10 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isAudioActive = activeAudioMessageId === msg.id && isPlayingAudio;

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                isUser 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-indigo-900/60 border border-indigo-500/30 text-indigo-300'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                isUser
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-slate-900/90 border border-white/10 text-slate-200 rounded-tl-none shadow-lg'
              }`}>
                
                {/* Message text with basic markdown formatting */}
                <div className="whitespace-pre-line">
                  {msg.text}
                </div>

                {/* Grounded Cited Sources Cards */}
                {msg.citedSources && msg.citedSources.length > 0 && (
                  <div className="mt-3.5 pt-3 border-t border-white/10 space-y-2">
                    <div className="flex items-center space-x-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Answer based on verified sources:</span>
                    </div>

                    <div className="space-y-1.5">
                      {msg.citedSources.map((source, sIdx) => (
                        <div 
                          key={sIdx}
                          className="p-2 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between text-[11px]"
                        >
                          <div>
                            <div className="font-semibold text-white truncate max-w-xs">{source.title}</div>
                            <div className="text-slate-400 text-[10px]">{source.department} • {source.lastVerified}</div>
                          </div>

                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 ml-2 flex items-center space-x-1"
                          >
                            <span>Source</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom Action Bar (Audio Read & Timestamp) */}
                <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{msg.timestamp}</span>

                  {!isUser && (
                    <button
                      onClick={() => speakText(msg.text, msg.id)}
                      className={`flex items-center space-x-1 px-2 py-0.5 rounded transition-colors ${
                        isAudioActive 
                          ? 'bg-emerald-500/20 text-emerald-300 font-bold' 
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {isAudioActive ? <VolumeX className="w-3 h-3 text-emerald-400" /> : <Volume2 className="w-3 h-3" />}
                      <span>{isAudioActive ? t.stopAudio : t.listenAudio}</span>
                    </button>
                  )}
                </div>

              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="py-2.5 flex items-center space-x-2 overflow-x-auto">
        <span className="text-[11px] text-slate-400 font-medium flex-shrink-0">Suggested:</span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="text-[11px] px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-blue-500/30 whitespace-nowrap transition-all"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Input Bar with Speech-to-Text */}
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder={t.aiInputPlaceholder}
            className="w-full pl-4 pr-12 py-3 rounded-2xl bg-[#0F2444] border border-white/10 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-blue-500 shadow-xl"
          />

          {/* Speech-to-Text Microphone Button */}
          <button
            type="button"
            onClick={toggleSpeechRecognition}
            className={`absolute right-3 top-2.5 p-1.5 rounded-xl transition-all ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
            title="Speak query (Voice-to-Text)"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </div>

        {/* Send Button */}
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputValue.trim()}
          className="p-3 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white shadow-lg shadow-blue-500/25 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Safety Disclaimer */}
      <div className="mt-2 text-center text-[10px] text-slate-500">
        {t.aiDisclaimer}
      </div>

    </div>
  );
};
