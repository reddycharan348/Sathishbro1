import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cloud, CloudOff, RefreshCw, CheckCircle, AlertCircle, Database } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface PendingData {
  enrollments: number;
  getStarted: number;
}

export function DataSyncStatus() {
  const [isBackendOnline, setIsBackendOnline] = useState<boolean | null>(null);
  const [pendingData, setPendingData] = useState<PendingData>({ enrollments: 0, getStarted: 0 });
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  useEffect(() => {
    checkBackendStatus();
    checkPendingData();
    
    // Check every 30 seconds
    const interval = setInterval(() => {
      checkBackendStatus();
      checkPendingData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const checkBackendStatus = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8fc8fb29/health`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );
      setIsBackendOnline(response.ok);
    } catch (error) {
      setIsBackendOnline(false);
    }
  };

  const checkPendingData = () => {
    try {
      const enrollments = JSON.parse(localStorage.getItem('edupulsex_enrollments') || '[]');
      const getStarted = JSON.parse(localStorage.getItem('edupulsex_getstarted') || '[]');
      
      const pendingEnrollments = enrollments.filter((e: any) => e.status === 'pending_sync').length;
      const pendingGetStarted = getStarted.filter((g: any) => g.status === 'pending_sync').length;
      
      setPendingData({
        enrollments: pendingEnrollments,
        getStarted: pendingGetStarted,
      });
    } catch (error) {
      console.error('Error checking pending data:', error);
    }
  };

  const syncPendingData = async () => {
    if (!isBackendOnline) {
      setSyncMessage('Backend is offline. Please try again later.');
      return;
    }

    setIsSyncing(true);
    setSyncMessage('');
    let syncedCount = 0;

    try {
      // Sync enrollments
      const enrollments = JSON.parse(localStorage.getItem('edupulsex_enrollments') || '[]');
      const pendingEnrollments = enrollments.filter((e: any) => e.status === 'pending_sync');
      
      for (const enrollment of pendingEnrollments) {
        try {
          const response = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-8fc8fb29/enroll`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${publicAnonKey}`,
              },
              body: JSON.stringify(enrollment),
            }
          );

          if (response.ok) {
            enrollment.status = 'synced';
            syncedCount++;
          }
        } catch (error) {
          console.error('Failed to sync enrollment:', error);
        }
      }

      localStorage.setItem('edupulsex_enrollments', JSON.stringify(enrollments));

      // Sync get started submissions
      const getStarted = JSON.parse(localStorage.getItem('edupulsex_getstarted') || '[]');
      const pendingGetStarted = getStarted.filter((g: any) => g.status === 'pending_sync');
      
      for (const submission of pendingGetStarted) {
        try {
          const response = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-8fc8fb29/get-started`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${publicAnonKey}`,
              },
              body: JSON.stringify(submission),
            }
          );

          if (response.ok) {
            submission.status = 'synced';
            syncedCount++;
          }
        } catch (error) {
          console.error('Failed to sync get started:', error);
        }
      }

      localStorage.setItem('edupulsex_getstarted', JSON.stringify(getStarted));

      setSyncMessage(`Successfully synced ${syncedCount} submission(s)!`);
      checkPendingData();
    } catch (error) {
      console.error('Sync error:', error);
      setSyncMessage('Failed to sync data. Please try again.');
    } finally {
      setIsSyncing(false);
    }
  };

  const totalPending = pendingData.enrollments + pendingData.getStarted;

  // Don't show if no pending data and backend is online
  if (totalPending === 0 && isBackendOnline) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-50 max-w-sm"
    >
      <div className="bg-surface border border-card-border rounded-lg shadow-2xl p-4 backdrop-blur-sm">
        {/* Status Header */}
        <div className="flex items-center gap-3 mb-3">
          {isBackendOnline === null ? (
            <>
              <RefreshCw className="w-5 h-5 text-text-muted animate-spin" />
              <div className="flex-1">
                <div className="text-sm text-white">Checking status...</div>
              </div>
            </>
          ) : isBackendOnline ? (
            <>
              <Cloud className="w-5 h-5 text-green-400" />
              <div className="flex-1">
                <div className="text-sm text-white">Backend Online</div>
                <div className="text-xs text-text-muted">All systems operational</div>
              </div>
            </>
          ) : (
            <>
              <CloudOff className="w-5 h-5 text-orange-400" />
              <div className="flex-1">
                <div className="text-sm text-white">Backend Offline</div>
                <div className="text-xs text-text-muted">Forms save locally</div>
              </div>
            </>
          )}
        </div>

        {/* Pending Data Info */}
        {totalPending > 0 && (
          <>
            <div className="border-t border-card-border pt-3 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-4 h-4 text-blue-400" />
                <div className="text-xs text-text-muted">Pending Sync</div>
              </div>
              
              {pendingData.enrollments > 0 && (
                <div className="text-xs text-text-secondary ml-6">
                  • {pendingData.enrollments} enrollment{pendingData.enrollments !== 1 ? 's' : ''}
                </div>
              )}
              
              {pendingData.getStarted > 0 && (
                <div className="text-xs text-text-secondary ml-6">
                  • {pendingData.getStarted} get started form{pendingData.getStarted !== 1 ? 's' : ''}
                </div>
              )}
            </div>

            {/* Sync Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={syncPendingData}
              disabled={isSyncing || !isBackendOnline}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                isSyncing
                  ? 'bg-surface text-text-muted cursor-not-allowed'
                  : isBackendOnline
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/50'
                  : 'bg-surface text-text-muted cursor-not-allowed'
              }`}
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Sync Now
                </>
              )}
            </motion.button>
          </>
        )}

        {/* Sync Message */}
        {syncMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-3 flex items-start gap-2 text-xs ${
              syncMessage.includes('Success')
                ? 'text-green-400'
                : 'text-orange-400'
            }`}
          >
            {syncMessage.includes('Success') ? (
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            )}
            <div>{syncMessage}</div>
          </motion.div>
        )}

        {/* Info Text */}
        {!isBackendOnline && totalPending > 0 && (
          <div className="mt-3 pt-3 border-t border-card-border text-xs text-text-muted">
            Your data is saved locally and will sync automatically when the backend is available.
          </div>
        )}
      </div>
    </motion.div>
  );
}
