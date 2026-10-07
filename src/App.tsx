/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BusPassData, NotificationItem } from './types/pass';
import { BusPassCard } from './components/BusPassCard';
import { DrawerMenu } from './components/DrawerMenu';
import { NotificationModal } from './components/NotificationModal';
import { EditPassModal } from './components/EditPassModal';
import { ReactNativeCodeModal } from './components/ReactNativeCodeModal';
import { LiveRouteMapModal } from './components/LiveRouteMapModal';
import { 
  FileCode, 
  Edit3, 
  CheckCircle2,
  Code
} from 'lucide-react';

const INITIAL_PASS_DATA: BusPassData = {
  name: 'Arpan Gujarathi',
  employeeId: '2559433',
  busStopName: 'Thane Stn. E Kopari',
  routeType: 'B',
  startDate: '01-October-2026',
  endDate: '30-October-2026',
  officeInTime: '10:20',
  officeOutTime: '20:45',
  origin: 'Thane Stn. E Kopari',
  destination: 'TCS Olympus',
  routeDescription: 'Route: Thane Stn. E kopari To TCS Olympus And Return Via-FAST',
  status: 'CONFIRMED',
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Fleet On Schedule',
    message: 'Bus MH-04-GP-3814 on Route B has departed Thane Stn. E Kopari on time.',
    time: '10 mins ago',
    unread: true,
    type: 'schedule',
  },
  {
    id: '2',
    title: 'Monthly Pass Confirmed',
    message: 'Your Digital Bus Pass for October 2026 is confirmed and valid till 30-Oct-2026.',
    time: '2 hours ago',
    unread: true,
    type: 'pass',
  },
  {
    id: '3',
    title: 'Traffic Advisory',
    message: 'Normal transit time (approx 25 mins) between Teen Hath Naka and TCS Olympus.',
    time: '1 day ago',
    unread: false,
    type: 'alert',
  },
];

export default function App() {
  const [passData, setPassData] = useState<BusPassData>(INITIAL_PASS_DATA);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Modals
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [routeMapOpen, setRouteMapOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast('All notifications marked as read');
  };

  const handleResetPass = () => {
    setPassData(INITIAL_PASS_DATA);
    showToast('Reset to original pass details');
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen min-h-dvh bg-slate-100 flex flex-col items-center justify-start font-sans antialiased text-slate-900 selection:bg-purple-100 selection:text-purple-800">
      {/* Desktop Helper Header (automatically hidden on mobile screens) */}
      <header className="w-full bg-slate-950 text-slate-200 px-4 py-2 hidden md:flex items-center justify-between text-xs border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-semibold text-white tracking-tight">TCS Digital Bus Pass</span>
          <span className="text-slate-400">• Mobile App View</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-purple-400" />
            <span>Customize Pass</span>
          </button>
          <button
            onClick={() => setCodeModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>React Native & Netlify</span>
          </button>
        </div>
      </header>

      {/* Main Mobile Screen: 100% width on mobile resolution, clean centered container on desktop */}
      <main className="w-full max-w-md min-h-screen min-h-dvh bg-white flex flex-col shadow-none md:shadow-2xl md:my-6 md:rounded-3xl overflow-hidden relative">
        <BusPassCard
          pass={passData}
          onOpenMenu={() => setDrawerOpen(true)}
          onOpenNotifications={() => setNotificationOpen(true)}
          unreadCount={unreadCount}
        />
      </main>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 text-xs animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals & Drawers */}
      <DrawerMenu
        pass={passData}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpenEdit={() => setEditModalOpen(true)}
        onOpenCode={() => setCodeModalOpen(true)}
        onOpenRouteMap={() => setRouteMapOpen(true)}
      />

      <NotificationModal
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
      />

      <EditPassModal
        pass={passData}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={(updated) => {
          setPassData(updated);
          showToast('Bus pass details updated!');
        }}
        onReset={handleResetPass}
      />

      <ReactNativeCodeModal
        pass={passData}
        isOpen={codeModalOpen}
        onClose={() => setCodeModalOpen(false)}
      />

      <LiveRouteMapModal
        pass={passData}
        isOpen={routeMapOpen}
        onClose={() => setRouteMapOpen(false)}
      />
    </div>
  );
}
