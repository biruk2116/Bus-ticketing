// src/components/AboutUs.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { Panel } from './ui/Panel';

export const AboutUs = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading
              title="About Us"
              subtitle="Your trusted travel partner since 2010"
            />
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              BusTicketing Ethiopia is a leading online bus ticketing platform that connects travelers 
              with reliable bus operators across the country. We're committed to making bus travel 
              convenient, affordable, and enjoyable for everyone.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              With our user-friendly platform, you can easily search, compare, and book bus tickets 
              from the comfort of your home. We partner with the best bus operators to ensure 
              comfort, safety, and punctuality.
            </p>
            <div className="flex space-x-8">
              <div>
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-gray-600 dark:text-gray-400">Bus Partners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">100K+</div>
                <div className="text-gray-600 dark:text-gray-400">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">20+</div>
                <div className="text-gray-600 dark:text-gray-400">Cities Covered</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3"
                alt="About Us"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};