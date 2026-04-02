// src/components/Contacts.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from './ui/Button';
import { Field } from './ui/Field';
import { Panel } from './ui/Panel';
import { SectionHeading } from './SectionHeading';
import toast from 'react-hot-toast';

export const Contacts = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    { icon: Phone, title: 'Phone', details: '+251 11 123 4567', color: 'text-blue-600' },
    { icon: Mail, title: 'Email', details: 'info@busticketing.com', color: 'text-green-600' },
    { icon: MapPin, title: 'Address', details: 'Addis Ababa, Ethiopia', color: 'text-red-600' },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Contact Us"
          subtitle="Get in touch with us for any inquiries"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Panel>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Field
                label="Your Name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Field
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Field
                label="Message"
                placeholder="Your message here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
              <Button type="submit" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </form>
          </Panel>

          <div className="space-y-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Panel>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800 ${info.color}`}>
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{info.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{info.details}</p>
                    </div>
                  </div>
                </Panel>
              </motion.div>
            ))}
            
            <Panel>
              <div className="h-64 rounded-lg overflow-hidden">
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
            </Panel>
          </div>
        </div>
      </div>
    </section>
  );
};