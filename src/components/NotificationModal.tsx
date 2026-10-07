import React from 'react';
import { X, Bell, CheckCircle, Clock, AlertTriangle, Bus } from 'lucide-react';
import { NotificationItem } from '../types/pass';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-purple-800 to-indigo-900 px-4 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-pink-400" />
            <h3 className="font-bold text-sm">Transit Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="p-3 bg-purple-50 border-b border-purple-100 flex items-center justify-between text-xs text-purple-900">
          <span className="font-medium">Route B • Thane Stn - TCS Olympus</span>
          <button
            onClick={onMarkAllAsRead}
            className="text-[11px] font-semibold text-purple-700 hover:text-purple-900 underline"
          >
            Mark all read
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-1">
          {notifications.map((item) => (
            <div key={item.id} className="p-3 hover:bg-slate-50 transition-colors flex gap-3 items-start">
              <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs ${
                item.type === 'alert'
                  ? 'bg-amber-100 text-amber-700'
                  : item.type === 'schedule'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-emerald-100 text-emerald-700'
              }`}>
                {item.type === 'alert' ? (
                  <AlertTriangle className="w-4 h-4" />
                ) : item.type === 'schedule' ? (
                  <Bus className="w-4 h-4" />
                ) : (
                  <CheckCircle className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h4 className="text-xs font-semibold text-slate-900 truncate">{item.title}</h4>
                  <span className="text-[10px] text-slate-400 shrink-0 flex items-center gap-0.5">
                    <Clock className="w-2.5 h-2.5" />
                    {item.time}
                  </span>
                </div>
                <p className="text-[11.5px] text-slate-600 leading-snug">{item.message}</p>
              </div>
              {item.unread && (
                <span className="w-2 h-2 rounded-full bg-pink-500 shrink-0 self-center"></span>
              )}
            </div>
          ))}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900"
          >
            Close Notifications
          </button>
        </div>
      </div>
    </div>
  );
};
