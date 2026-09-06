'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/lib/store';
import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export function ToastNotification() {
  const { notifications, removeNotification } = useApp();

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-60 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {notifications.map(n => {
          const isSuccess = n.type === 'success';
          const isWarning = n.type === 'warning';

          return (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 450, damping: 28 }}
              className="pointer-events-auto p-4 rounded-xl shadow-xl flex items-start gap-3 border bg-[#121917] text-white border-white/15 backdrop-blur-md"
            >
              <div className={`p-1 rounded-full shrink-0 ${
                isSuccess ? 'text-[var(--emerald-bright)] bg-emerald-950/60' : isWarning ? 'text-[var(--ochre-bright)] bg-amber-950/60' : 'text-blue-400 bg-blue-950/60'
              }`}>
                {isSuccess ? <CheckCircle2 size={16} /> : isWarning ? <AlertCircle size={16} /> : <Info size={16} />}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-bold text-xs text-white leading-tight">{n.title}</p>
                <p className="text-[11px] text-gray-300 mt-0.5 leading-relaxed font-light">{n.message}</p>
              </div>

              <button
                onClick={() => removeNotification(n.id)}
                className="text-gray-400 hover:text-white p-0.5 cursor-pointer shrink-0"
              >
                <X size={14} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
