import React from 'react';
import { X, MapPin, Navigation, Bus, Clock, Shield } from 'lucide-react';
import { BusPassData } from '../types/pass';

interface LiveRouteMapModalProps {
  pass: BusPassData;
  isOpen: boolean;
  onClose: () => void;
}

export const LiveRouteMapModal: React.FC<LiveRouteMapModalProps> = ({ pass, isOpen, onClose }) => {
  if (!isOpen) return null;

  const stops = [
    { name: 'Thane Railway Station (East Kopari)', time: '09:20 AM', type: 'Origin / Boarding', active: true },
    { name: 'Teen Hath Naka Junction', time: '09:35 AM', type: 'Transit Stop', active: false },
    { name: 'Nitin Casting Flyover', time: '09:48 AM', type: 'Transit Stop', active: false },
    { name: 'Cadbury Junction / Eastern Express', time: '09:58 AM', type: 'Transit Stop', active: false },
    { name: 'Majiwada Flyover', time: '10:05 AM', type: 'Transit Stop', active: false },
    { name: 'TCS Olympus, Hiranandani Estate, Ghodbunder Rd', time: '10:20 AM', type: 'Destination Office', active: true },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-purple-800 to-indigo-900 px-5 py-3.5 text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm">Route B - FAST Corridor</h3>
            <p className="text-[11px] text-purple-200">Thane Stn. E Kopari ⇄ TCS Olympus</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Route status */}
        <div className="bg-emerald-50 px-4 py-2.5 border-b border-emerald-100 flex items-center justify-between text-xs text-emerald-800">
          <span className="flex items-center gap-1.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Fleet Status: On Schedule
          </span>
          <span className="text-emerald-700 font-mono text-[11px]">Bus #MH-04-GP-3814</span>
        </div>

        <div className="p-5 overflow-y-auto space-y-4">
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-purple-600 before:via-blue-500 before:to-emerald-500">
            {stops.map((stop, index) => (
              <div key={index} className="relative flex items-start justify-between">
                <span className={`absolute -left-6 top-0.5 w-3.5 h-3.5 rounded-full border-2 bg-white ${
                  index === 0 
                    ? 'border-purple-600 ring-2 ring-purple-100' 
                    : index === stops.length - 1 
                    ? 'border-emerald-600 ring-2 ring-emerald-100' 
                    : 'border-blue-400'
                }`} />
                <div className="min-w-0 pr-3">
                  <h4 className="text-xs font-semibold text-slate-900 leading-tight">{stop.name}</h4>
                  <span className="text-[11px] text-slate-500">{stop.type}</span>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-[11px] font-mono font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                    {stop.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-xs text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Bus className="w-3.5 h-3.5 text-purple-600" />
              Evening Return Shift
            </div>
            <p className="text-[11.5px] leading-relaxed">
              Departures from TCS Olympus Gate 2 at 20:45, 21:15, and 21:45 PM returning directly to Thane East Kopari.
            </p>
          </div>
        </div>

        <div className="p-3 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-black transition-colors"
          >
            Back to Pass
          </button>
        </div>
      </div>
    </div>
  );
};
