import React from 'react';
import { 
  X, 
  CreditCard, 
  MapPin, 
  Clock, 
  Edit3, 
  PhoneCall, 
  FileCode, 
  Globe, 
  ShieldCheck, 
  ChevronRight,
  LogOut,
  Bus
} from 'lucide-react';
import { BusPassData } from '../types/pass';
import { TcsLogo } from './TcsLogo';

interface DrawerMenuProps {
  pass: BusPassData;
  isOpen: boolean;
  onClose: () => void;
  onOpenEdit: () => void;
  onOpenCode: () => void;
  onOpenRouteMap: () => void;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  pass,
  isOpen,
  onClose,
  onOpenEdit,
  onOpenCode,
  onOpenRouteMap,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-in">
        {/* User Card in Drawer */}
        <div className="bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-950 pt-[max(1.25rem,env(safe-area-inset-top))] px-5 pb-5 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center font-bold text-lg text-white shadow-inner">
              {pass.name.split(' ').map(n => n[0]).join('')}
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="font-bold text-base leading-tight">{pass.name}</h3>
          <p className="text-xs text-purple-200 mt-0.5">Emp ID: {pass.employeeId}</p>

          <div className="mt-3 flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-1 rounded-md text-[11px] font-semibold w-fit">
            <ShieldCheck className="w-3.5 h-3.5" />
            Active Route {pass.routeType} Pass
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto py-3 px-2">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
            Fleet Transit
          </div>

          <button
            onClick={onClose}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-purple-50 text-purple-900 font-semibold text-xs transition-colors mb-1"
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-4 h-4 text-purple-700" />
              <span>Digital Bus Pass</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-purple-600"></span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenRouteMap();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors mb-1"
          >
            <div className="flex items-center gap-3">
              <Bus className="w-4 h-4 text-slate-500" />
              <span>Route & Bus Stops</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenEdit();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors mb-1"
          >
            <div className="flex items-center gap-3">
              <Edit3 className="w-4 h-4 text-slate-500" />
              <span>Edit Pass Details</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5 mt-2">
            Developer & Deploy
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenCode();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-purple-50 text-slate-700 font-medium text-xs transition-colors mb-1 group"
          >
            <div className="flex items-center gap-3">
              <FileCode className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
              <span className="text-purple-900 font-semibold">React Native Code</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenCode();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-emerald-50 text-slate-700 font-medium text-xs transition-colors mb-1 group"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
              <span className="text-emerald-900 font-semibold">Netlify Deploy Guide</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5 mt-2">
            Support
          </div>

          <a
            href="tel:18002096827"
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors"
          >
            <div className="flex items-center gap-3">
              <PhoneCall className="w-4 h-4 text-slate-500" />
              <span>TCS Olympus Transport Desk</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex flex-col items-center pb-[max(1rem,env(safe-area-inset-bottom))]">
          <TcsLogo size="sm" />
          <p className="text-[10px] text-slate-400 mt-2">Corporate Transit Fleet v2.4</p>
        </div>
      </div>
    </div>
  );
};
