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
  onOpenEditDrop?: () => void;
  onOpenCode: () => void;
  onOpenRouteMap: () => void;
  transitMode: 'pickup' | 'drop';
  onSelectTransitMode: (mode: 'pickup' | 'drop') => void;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  pass,
  isOpen,
  onClose,
  onOpenEdit,
  onOpenEditDrop,
  onOpenCode,
  onOpenRouteMap,
  transitMode,
  onSelectTransitMode,
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
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="font-bold text-base leading-tight">{pass.name}</h3>
          <p className="text-xs text-purple-200 mt-0.5">Emp ID: {pass.employeeId}</p>

          <div className="mt-3 flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-1 rounded-md text-[11px] font-semibold w-fit">
            <ShieldCheck className="w-3.5 h-3.5" />
            {transitMode === 'drop' ? `Active Route ${pass.routeType} ${(pass.dropLabel || 'Drop').replace(/time/i, '').replace(/[-:]+$/, '').trim() || 'Drop'} Pass` : `Active Route ${pass.routeType} Pass`}
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto py-3 px-2">
          {/* Transit Mode Quick Tabs in Sidebar */}
          <div className="mx-2 mb-3 p-1 bg-slate-100 rounded-xl flex items-center gap-1">
            <button
              onClick={() => {
                onSelectTransitMode('pickup');
                onClose();
              }}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                transitMode === 'pickup'
                  ? 'bg-white text-purple-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Pickup</span>
            </button>
            <button
              onClick={() => {
                onSelectTransitMode('drop');
                onClose();
              }}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                transitMode === 'drop'
                  ? 'bg-white text-purple-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{(pass.dropLabel || 'Drop').replace(/time/i, '').replace(/[-:]+$/, '').trim() || 'Drop'}</span>
            </button>
          </div>

          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
            Fleet Transit
          </div>

          {/* Digital Bus Pass Tab */}
          <button
            onClick={() => {
              onSelectTransitMode('pickup');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-xs transition-colors mb-1 cursor-pointer ${
              transitMode === 'pickup'
                ? 'bg-purple-50 text-purple-900'
                : 'hover:bg-slate-50 text-slate-700 font-medium'
            }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard className={`w-4 h-4 ${transitMode === 'pickup' ? 'text-purple-700' : 'text-slate-500'}`} />
              <span>Digital Bus Pass</span>
            </div>
            {transitMode === 'pickup' ? (
              <span className="w-2 h-2 rounded-full bg-purple-600"></span>
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>

          {/* Drop Tab in Sidebar */}
          <button
            onClick={() => {
              onSelectTransitMode('drop');
              onClose();
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-xs transition-colors mb-1 cursor-pointer ${
              transitMode === 'drop'
                ? 'bg-purple-50 text-purple-900'
                : 'hover:bg-slate-50 text-slate-700 font-medium'
            }`}
          >
            <div className="flex items-center gap-3">
              <Clock className={`w-4 h-4 ${transitMode === 'drop' ? 'text-purple-700' : 'text-slate-500'}`} />
              <span>{pass.dropLabel || 'Drop'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-purple-700 bg-purple-100/70 px-1.5 py-0.5 rounded font-semibold">
                {pass.dropTime || pass.officeOutTime}
              </span>
              {transitMode === 'drop' ? (
                <span className="w-2 h-2 rounded-full bg-purple-600"></span>
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              )}
            </div>
          </button>

          {/* Edit Drop Button in Sidebar */}
          <button
            onClick={() => {
              onClose();
              if (onOpenEditDrop) {
                onOpenEditDrop();
              } else {
                onOpenEdit();
              }
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-purple-50 text-purple-900 font-medium text-xs transition-colors mb-1 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <Edit3 className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Edit {pass.dropLabel || 'Drop'} Timing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10.5px] font-mono text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-full font-bold">
                {pass.dropTime || pass.officeOutTime}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-purple-400 group-hover:text-purple-600" />
            </div>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenEdit();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors mb-1 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Edit3 className="w-4 h-4 text-slate-500" />
              <span>Edit All Pass Details</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenRouteMap();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-medium text-xs transition-colors mb-1 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Bus className="w-4 h-4 text-slate-500" />
              <span>Route & Bus Stops</span>
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
