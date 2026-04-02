// src/components/Services.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { Panel } from './ui/Panel';
import { Bus, Clock, Shield, Headphones, Award, Users } from 'lucide-react';

export const Services = () => {
  const services = [
    { icon: Bus, title: 'Wide Network', description: 'Covering all major cities across Ethiopia' },
    { icon: Clock, title: 'On-Time Service', description: 'Punctual departures and arrivals' },
    { icon: Shield, title: 'Safe Travel', description: 'Modern buses with safety features' },
    { icon: Headphones, title: '24/7 Support', description: 'Customer service always available' },
    { icon: Award, title: 'Best Prices', description: 'Competitive rates and discounts' },
    { icon: Users, title: 'Comfortable', description: 'Spacious seats with AC' },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Our Services"
          subtitle="Experience the best travel services with us"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Panel glass>
                <service.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
              </Panel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};