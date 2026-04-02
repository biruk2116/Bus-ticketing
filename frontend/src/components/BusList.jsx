// src/components/BusList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, MapPin, Users, ChevronUp, ChevronDown, Filter } from 'lucide-react';
import { Button } from './ui/Button';
import { Panel } from './ui/Panel';
import { Skeleton } from './ui/Skeleton';
import { formatTime, formatPrice } from '../lib/ui';

const buses = [
  { id: 1, name: 'Ethio Luxury Express', from: 'Addis Ababa', to: 'Bahir Dar', departure: '06:00', arrival: '12:00', price: 450, seatsAvailable: 25, totalSeats: 40, type: 'VIP' },
  { id: 2, name: 'Sky Bus', from: 'Addis Ababa', to: 'Gondar', departure: '07:30', arrival: '14:30', price: 550, seatsAvailable: 18, totalSeats: 40, type: 'VIP' },
  { id: 3, name: 'Selam Bus', from: 'Addis Ababa', to: 'Hawassa', departure: '08:00', arrival: '13:00', price: 350, seatsAvailable: 32, totalSeats: 45, type: 'Standard' },
  { id: 4, name: 'Sheba Bus', from: 'Addis Ababa', to: 'Mekelle', departure: '09:00', arrival: '18:00', price: 650, seatsAvailable: 12, totalSeats: 40, type: 'VIP' },
  { id: 5, name: 'Roha Bus', from: 'Addis Ababa', to: 'Lalibela', departure: '10:00', arrival: '17:00', price: 500, seatsAvailable: 8, totalSeats: 35, type: 'Standard' },
  { id: 6, name: 'Ahadu Bus', from: 'Addis Ababa', to: 'Axum', departure: '11:00', arrival: '20:00', price: 750, seatsAvailable: 22, totalSeats: 40, type: 'VIP' },
];

export const BusList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ type: 'all', priceRange: 'all' });

  useEffect(() => {
    setTimeout(() => {
      setFilteredBuses(buses);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let result = [...buses];

    if (filters.type !== 'all') {
      result = result.filter(bus => bus.type === filters.type);
    }

    if (filters.priceRange !== 'all') {
      const ranges = {
        low: [0, 400],
        medium: [400, 600],
        high: [600, Infinity],
      };
      const [min, max] = ranges[filters.priceRange];
      result = result.filter(bus => bus.price >= min && bus.price <= max);
    }

    result.sort((a, b) => {
      if (sortOrder === 'asc') return a[sortBy] - b[sortBy];
      return b[sortBy] - a[sortBy];
    });

    setFilteredBuses(result);
  }, [filters, sortBy, sortOrder]);

  const handleSelectBus = (bus) => {
    localStorage.setItem('selectedBus', JSON.stringify(bus));
    navigate('/booking');
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <Panel key={i}>
            <Skeleton className="h-32 w-full" />
          </Panel>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Available Buses ({filteredBuses.length})</h2>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {showFilters && (
        <Panel className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Bus Type</label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-800"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="all">All Types</option>
              <option value="VIP">VIP</option>
              <option value="Standard">Standard</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Price Range</label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:bg-gray-800"
              value={filters.priceRange}
              onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
            >
              <option value="all">All Prices</option>
              <option value="low">Under 400 ETB</option>
              <option value="medium">400 - 600 ETB</option>
              <option value="high">Above 600 ETB</option>
            </select>
          </div>
        </Panel>
      )}

      <div className="flex justify-end space-x-2 mb-4">
        <Button
          variant={sortBy === 'price' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => {
            setSortBy('price');
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
          }}
        >
          Price
          {sortBy === 'price' && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />)}
        </Button>
        <Button
          variant={sortBy === 'departure' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => {
            setSortBy('departure');
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
          }}
        >
          Departure Time
          {sortBy === 'departure' && (sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />)}
        </Button>
      </div>

      {filteredBuses.map((bus, index) => (
        <motion.div
          key={bus.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Panel>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{bus.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    bus.type === 'VIP' 
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white' 
                      : 'bg-gray-200 text-gray-800 dark:bg-gray-700'
                  }`}>
                    {bus.type}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {bus.from} → {bus.to}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Departure: {formatTime(bus.departure)} | Arrival: {formatTime(bus.arrival)}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Seats Available: {bus.seatsAvailable}/{bus.totalSeats}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{formatPrice(bus.price)}</div>
                <Button 
                  className="mt-2" 
                  onClick={() => handleSelectBus(bus)}
                  disabled={bus.seatsAvailable === 0}
                >
                  Select Seats
                </Button>
              </div>
            </div>
          </Panel>
        </motion.div>
      ))}
    </div>
  );
};