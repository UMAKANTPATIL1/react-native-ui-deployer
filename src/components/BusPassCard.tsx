import React, { useState, useEffect } from 'react';
import { Menu, Bell, QrCode, FileText } from 'lucide-react';
import QRCode from 'qrcode';
import { BusPassData } from '../types/pass';
import { TcsLogo } from './TcsLogo';

interface BusPassCardProps {
  pass: BusPassData;
  onViewQR?: () => void;
  onOpenMenu: () => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
  transitMode?: 'pickup' | 'drop';
  onSelectTransitMode?: (mode: 'pickup' | 'drop') => void;
}

export const BusPassCard: React.FC<BusPassCardProps> = ({
  pass,
  onOpenMenu,
  onOpenNotifications,
  unreadCount = 1,
  transitMode = 'pickup',
  onSelectTransitMode,
}) => {
  const [showQR, setShowQR] = useState(false);
  const [qrSvg, setQrSvg] = useState<string>('');

  useEffect(() => {
    const isDrop = transitMode === 'drop';
    const dropLabelFormatted = (pass.dropLabel || 'Drop Time').trim().replace(/[-:]+$/, '').trim();
    const timeInfo = isDrop
      ? `${dropLabelFormatted}: ${pass.dropTime || pass.officeOutTime}`
      : `Shift: ${pass.officeInTime} - ${pass.officeOutTime}`;
    const qrData = `TCS_BUS_PASS\nTrip: ${isDrop ? 'DROP' : 'PICKUP'}\nEmpId: ${pass.employeeId}\nName: ${pass.name}\nRoute: ${pass.routeType}\nStop: ${pass.busStopName}\nValid: ${pass.startDate} - ${pass.endDate}\n${timeInfo}`;
    QRCode.toString(qrData, {
      type: 'svg',
      margin: 1,
      color: {
        dark: '#1e1b4b',
        light: '#ffffff',
      },
    })
      .then((svg) => {
        setQrSvg(svg);
      })
      .catch((err) => {
        console.error('QR generation error', err);
      });
  }, [pass, transitMode]);
  return (
    <div className="w-full bg-white flex flex-col min-h-full font-sans antialiased text-slate-900 select-none">
      {/* Top App Header with safe-area padding for mobile */}
      <header className="bg-[#6A149B] px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3.5 text-white grid grid-cols-[40px_1fr_40px] items-center shadow-sm sticky top-0 z-20">
        <button
          onClick={onOpenMenu}
          aria-label="Open Navigation Menu"
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 active:bg-white/20 transition-colors -ml-1 text-white cursor-pointer"
        >
          <Menu className="w-6 h-6 stroke-[2.2]" />
        </button>

        <h1 className="text-[18px] sm:text-[19px] font-semibold tracking-tight text-white text-center truncate px-2">
          Digital Bus Pass
        </h1>

        <button
          onClick={onOpenNotifications}
          aria-label="Notifications"
          className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 active:bg-white/20 transition-colors -mr-1 text-white cursor-pointer justify-self-end"
        >
          <Bell className="w-[22px] h-[22px] stroke-[2]" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#f43f5e] ring-2 ring-[#6A149B]"></span>
          )}
        </button>
      </header>

      {/* Pass Content Area */}
      <main className="flex-1 p-4 sm:p-5 flex flex-col justify-between overflow-y-auto pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <div className="space-y-4">
          {/* Top Route Gradient Banner Card */}
          <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-[#1d68f5] via-[#4338ca] to-[#7e22ce] text-white shadow-md shadow-blue-900/10 transition-transform active:scale-[0.99]">
            {/* Origin & Destination */}
            <div className="text-center py-1">
              <div className="text-[17px] font-medium tracking-tight">
                {pass.origin}
              </div>
              <div className="text-xl my-1 leading-none text-white/90">
                ⇄
              </div>
              <div className="text-[19px] font-bold tracking-tight">
                {pass.destination}
              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-white/25 mt-3 mb-2.5"></div>

            {/* Shift In / Out Times or Centered Drop Time */}
            {transitMode === 'drop' ? (
              <div className="flex items-center justify-center text-[16px] md:text-[15.5px] font-semibold tracking-tight px-1 text-white text-center py-0.5">
                <span>{(pass.dropLabel || 'Drop').trim().replace(/[-:]+$/, '').trim()}- {pass.dropTime || pass.officeOutTime}</span>
              </div>
            ) : (
              <div className="flex items-center justify-between text-[15.5px] font-medium tracking-tight px-1 text-white/95">
                <span>Office In Time- {pass.officeInTime}</span>
                <span>Office Out Time-{pass.officeOutTime}</span>
              </div>
            )}
          </div>

          {/* Confirmed Bus Pass Card with Smooth Fade/Scale Transition */}
          <div className="relative bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden min-h-[320px] select-none">
            {/* Green Quarter-Circle Badge in Top-Left Corner */}
            <div
              className="absolute top-0 left-0 w-16 h-16 bg-[#00c853] rounded-br-[4rem] shadow-xs z-20 pointer-events-none"
              aria-hidden="true"
            />

            {/* DETAILS VIEW - Fades out smoothly when QR is active */}
            <div
              className={`w-full pb-4 transition-all duration-300 ease-out ${showQR
                ? 'opacity-0 scale-95 pointer-events-none absolute inset-0'
                : 'opacity-100 scale-100 pointer-events-auto relative'
                }`}
            >
              {/* Card Header Title */}
              <div className="pt-4 pb-3.5 px-4 text-center">
                <h2 className="text-[17px] font-semibold text-slate-800 tracking-tight">
                  Confirmed Bus Pass
                </h2>
              </div>

              {/* Dotted Horizontal Divider */}
              <div className="border-b border-dashed border-slate-300 mx-4 mb-4"></div>

              {/* Two-Column Details Grid */}
              <div className="px-5 space-y-3.5">
                {/* Row 1: Name & Employee ID */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[12.5px] text-slate-400 font-medium ">Name</div>
                    <div className="text-[15px] font-semibold text-slate-900 uppercase tracking-tight mt-0.5">
                      {pass.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[12.5px] text-slate-400 font-medium">Employee ID</div>
                    <div className="text-[15px] font-semibold text-slate-900 tracking-tight mt-0.5 font-mono">
                      {pass.employeeId}
                    </div>
                  </div>
                </div>

                {/* Row 2: Bus Stop Name & Route Type */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[12.5px] text-slate-400 font-medium">Bus Stop Name</div>
                    <div className="text-[15px] font-semibold text-slate-900 tracking-tight mt-0.5">
                      {pass.busStopName}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[12.5px] text-slate-400 font-medium">Route Type</div>
                    <div className="text-[15px] font-semibold text-slate-900 tracking-tight mt-0.5">
                      {pass.routeType}
                    </div>
                  </div>
                </div>

                {/* Row 3: Start Date & End Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[12.5px] text-slate-400 font-medium">Start Date</div>
                    <div className="text-[14.5px] font-semibold text-slate-900 tracking-tight mt-0.5">
                      {pass.startDate}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[12.5px] text-slate-400 font-medium">End Date</div>
                    <div className="text-[14.5px] font-semibold text-slate-900 tracking-tight mt-0.5">
                      {pass.endDate}
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtle Divider Line */}
              <div className="border-t border-slate-100 mt-4 mb-3 mx-4"></div>

              {/* Route description notes */}
              <div className="px-5 text-center">
                <p className="text-[15.5px] text-slate-700 leading-snug">
                  {pass.routeDescription}
                </p>
              </div>
            </div>

            {/* QR CODE VIEW - Fades and scales in smoothly when QR is active */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-300 ease-out ${showQR
                ? 'opacity-100 scale-100 pointer-events-auto'
                : 'opacity-0 scale-95 pointer-events-none'
                }`}
              onClick={() => setShowQR(false)}
              title="Click to view pass details"
            >
              <div
                className="w-56 h-56 sm:w-60 sm:h-60 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
            </div>
          </div>

          {/* View QR / View Details Toggle Button */}
          <div className="pt-1">
            <button
              onClick={() => setShowQR((prev) => !prev)}
              className="w-full h-12 bg-[#581282] hover:bg-[#4b0c72] active:bg-[#3d085e] text-white font-semibold text-[15.5px] rounded-lg shadow-md shadow-purple-950/15 flex items-center justify-center gap-2.5 transition-all active:scale-[0.985] cursor-pointer"
            >
              {showQR ? (
                <>
                  <FileText className="w-4 h-4 text-purple-200" />
                  <span>View Details</span>
                </>
              ) : (
                <>
                  <QrCode className="w-4 h-4 text-purple-200" />
                  <span>View QR</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* TCS Logo Brand Lockup */}
        <div className="pt-6 pb-6 flex justify-center items-center">
          <TcsLogo />
        </div>
      </main>

    </div>
  );
};
