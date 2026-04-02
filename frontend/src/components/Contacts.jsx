// src/components/Contacts.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Linkedin, Clock, MessageCircle, Globe, Award } from 'lucide-react';
import toast from 'react-hot-toast';

export const Contacts = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Message sent successfully! We\'ll respond within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: Phone, title: 'Phone Support', details: '+251 11 123 4567', sub: 'Available 24/7', color: 'from-green-500 to-emerald-500', action: 'tel:+251111234567' },
    { icon: Mail, title: 'Email Us', details: 'info@busticketing.com', sub: 'Response within 2 hours', color: 'from-blue-500 to-cyan-500', action: 'mailto:info@busticketing.com' },
    { icon: MapPin, title: 'Head Office', details: 'Addis Ababa, Ethiopia', sub: 'Bole Road, Dream Tower', color: 'from-red-500 to-pink-500', action: '#' },
    { icon: Clock, title: 'Working Hours', details: '24/7 Available', sub: 'Always here for you', color: 'from-purple-500 to-indigo-500', action: '#' },
  ];

  const offices = [
    { city: 'Addis Ababa', address: 'Bole Road, Dream Tower, 3rd Floor', phone: '+251 11 123 4567' },
    { city: 'Bahir Dar', address: 'Kebele 03, Near Abay River', phone: '+251 58 123 4567' },
    { city: 'Hawassa', address: 'Sidama Region, Main Road', phone: '+251 46 123 4567' },
  ];

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', color: 'bg-blue-600', link: '#' },
    { icon: Twitter, name: 'Twitter', color: 'bg-sky-500', link: '#' },
    { icon: Instagram, name: 'Instagram', color: 'bg-pink-600', link: '#' },
    { icon: Linkedin, name: 'LinkedIn', color: 'bg-blue-700', link: '#' },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-blue-900/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond promptly
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            {contactInfo.map((info, index) => (
              <motion.a
                key={index}
                href={info.action}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="block"
              >
                <div className="glass-card p-5 flex items-center space-x-4">
                  <div className={`w-14 h-14 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <info.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">{info.title}</h3>
                    <p className="text-gray-300">{info.details}</p>
                    <p className="text-sm text-gray-400">{info.sub}</p>
                  </div>
                </div>
              </motion.a>
            ))}
            
            {/* Social Links */}
            <div className="glass-card p-6">
              <h3 className="font-bold text-lg text-white mb-4 text-center">Follow Us</h3>
              <div className="flex justify-center space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${social.color} p-3 rounded-full shadow-lg hover:shadow-xl transition-all`}
                  >
                    <social.icon className="w-5 h-5 text-white" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card p-8">
              <div className="flex items-center space-x-2 mb-6">
                <MessageCircle className="w-6 h-6 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Send us a Message</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Your Name *</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                  <input
                    type="text"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                  <textarea
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 transition-all resize-none"
                    required
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <>
                      <Send className="w-4 h-4 inline mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Office Locations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-white">Our Office Locations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card p-6 text-center"
              >
                <MapPin className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                <h4 className="text-xl font-bold text-white mb-2">{office.city}</h4>
                <p className="text-gray-300 mb-2">{office.address}</p>
                <p className="text-gray-400">{office.phone}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12"
        >
          <div className="glass-card overflow-hidden rounded-2xl">
            <div className="h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.0!2d38.763611!3d9.03!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDEnNDguMCJOIDM4wrA0NSc0OS4wIkU!5e0!3m2!1sen!2set!4v1640000000000!5m2!1sen!2set"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Location Map"
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};