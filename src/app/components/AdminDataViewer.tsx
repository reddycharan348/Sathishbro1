import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, GraduationCap, Download, RefreshCw, Calendar, Mail, Phone, School, X } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface EnrollmentData {
  timestamp: string;
  name: string;
  gmail: string;
  phoneNumber: string;
  collegeName: string;
  crNumber?: string;
  course?: string;
  coursePrice?: string;
  formType?: string;
}

export function AdminDataViewer() {
  const [enrollments, setEnrollments] = useState<Array<{ key: string; data: EnrollmentData }>>([]);
  const [getStarted, setGetStarted] = useState<Array<{ key: string; data: EnrollmentData }>>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'enrollments' | 'getstarted'>('enrollments');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-8fc8fb29`;
      
      // Load enrollments
      const enrollmentResponse = await fetch(`${baseUrl}/enrollments`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      if (enrollmentResponse.ok) {
        const enrollmentResult = await enrollmentResponse.json();
        setEnrollments(enrollmentResult.data || []);
      }

      // Load get started submissions
      const getStartedResponse = await fetch(`${baseUrl}/get-started-submissions`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      
      if (getStartedResponse.ok) {
        const getStartedResult = await getStartedResponse.json();
        setGetStarted(getStartedResult.data || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = (data: Array<{ key: string; data: EnrollmentData }>, filename: string) => {
    if (data.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = Object.keys(data[0].data);
    const csvContent = [
      headers.join(','),
      ...data.map(item => 
        headers.map(header => {
          const value = (item.data as any)[header] || '';
          return `"${value.toString().replace(/"/g, '""')}"`;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const currentData = activeTab === 'enrollments' ? enrollments : getStarted;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl text-heading mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Student Data Dashboard
          </h1>
          <p className="text-text-muted">View and manage all form submissions</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card-bg backdrop-blur-sm border border-blue-500/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl text-heading">{enrollments.length}</div>
                <div className="text-sm text-text-muted">Course Enrollments</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-card-bg backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-cyan-600 to-blue-500 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl text-heading">{getStarted.length}</div>
                <div className="text-sm text-text-muted">Get Started Forms</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card-bg backdrop-blur-sm border border-green-500/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-green-600 to-emerald-500 rounded-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl text-heading">{enrollments.length + getStarted.length}</div>
                <div className="text-sm text-text-muted">Total Submissions</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6 border-b border-card-border">
          <button
            onClick={() => setActiveTab('enrollments')}
            className={`px-6 py-3 transition-all ${
              activeTab === 'enrollments'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Enrollments ({enrollments.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab('getstarted')}
            className={`px-6 py-3 transition-all ${
              activeTab === 'getstarted'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-text-muted hover:text-text-secondary'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Get Started ({getStarted.length})
            </div>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => exportToCSV(currentData, activeTab)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </motion.button>
        </div>

        {/* Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card-bg backdrop-blur-sm border border-card-border rounded-xl overflow-hidden"
        >
          {loading ? (
            <div className="p-12 text-center">
              <RefreshCw className="w-8 h-8 text-blue-400 animate-spin mx-auto mb-4" />
              <p className="text-text-muted">Loading data...</p>
            </div>
          ) : currentData.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-text-muted">No submissions yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface border-b border-surface-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs text-text-muted uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs text-text-muted uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs text-text-muted uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs text-text-muted uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-4 text-left text-xs text-text-muted uppercase tracking-wider">College</th>
                    {activeTab === 'enrollments' && (
                      <>
                        <th className="px-6 py-4 text-left text-xs text-text-muted uppercase tracking-wider">CR Number</th>
                        <th className="px-6 py-4 text-left text-xs text-text-muted uppercase tracking-wider">Course</th>
                        <th className="px-6 py-4 text-left text-xs text-text-muted uppercase tracking-wider">Price</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {currentData.map((item, index) => (
                    <motion.tr
                      key={item.key || index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-surface transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-text-secondary whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-text-muted" />
                          {formatDate(item.data.timestamp)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-white">{item.data.name}</td>
                      <td className="px-6 py-4 text-sm text-text-secondary">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-text-muted" />
                          {item.data.gmail}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-secondary">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-text-muted" />
                          {item.data.phoneNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-secondary">
                        <div className="flex items-center gap-2">
                          <School className="w-4 h-4 text-text-muted" />
                          {item.data.collegeName}
                        </div>
                      </td>
                      {activeTab === 'enrollments' && (
                        <>
                          <td className="px-6 py-4 text-sm text-text-secondary">{item.data.crNumber}</td>
                          <td className="px-6 py-4 text-sm text-blue-400">{item.data.course}</td>
                          <td className="px-6 py-4 text-sm text-green-400">{item.data.coursePrice}</td>
                        </>
                      )}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-blue-900/20 border border-blue-500/30 rounded-lg p-4"
        >
          <p className="text-sm text-blue-300">
            <strong>Note:</strong> All data is stored securely in the database. 
            {!import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL && 
              ' Google Sheets sync is not configured - data is saved to KV store only. Set up Google Sheets integration to enable automatic sync.'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}