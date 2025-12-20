import React, { useState } from 'react';
import { X, Mail, ArrowRight } from 'lucide-react';
import { sendEmail } from '../../services/emailService';

const ContactModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = new FormData(e.target);
    const result = await sendEmail(formData);

    if (result.success) {
      setSubmitStatus('success');
      e.target.reset();
      setTimeout(() => setSubmitStatus(null), 5000);
    } else {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    }

    setIsSubmitting(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto relative shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="sticky top-6 right-6 float-right p-3 bg-[#2d4739] text-white rounded-full hover:bg-[#3d5a45] hover:scale-110 transition-all z-10 shadow-lg"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-12">
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#3d5a45] to-[#5a7a63] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Mail size={32} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold text-[#2d4739] mb-2">Send a Message</h3>
            <p className="text-[#6b8370]">I'll get back to you as soon as possible!</p>
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-green-800 text-sm">✓ Message sent successfully! I'll get back to you soon.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-800 text-sm">✗ Failed to send message. Please try again or email me directly.</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-[#2d4739] mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 border-[#d4dcd0] rounded-xl focus:outline-none focus:border-[#3d5a45] transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#2d4739] mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 border-[#d4dcd0] rounded-xl focus:outline-none focus:border-[#3d5a45] transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-[#2d4739] mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 border-[#d4dcd0] rounded-xl focus:outline-none focus:border-[#3d5a45] transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-[#2d4739] mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="5"
                disabled={isSubmitting}
                className="w-full px-4 py-3 border-2 border-[#d4dcd0] rounded-xl focus:outline-none focus:border-[#3d5a45] transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-gradient-to-r from-[#3d5a45] to-[#5a7a63] text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;