'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  User, 
  Building2, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { PROPERTIES_DATA } from '../data/properties';
import { formatPrice, formatLocalizedPrice } from '../lib/utils';
import { useRealEstateStore } from '../lib/store';

export default function LiveChatWidget() {
  const { currency } = useRealEstateStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'm-1',
      sender: 'agent',
      name: 'Alexander Sterling',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
      text: 'Good day. I am Alexander, Managing Principal at JK Realty. Are you looking to acquire a primary residence, explore trophy investment yields, or schedule a discreet private viewing?',
      time: 'Just now'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'Schedule a Bel-Air Villa viewing',
    'Show me Manhattan penthouses',
    'What is your commission rate?',
    'Connect via WhatsApp'
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputVal;
    if (!query.trim()) return;

    const userMsg = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Intelligent automated concierge response
    setTimeout(() => {
      let replyText = "Thank you for inquiring. One of our private client advisors has been notified and will assist you immediately.";
      let propertySnippet = null;

      const lower = query.toLowerCase();
      if (lower.includes('tambaram') || lower.includes('land') || lower.includes('plot')) {
        replyText = "The Tambaram Royal Avenue Prime Villa Plot (₹1.08 Cr / ₹4,500/sq.ft) is a CMDA & DTCP sanctioned 2,400 sq.ft plot with 35-year Nil Encumbrance and Patta approval.";
        propertySnippet = PROPERTIES_DATA.find(p => p.id === 'prop-13') || PROPERTIES_DATA[0];
      } else if (lower.includes('bel-air') || lower.includes('obsidian') || lower.includes('villa')) {
        replyText = "The Bel-Air Obsidian Villa ($18,500,000) is one of our flagship architectural offerings with an infinity pool and sunset city vistas.";
        propertySnippet = PROPERTIES_DATA[0];
      } else if (lower.includes('penthouse') || lower.includes('manhattan') || lower.includes('sky')) {
        replyText = "The Sky Crest Penthouse on 432 Park Avenue ($24,500,000) features wrap-around Central Park vistas and private keyed elevators.";
        propertySnippet = PROPERTIES_DATA[1];
      } else if (lower.includes('commission') || lower.includes('rate') || lower.includes('fee')) {
        replyText = "We offer bespoke representation tiers ranging from ultra-confidential private sales to zero-commission escrow partnerships for direct buyers.";
      } else if (lower.includes('whatsapp') || lower.includes('phone') || lower.includes('call')) {
        replyText = "You can instantly message our executive desk on WhatsApp at +91 98401 28941 for immediate confidential assistance.";
      } else if (lower.includes('viewing') || lower.includes('schedule') || lower.includes('tour')) {
        replyText = "I would be honored to arrange an escorted viewing. You can click 'Schedule Site Visit' on any property card or tell me your preferred date right here.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `m-${Date.now() + 1}`,
          sender: 'agent',
          name: 'Alexander Sterling',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
          text: replyText,
          propertySnippet,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      
      {/* Closed Floating Badge Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[#1E3A5F] text-white font-bold shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-[#D4AF37]/50"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4AF37]" />
          </span>
          <MessageSquare className="w-5 h-5 fill-white text-[#1E3A5F]" />
          <span className="text-xs tracking-wider uppercase font-extrabold hidden sm:inline text-white">
            VIP Advisory
          </span>
        </button>
      )}

      {/* Opened Chat Panel */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-white border-2 border-[#D4AF37]/50 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 fade-in duration-300">
          
          {/* Header */}
          <div className="p-4 bg-[#1E3A5F] text-white flex items-center justify-between border-b border-[#1E3A5F]">
            <div className="flex items-center gap-3">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
                  alt="Advisor"
                  className="w-9 h-9 rounded-full object-cover border-2 border-[#D4AF37]"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Alexander Sterling</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/15 text-white uppercase font-bold">
                    Managing Principal
                  </span>
                </h4>
                <p className="text-[10px] text-emerald-300 font-semibold">Online • Confidential Concierge</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs bg-[#FAF8F5]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl ${
                    m.sender === 'user'
                      ? 'bg-[#1E3A5F] text-white font-medium rounded-br-none shadow-md'
                      : 'bg-white border border-gray-200 text-[#1F2937] rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="leading-relaxed font-medium">{m.text}</p>

                  {/* Optional Embedded Property Snippet */}
                  {m.propertySnippet && (
                    <div className="mt-2.5 p-2 rounded-xl bg-[#FAF8F5] border border-gray-200 flex items-center gap-2.5 text-[#1F2937]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.propertySnippet.images[0]}
                        alt={m.propertySnippet.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-[11px] text-[#1E3A5F] block truncate">
                          {m.propertySnippet.title}
                        </span>
                        <span className="text-[11px] text-[#8A5A00] font-serif font-black">
                          {formatLocalizedPrice(m.propertySnippet.price, currency, m.propertySnippet.priceSuffix, m.propertySnippet.currency)}
                        </span>
                      </div>
                      <Link
                        href={`/properties/${m.propertySnippet.id}`}
                        onClick={() => setIsOpen(false)}
                        className="p-1 rounded-lg bg-[#1E3A5F] text-white"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-gray-500 mt-1 px-1 font-semibold">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-gray-200 w-fit shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A5F] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A5F] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A5F] animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 bg-white border-t border-gray-200 flex gap-1.5 overflow-x-auto">
            {quickPrompts.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-lg bg-[#FAF8F5] hover:bg-[#1E3A5F] hover:text-white text-[#1E3A5F] text-[10px] font-bold whitespace-nowrap border border-gray-200 transition-all shadow-2xs"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input Field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-gray-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask confidential question..."
              className="flex-1 bg-[#FAF8F5] border border-gray-300 rounded-xl px-3 py-2 text-xs text-[#1F2937] placeholder-gray-500 focus:outline-none focus:border-[#1E3A5F] font-medium"
            />
            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="p-2 rounded-xl bg-[#1E3A5F] hover:bg-[#162c48] disabled:opacity-40 text-white font-bold transition-all shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
