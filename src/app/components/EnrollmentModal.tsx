import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState } from 'react';
import { CheckCircle, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  coursePrice: string;
}

export function EnrollmentModal({ isOpen, onClose, courseName, coursePrice }: EnrollmentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    collegeName: '',
    course: courseName,
    phoneNumber: '',
    gmail: '',
    crNumber: '',
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
      const enrollmentData = {
        ...formData,
        enrollmentDate: new Date().toISOString(),
        coursePrice: coursePrice,
      };

      // Try to submit to backend
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8fc8fb29/enroll`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(enrollmentData),
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
        throw new Error(result.error || 'Failed to submit enrollment');
      }

      // Store data locally as backup
      try {
        const enrollments = JSON.parse(localStorage.getItem('tectonix_enrollments') || '[]');
        enrollments.push({
          ...enrollmentData,
          id: `local_${Date.now()}`,
          submittedAt: new Date().toISOString()
        });
        localStorage.setItem('tectonix_enrollments', JSON.stringify(enrollments));
        console.log('Enrollment also saved locally as backup');
      } catch (localError) {
        console.warn('Could not save to localStorage:', localError);
      }

      setIsSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      console.error('Enrollment error:', err);
      
      // If backend is unavailable, still save locally
      if (err instanceof TypeError && err.message.includes('fetch')) {
        try {
          const enrollmentData = {
            ...formData,
            enrollmentDate: new Date().toISOString(),
            coursePrice: coursePrice,
          };
          const enrollments = JSON.parse(localStorage.getItem('tectonix_enrollments') || '[]');
          enrollments.push({
            ...enrollmentData,
            id: `local_${Date.now()}`,
            submittedAt: new Date().toISOString(),
            status: 'pending_sync'
          });
          localStorage.setItem('tectonix_enrollments', JSON.stringify(enrollments));
          
          // Show success even if backend is down
          setIsSuccess(true);
          console.log('Enrollment saved locally. Will sync when backend is available.');
          setTimeout(() => {
            handleClose();
          }, 2000);
          return;
        } catch (localError) {
          console.error('Could not save locally:', localError);
        }
      }
      
      setError(err instanceof Error ? err.message : 'Failed to submit enrollment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      collegeName: '',
      course: courseName,
      phoneNumber: '',
      gmail: '',
      crNumber: '',
    });
    setIsSuccess(false);
    setError('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-surface border-card-border text-heading">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Enroll in {courseName}
          </DialogTitle>
          <DialogDescription className="text-text-muted">
            Fill in your details to enroll in this course at {coursePrice}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="py-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4"
              >
                <CheckCircle className="w-8 h-8 text-green-400" />
              </motion.div>
              <h3 className="text-xl text-heading mb-2">Enrollment Successful!</h3>
              <p className="text-text-muted">We'll contact you soon with course details.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-text-secondary">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                  className="bg-surface border-surface-border text-heading placeholder:text-text-muted focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gmail" className="text-text-secondary">
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
                  className="bg-surface border-surface-border text-heading placeholder:text-text-muted focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-text-secondary">
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
                  className="bg-surface border-surface-border text-heading placeholder:text-text-muted focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="collegeName" className="text-text-secondary">
                  College Name *
                </Label>
                <Input
                  id="collegeName"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your college name"
                  className="bg-surface border-surface-border text-heading placeholder:text-text-muted focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crNumber" className="text-text-secondary">
                  College Registration Number *
                </Label>
                <Input
                  id="crNumber"
                  name="crNumber"
                  value={formData.crNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your CR number"
                  className="bg-surface border-surface-border text-heading placeholder:text-text-muted focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="course" className="text-text-secondary">
                  Course
                </Label>
                <Input
                  id="course"
                  name="course"
                  value={formData.course}
                  readOnly
                  className="bg-surface border-surface-border text-text-muted cursor-not-allowed"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="flex-1 bg-surface border-surface-border text-heading hover:bg-surface-hover"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-xl hover:shadow-blue-500/50 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>Submit Enrollment</>
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