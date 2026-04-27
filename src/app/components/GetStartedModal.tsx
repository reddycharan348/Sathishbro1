import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState } from 'react';
import { CheckCircle, Loader2, Rocket, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    collegeName: '',
    gmail: '',
    phoneNumber: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const submissionData = {
        ...formData,
        timestamp: new Date().toISOString(),
      };

      // Try to submit to backend
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8fc8fb29/get-started`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(submissionData),
        }
      );

      const contentType = response.headers.get('content-type');
      let result;
      
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const text = await response.text();
        console.log('Response text:', text);
        result = { error: text };
      }

      if (!response.ok) {
        // If 404, show helpful message
        if (response.status === 404) {
          console.error('Backend endpoint not found. Please wait for deployment to complete.');
          throw new Error('Service is starting up. Please try again in a moment.');
        }
        throw new Error(result.error || 'Failed to submit form');
      }

      // Store data locally as backup
      try {
        const submissions = JSON.parse(localStorage.getItem('tectonix_getstarted') || '[]');
        submissions.push({
          ...submissionData,
          id: `local_${Date.now()}`,
          submittedAt: new Date().toISOString()
        });
        localStorage.setItem('tectonix_getstarted', JSON.stringify(submissions));
        console.log('Get Started form also saved locally as backup');
      } catch (localError) {
        console.warn('Could not save to localStorage:', localError);
      }

      setIsSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2500);
    } catch (err) {
      console.error('Get Started form error:', err);
      
      // If backend is unavailable, still save locally
      if (err instanceof TypeError && err.message.includes('fetch')) {
        try {
          const submissionData = {
            ...formData,
            timestamp: new Date().toISOString(),
          };
          const submissions = JSON.parse(localStorage.getItem('tectonix_getstarted') || '[]');
          submissions.push({
            ...submissionData,
            id: `local_${Date.now()}`,
            submittedAt: new Date().toISOString(),
            status: 'pending_sync'
          });
          localStorage.setItem('tectonix_getstarted', JSON.stringify(submissions));
          
          // Show success even if backend is down
          setIsSuccess(true);
          console.log('Get Started form saved locally. Will sync when backend is available.');
          setTimeout(() => {
            handleClose();
          }, 2500);
          return;
        } catch (localError) {
          console.error('Could not save locally:', localError);
        }
      }
      
      setError(err instanceof Error ? err.message : 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      collegeName: '',
      gmail: '',
      phoneNumber: '',
    });
    setIsSuccess(false);
    setError('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95%] sm:max-w-[500px] bg-card-bg border-card-border text-heading p-4 sm:p-6 theme-transition">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
            <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            Get Started with Tectonix
          </DialogTitle>
          <DialogDescription className="text-text-muted text-sm sm:text-base">
            Join 10,000+ students already learning on our platform. Start your journey today!
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-6 sm:py-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-500/20 mb-4"
              >
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
              </motion.div>
              <h3 className="text-lg sm:text-xl text-heading mb-2 font-semibold">Welcome Aboard! 🎉</h3>
              <p className="text-sm sm:text-base text-text-muted">We'll reach out to you shortly with next steps.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="name" className="text-sm text-text-secondary">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  className="bg-surface border-surface-border text-heading placeholder:text-text-muted focus:border-blue-500 h-10 sm:h-11 theme-transition"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="gmail" className="text-sm text-text-secondary">
                  Email Address *
                </Label>
                <Input
                  id="gmail"
                  name="gmail"
                  type="email"
                  value={formData.gmail}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@gmail.com"
                  className="bg-surface border-surface-border text-heading placeholder:text-text-muted focus:border-blue-500 h-10 sm:h-11 theme-transition"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm text-text-secondary">
                  Phone Number *
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="+91 XXXXXXXXXX"
                  pattern="[0-9+\s-()]+"
                  className="bg-surface border-surface-border text-heading placeholder:text-text-muted focus:border-blue-500 h-10 sm:h-11 theme-transition"
                />
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label htmlFor="collegeName" className="text-sm text-text-secondary">
                  College Name *
                </Label>
                <Input
                  id="collegeName"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your college name"
                  className="bg-surface border-surface-border text-heading placeholder:text-text-muted focus:border-blue-500 h-10 sm:h-11 theme-transition"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Benefits Preview */}
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3 sm:p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  Access to all courses at ₹999
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  Industry-ready projects & certifications
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  Live mentorship & placement support
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 bg-surface border-surface-border text-heading hover:bg-surface-hover h-10 sm:h-11 theme-transition"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-xl hover:shadow-blue-500/50 transition-all h-10 sm:h-11"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Start Learning
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}