import React, { useState } from 'react';
import { X, Copy, Check, Smartphone, Globe, ExternalLink, Terminal, FileCode, CheckCircle2 } from 'lucide-react';
import { BusPassData } from '../types/pass';

interface ReactNativeCodeModalProps {
  pass: BusPassData;
  isOpen: boolean;
  onClose: () => void;
}

export const ReactNativeCodeModal: React.FC<ReactNativeCodeModalProps> = ({ pass, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'rn' | 'netlify'>('rn');
  const [copiedRN, setCopiedRN] = useState(false);
  const [copiedNetlify, setCopiedNetlify] = useState(false);

  if (!isOpen) return null;

  const reactNativeCode = `/**
 * Digital Bus Pass Screen - React Native / Expo
 * Designed for TCS Olympus Fleet Transit
 * Compatible with React Native 0.73+ & Expo SDK 50+
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function BusPassScreen() {
  const [qrVisible, setQrVisible] = useState(false);

  const passDetails = {
    name: "${pass.name}",
    employeeId: "${pass.employeeId}",
    busStopName: "${pass.busStopName}",
    routeType: "${pass.routeType}",
    startDate: "${pass.startDate}",
    endDate: "${pass.endDate}",
    officeInTime: "${pass.officeInTime}",
    officeOutTime: "${pass.officeOutTime}",
    origin: "${pass.origin}",
    destination: "${pass.destination}",
    routeDescription: "${pass.routeDescription}",
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#5E148C" />

      {/* Top App Bar */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => console.log('Open Menu')}
          accessibilityLabel="Menu"
        >
          <Feather name="menu" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Digital Bus Pass</Text>

        <TouchableOpacity 
          style={styles.iconButton}
          onPress={() => console.log('Open Notifications')}
          accessibilityLabel="Notifications"
        >
          <Feather name="bell" size={22} color="#FFFFFF" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Top Gradient Route Banner */}
        <LinearGradient
          colors={['#2563EB', '#4F46E5', '#6D28D9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.routeBanner}
        >
          <View style={styles.routeHeader}>
            <Text style={styles.routeStation}>{passDetails.origin}</Text>
            <Text style={styles.routeArrow}>⇄</Text>
            <Text style={styles.routeDestination}>{passDetails.destination}</Text>
          </View>

          <View style={styles.routeBannerDivider} />

          <View style={styles.timeRow}>
            <Text style={styles.timeText}>Office In Time- {passDetails.officeInTime}</Text>
            <Text style={styles.timeText}>Office Out Time-{passDetails.officeOutTime}</Text>
          </View>
        </LinearGradient>

        {/* Main Confirmed Bus Pass Card */}
        <View style={styles.passCard}>
          {/* Top Green Accent Quarter Circle */}
          <View style={styles.greenAccentQuarterCircle} />

          {/* Card Title */}
          <View style={styles.cardTitleContainer}>
            <Text style={styles.cardTitle}>Confirmed Bus Pass</Text>
          </View>

          {/* Dotted Separator */}
          <View style={styles.dottedDivider} />

          {/* 2-Column Grid */}
          <View style={styles.gridContainer}>
            <View style={styles.gridRow}>
              <View style={styles.gridCol}>
                <Text style={styles.metaLabel}>Name</Text>
                <Text style={styles.metaValue}>{passDetails.name}</Text>
              </View>
              <View style={[styles.gridCol, styles.gridColRight]}>
                <Text style={[styles.metaLabel, styles.textRight]}>Employee ID</Text>
                <Text style={[styles.metaValue, styles.textRight]}>{passDetails.employeeId}</Text>
              </View>
            </View>

            <View style={styles.gridRow}>
              <View style={styles.gridCol}>
                <Text style={styles.metaLabel}>Bus Stop Name</Text>
                <Text style={styles.metaValue}>{passDetails.busStopName}</Text>
              </View>
              <View style={[styles.gridCol, styles.gridColRight]}>
                <Text style={[styles.metaLabel, styles.textRight]}>Route Type</Text>
                <Text style={[styles.metaValue, styles.textRight]}>{passDetails.routeType}</Text>
              </View>
            </View>

            <View style={styles.gridRow}>
              <View style={styles.gridCol}>
                <Text style={styles.metaLabel}>Start Date</Text>
                <Text style={styles.metaValue}>{passDetails.startDate}</Text>
              </View>
              <View style={[styles.gridCol, styles.gridColRight]}>
                <Text style={[styles.metaLabel, styles.textRight]}>End Date</Text>
                <Text style={[styles.metaValue, styles.textRight]}>{passDetails.endDate}</Text>
              </View>
            </View>
          </View>

          {/* Thin Divider Line */}
          <View style={styles.cardDivider} />

          {/* Bottom Route Note */}
          <Text style={styles.routeNote}>
            {passDetails.routeDescription}
          </Text>
        </View>

        {/* View QR Primary Button */}
        <TouchableOpacity
          style={styles.viewQrButton}
          activeOpacity={0.88}
          onPress={() => setQrVisible(true)}
        >
          <Text style={styles.viewQrButtonText}>View QR</Text>
        </TouchableOpacity>

        {/* TCS Branding Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.tcsLogoText}>tcs</Text>
          <View style={styles.logoDivider} />
          <View style={styles.tcsCompanyText}>
            <Text style={styles.tcsSubline}>TATA</Text>
            <Text style={styles.tcsSubline}>CONSULTANCY</Text>
            <Text style={styles.tcsSubline}>SERVICES</Text>
          </View>
        </View>
      </ScrollView>

      {/* QR Code Modal */}
      <Modal visible={qrVisible} transparent animationType="slide">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Bus Pass QR Token</Text>
            <Text style={styles.modalSubtitle}>Emp #{passDetails.employeeId}</Text>
            <View style={styles.qrPlaceholder}>
              <MaterialCommunityIcons name="qrcode-scan" size={140} color="#5E148C" />
            </View>
            <TouchableOpacity 
              style={styles.closeModalButton}
              onPress={() => setQrVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 56,
    backgroundColor: '#6A149B', // Deep TCS Purple
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  iconButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3366',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  routeBanner: {
    borderRadius: 14,
    paddingTop: 18,
    paddingBottom: 10,
    paddingHorizontal: 16,
    elevation: 3,
    shadowColor: '#2563EB',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  routeHeader: {
    alignItems: 'center',
    marginBottom: 14,
  },
  routeStation: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
  },
  routeArrow: {
    color: '#FFFFFF',
    fontSize: 18,
    marginVertical: 4,
  },
  routeDestination: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  routeBannerDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    marginHorizontal: -16,
    marginBottom: 8,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '400',
  },
  passCard: {
    marginTop: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    position: 'relative',
    paddingBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  greenAccentQuarterCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 68,
    height: 68,
    backgroundColor: '#00C853', // Bright Emerald Green
    borderBottomRightRadius: 68,
  },
  cardTitleContainer: {
    paddingVertical: 18,
    paddingLeft: 76,
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0F172A',
  },
  dottedDivider: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  gridContainer: {
    paddingHorizontal: 18,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridCol: {
    flex: 1,
  },
  gridColRight: {
    alignItems: 'flex-end',
  },
  textRight: {
    textAlign: 'right',
  },
  metaLabel: {
    fontSize: 12.5,
    color: '#64748B',
    marginBottom: 3,
  },
  metaValue: {
    fontSize: 14.5,
    fontWeight: '600',
    color: '#0F172A',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 16,
    marginVertical: 12,
  },
  routeNote: {
    textAlign: 'center',
    fontSize: 12.5,
    color: '#334155',
    paddingHorizontal: 20,
    lineHeight: 18,
  },
  viewQrButton: {
    marginTop: 20,
    backgroundColor: '#5E148C',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#5E148C',
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  viewQrButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 36,
    gap: 12,
  },
  tcsLogoText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#000000',
  },
  logoDivider: {
    width: 1.2,
    height: 30,
    backgroundColor: '#94A3B8',
  },
  tcsCompanyText: {
    justifyContent: 'center',
  },
  tcsSubline: {
    fontSize: 9,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.6,
    lineHeight: 11,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
    marginBottom: 20,
  },
  qrPlaceholder: {
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    marginBottom: 20,
  },
  closeModalButton: {
    backgroundColor: '#0F172A',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  closeModalButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
`;

  const copyToClipboard = (text: string, isRN: boolean) => {
    navigator.clipboard.writeText(text);
    if (isRN) {
      setCopiedRN(true);
      setTimeout(() => setCopiedRN(false), 2000);
    } else {
      setCopiedNetlify(true);
      setTimeout(() => setCopiedNetlify(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-700 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-800 px-5 py-3.5 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <FileCode className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                Export & Deployment Center
              </h3>
              <p className="text-xs text-slate-400">React Native / Expo code & 1-Click Netlify deployment</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-700/60 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center border-b border-slate-700/80 bg-slate-850 px-4 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('rn')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
              activeTab === 'rn'
                ? 'border-purple-500 text-white bg-slate-800/80'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-4 h-4 text-purple-400" />
            React Native Component Code
          </button>
          <button
            onClick={() => setActiveTab('netlify')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
              activeTab === 'netlify'
                ? 'border-emerald-500 text-white bg-slate-800/80'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            Deploy to Netlify (Guide & Config)
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 text-slate-200 font-sans text-xs">
          {activeTab === 'rn' ? (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-2">
                <div>
                  <span className="font-semibold text-sm text-white">React Native Code (Expo & React Native CLI)</span>
                  <p className="text-slate-400 text-xs mt-0.5">Copy and paste into your Expo/React Native project directly.</p>
                </div>
                <button
                  onClick={() => copyToClipboard(reactNativeCode, true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white rounded-lg font-medium text-xs transition-colors self-start sm:self-auto"
                >
                  {copiedRN ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedRN ? 'Copied to Clipboard!' : 'Copy Code'}
                </button>
              </div>

              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 overflow-x-auto font-mono text-[11px] leading-relaxed text-slate-300">
                <pre>{reactNativeCode}</pre>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 text-purple-200">
                <div className="font-semibold text-xs text-purple-300 mb-1">To run in Expo:</div>
                <code className="text-[11px] bg-slate-950 px-2 py-1 rounded text-purple-300 block mb-1">
                  npx create-expo-app BusPassApp && cd BusPassApp
                </code>
                <code className="text-[11px] bg-slate-950 px-2 py-1 rounded text-purple-300 block">
                  npx expo install expo-linear-gradient @expo/vector-icons
                </code>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-emerald-950/30 border border-emerald-800/40 p-4 rounded-xl text-emerald-200">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Your project is already 100% configured for Netlify!
                </div>
                <p className="text-xs text-emerald-300/80 mt-1">
                  We have added <code className="bg-emerald-900/50 px-1 py-0.5 rounded text-emerald-200 font-mono">netlify.toml</code> and <code className="bg-emerald-900/50 px-1 py-0.5 rounded text-emerald-200 font-mono">public/_redirects</code> so routing and builds work seamlessly.
                </p>
              </div>

              {/* Method 1: Git Push */}
              <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
                <h4 className="font-bold text-sm text-white mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-mono">1</span>
                  Option 1: Deploy via GitHub & Netlify Dashboard (Recommended)
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-xs">
                  <li>Push this repository to your GitHub/GitLab account.</li>
                  <li>Log in to <span className="text-emerald-400 font-medium">Netlify.com</span> and click <strong>"Add new site" &gt; "Import an existing project"</strong>.</li>
                  <li>Select your repository. Netlify automatically detects:
                    <div className="my-2 bg-slate-950 p-2.5 rounded-lg font-mono text-[11px] space-y-0.5 text-slate-300">
                      <div>Build command: <span className="text-emerald-400">npm run build</span></div>
                      <div>Publish directory: <span className="text-emerald-400">dist</span></div>
                    </div>
                  </li>
                  <li>Click <strong>"Deploy Site"</strong> — your digital bus pass will be live in 30 seconds!</li>
                </ol>
              </div>

              {/* Method 2: Netlify CLI */}
              <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
                <h4 className="font-bold text-sm text-white mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-mono">2</span>
                  Option 2: Deploy directly via Netlify CLI
                </h4>
                <div className="bg-slate-950 p-3 rounded-lg font-mono text-[11px] space-y-1 text-slate-300">
                  <p className="text-slate-500"># 1. Build the production bundle</p>
                  <p className="text-emerald-400">npm run build</p>
                  <p className="text-slate-500 mt-2"># 2. Deploy using Netlify CLI</p>
                  <p className="text-emerald-400">npx netlify deploy --prod --dir=dist</p>
                </div>
              </div>

              {/* Method 3: Drag & Drop */}
              <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700">
                <h4 className="font-bold text-sm text-white mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-mono">3</span>
                  Option 3: Drag & Drop "dist" folder
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Run <code className="bg-slate-950 px-1.5 py-0.5 rounded text-blue-300 font-mono">npm run build</code>, then log into Netlify, go to <strong>Sites &gt; Drop</strong>, and drag the generated <code className="bg-slate-950 px-1.5 py-0.5 rounded text-blue-300 font-mono">dist</code> folder right onto the browser window.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
