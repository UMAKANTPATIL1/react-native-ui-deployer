import React, { useState, useEffect } from 'react';
import { BusPassData } from '../types/pass';
import { X, CheckCircle, RefreshCw, ShieldCheck, Download, AlertCircle, Sparkles } from 'lucide-react';

interface QRCodeModalProps {
  pass: BusPassData;
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ pass, isOpen, onClose }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(300);
  const [currentTime, setCurrentTime] = useState('');
  const [isScanned, setIsScanned] = useState(false);
  const [scanMessage, setScanMessage] = useState('');

  // Update clock and countdown
  useEffect(() => {
    if (!isOpen) {
      setIsScanned(false);
      setScanMessage('');
      setSecondsRemaining(300);
      return;
    }

    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 300));
    }, 1000);

    const now = new Date();
    setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleSimulateScan = () => {
    setIsScanned(true);
    setScanMessage(`Verified for TCS Olympus Fleet • Vehicle MH-04-GP-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  const handleRefresh = () => {
    setSecondsRemaining(300);
    setIsScanned(false);
    setScanMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-sm bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-y-auto max-h-[92vh] border border-slate-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-purple-800 via-purple-700 to-indigo-800 px-5 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-bold text-sm tracking-wide">DIGITAL SECURITY TOKEN</h3>
              <p className="text-[10px] text-purple-200">Dynamic Anti-Fraud Encryption</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close QR Modal"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 flex items-center justify-center transition-colors text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Watermark and Time */}
        <div className="bg-emerald-50 px-4 py-2 border-b border-emerald-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            ACTIVE PASS: {currentTime}
          </span>
          <span className="font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
            Refreshes in {timeFormatted}
          </span>
        </div>

        {/* QR Code Container */}
        <div className="p-6 flex flex-col items-center text-center">
          <div className="relative p-3 bg-white rounded-2xl border-2 border-dashed border-purple-200 shadow-inner group">
            {/* Animated Laser Scanning Line */}
            <div className="absolute left-3 right-3 top-3 bottom-3 overflow-hidden pointer-events-none rounded-lg">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent shadow-[0_0_8px_#9333ea] animate-[bounce_2.5s_infinite]"></div>
            </div>

            {/* High fidelity SVG QR Matrix */}
            <svg
              className="w-56 h-56"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background */}
              <rect width="100" height="100" fill="white" />

              {/* Corner 1: Top-Left Finder */}
              <rect x="6" y="6" width="24" height="24" rx="3" fill="#1e1b4b" />
              <rect x="9.5" y="9.5" width="17" height="17" rx="1.5" fill="white" />
              <rect x="13" y="13" width="10" height="10" rx="1" fill="#4c1d95" />

              {/* Corner 2: Top-Right Finder */}
              <rect x="70" y="6" width="24" height="24" rx="3" fill="#1e1b4b" />
              <rect x="73.5" y="9.5" width="17" height="17" rx="1.5" fill="white" />
              <rect x="77" y="13" width="10" height="10" rx="1" fill="#4c1d95" />

              {/* Corner 3: Bottom-Left Finder */}
              <rect x="6" y="70" width="24" height="24" rx="3" fill="#1e1b4b" />
              <rect x="9.5" y="73.5" width="17" height="17" rx="1.5" fill="white" />
              <rect x="13" y="77" width="10" height="10" rx="1" fill="#4c1d95" />

              {/* Alignment pattern (bottom right) */}
              <rect x="68" y="68" width="16" height="16" rx="2" fill="#1e1b4b" />
              <rect x="71" y="71" width="10" height="10" rx="1" fill="white" />
              <rect x="74" y="74" width="4" height="4" fill="#4c1d95" />

              {/* QR Data Matrix Dots */}
              {/* Timing patterns */}
              <rect x="34" y="10" width="4" height="4" fill="#1e1b4b" />
              <rect x="42" y="10" width="4" height="4" fill="#1e1b4b" />
              <rect x="50" y="10" width="4" height="4" fill="#1e1b4b" />
              <rect x="58" y="10" width="4" height="4" fill="#1e1b4b" />
              <rect x="10" y="34" width="4" height="4" fill="#1e1b4b" />
              <rect x="10" y="42" width="4" height="4" fill="#1e1b4b" />
              <rect x="10" y="50" width="4" height="4" fill="#1e1b4b" />
              <rect x="10" y="58" width="4" height="4" fill="#1e1b4b" />

              {/* Central and Distributed Data modules */}
              <rect x="36" y="18" width="5" height="5" rx="0.8" fill="#1e1b4b" />
              <rect x="45" y="18" width="5" height="5" rx="0.8" fill="#4c1d95" />
              <rect x="54" y="18" width="5" height="5" rx="0.8" fill="#1e1b4b" />
              <rect x="36" y="27" width="5" height="5" rx="0.8" fill="#4c1d95" />
              <rect x="45" y="27" width="8" height="5" rx="0.8" fill="#1e1b4b" />
              <rect x="58" y="27" width="5" height="5" rx="0.8" fill="#1e1b4b" />

              <rect x="18" y="36" width="6" height="5" rx="0.8" fill="#1e1b4b" />
              <rect x="28" y="36" width="6" height="5" rx="0.8" fill="#4c1d95" />
              <rect x="38" y="36" width="6" height="5" rx="0.8" fill="#1e1b4b" />
              <rect x="48" y="36" width="6" height="5" rx="0.8" fill="#1e1b4b" />
              <rect x="58" y="36" width="6" height="5" rx="0.8" fill="#4c1d95" />
              <rect x="68" y="36" width="6" height="5" rx="0.8" fill="#1e1b4b" />
              <rect x="78" y="36" width="6" height="5" rx="0.8" fill="#1e1b4b" />

              <rect x="18" y="46" width="6" height="5" rx="0.8" fill="#4c1d95" />
              <rect x="28" y="46" width="6" height="5" rx="0.8" fill="#1e1b4b" />
              <rect x="38" y="46" width="6" height="5" rx="0.8" fill="#1e1b4b" />
              <rect x="48" y="46" width="6" height="5" rx="0.8" fill="#4c1d95" />
              <rect x="58" y="46" width="6" height="5" rx="0.8" fill="#1e1b4b" />
              <rect x="68" y="46" width="6" height="5" rx="0.8" fill="#4c1d95" />
              <rect x="78" y="46" width="6" height="5" rx="0.8" fill="#1e1b4b" />

              <rect x="18" y="56" width="6" height="5" rx="0.8" fill="#1e1b4b" />
              <rect x="28" y="56" width="6" height="5" rx="0.8" fill="#4c1d95" />
              <rect x="38" y="56" width="6" height="5" rx="0.8" fill="#1e1b4b" />
              <rect x="48" y="56" width="6" height="5" rx="0.8" fill="#1e1b4b" />
              <rect x="58" y="56" width="6" height="5" rx="0.8" fill="#4c1d95" />
              <rect x="68" y="56" width="6" height="5" rx="0.8" fill="#1e1b4b" />

              <rect x="36" y="66" width="5" height="5" rx="0.8" fill="#4c1d95" />
              <rect x="45" y="66" width="8" height="5" rx="0.8" fill="#1e1b4b" />
              <rect x="57" y="66" width="5" height="5" rx="0.8" fill="#4c1d95" />

              <rect x="36" y="76" width="8" height="5" rx="0.8" fill="#1e1b4b" />
              <rect x="48" y="76" width="5" height="5" rx="0.8" fill="#4c1d95" />
              <rect x="57" y="76" width="7" height="5" rx="0.8" fill="#1e1b4b" />

              <rect x="36" y="86" width="5" height="5" rx="0.8" fill="#4c1d95" />
              <rect x="45" y="86" width="8" height="5" rx="0.8" fill="#1e1b4b" />
              <rect x="57" y="86" width="5" height="5" rx="0.8" fill="#1e1b4b" />
              <rect x="66" y="86" width="6" height="5" rx="0.8" fill="#4c1d95" />
              <rect x="76" y="86" width="8" height="5" rx="0.8" fill="#1e1b4b" />

              {/* Center badge */}
              <circle cx="50" cy="50" r="10" fill="white" />
              <circle cx="50" cy="50" r="8" fill="#6b149b" />
              <text x="50" y="53" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold" fontFamily="sans-serif">TCS</text>
            </svg>
          </div>

          {/* Passenger Info Micro Badge */}
          <div className="mt-4 w-full bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-left">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] font-medium text-slate-500">Employee</span>
              <span className="text-xs font-bold text-slate-900">{pass.name}</span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] font-medium text-slate-500">Employee ID</span>
              <span className="text-xs font-mono font-bold text-slate-900">{pass.employeeId}</span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] font-medium text-slate-500">Route Type / Stop</span>
              <span className="text-xs font-semibold text-purple-700">Route {pass.routeType} • {pass.busStopName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-medium text-slate-500">Validity</span>
              <span className="text-[11px] font-medium text-slate-700">{pass.startDate} to {pass.endDate}</span>
            </div>
          </div>

          {/* Validation Status message */}
          {isScanned ? (
            <div className="mt-3 w-full p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="text-left font-medium text-[11px]">{scanMessage}</div>
            </div>
          ) : (
            <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Show this code to the bus reader when boarding</span>
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 grid grid-cols-2 gap-2 w-full">
            <button
              onClick={handleSimulateScan}
              className="py-2.5 px-3 rounded-xl bg-purple-100 hover:bg-purple-200 active:bg-purple-300 text-purple-900 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Scan Test
            </button>
            <button
              onClick={handleRefresh}
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh Code
            </button>
          </div>

          <button
            onClick={onClose}
            className="mt-3 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-medium text-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
