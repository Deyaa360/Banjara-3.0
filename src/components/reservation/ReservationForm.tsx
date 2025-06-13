'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
// import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock time slots
const timeSlots = [
  '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', 
  '2:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', 
  '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
];

// Mock party sizes
const partySizes = [1, 2, 3, 4, 5, 6, 7, 8];

const ReservationForm = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const [partySize, setPartySize] = useState<string>("2");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setTimeSlot(null);
        setPartySize("2");
        setName('');
        setEmail('');
        setPhone('');
        setSpecialRequests('');
      }, 3000);
    }, 1500);
  };

  return (
    <div>
      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-primary/30 bg-card">
            <CardHeader>
              <CardTitle className="text-2xl font-display text-primary">Reservation Confirmed!</CardTitle>
              <CardDescription className="text-muted-foreground">
                Thank you for your reservation. We've sent a confirmation to your email.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground font-medium">
                {date && format(date, 'EEEE, MMMM d, yyyy')} at {timeSlot} for {partySize} {parseInt(partySize) === 1 ? 'person' : 'people'}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Date Selection */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-foreground">
              Select Date
            </Label>
            <div className="relative">
              <Button
                id="date"
                type="button"
                variant="outline"
                className="w-full justify-start text-left font-normal bg-background border-input text-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => {
                  setShowDatePicker(!showDatePicker);
                  setShowTimePicker(false);
                }}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
              
              {showDatePicker && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-50 mt-2 w-auto p-0 bg-background border border-input rounded-md shadow-lg"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate);
                      setShowDatePicker(false);
                    }}
                    initialFocus
                    disabled={(date) => {
                      // Disable dates in the past
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date < today;
                    }}
                    className="bg-background text-foreground"
                  />
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Time Selection */}
          <div className="space-y-2">
            <Label htmlFor="time" className="text-foreground">
              Select Time
            </Label>
            <div className="relative">
              <Button
                id="time"
                type="button"
                variant="outline"
                className="w-full justify-start text-left font-normal bg-background border-input text-foreground hover:bg-accent hover:text-accent-foreground"
                onClick={() => {
                  setShowTimePicker(!showTimePicker);
                  setShowDatePicker(false);
                }}
              >
                <Clock className="mr-2 h-4 w-4 text-primary" />
                {timeSlot ? timeSlot : <span>Select a time</span>}
              </Button>
              
              {showTimePicker && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-50 mt-2 w-48 bg-background border border-input rounded-md shadow-lg"
                >
                  <div className="grid grid-cols-2 gap-2 p-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        type="button"
                        variant={timeSlot === time ? "default" : "outline"}
                        className={timeSlot === time 
                          ? "text-sm bg-primary text-primary-foreground hover:bg-primary/90" 
                          : "text-sm bg-background border-input text-foreground hover:bg-accent hover:text-accent-foreground"}
                        onClick={() => {
                          setTimeSlot(time);
                          setShowTimePicker(false);
                        }}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Party Size */}
          <div className="space-y-2">
            <Label htmlFor="party-size" className="text-foreground">
              Party Size
            </Label>
            <select
              id="party-size"
              value={partySize}
              onChange={(e) => setPartySize(e.target.value)}
              className="w-full p-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {partySizes.map((size) => (
                <option key={size} value={size.toString()}>
                  {size} {size === 1 ? 'person' : 'people'}
                </option>
              ))}
              <option value="9">8+ (Please call us)</option>
            </select>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-primary" />
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="pl-10 bg-background border-input text-foreground focus:ring-primary"
                  placeholder="John Doe"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-primary" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-background border-input text-foreground focus:ring-primary"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">
                Phone
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-primary" />
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="pl-10 bg-background border-input text-foreground focus:ring-primary"
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>
          </div>
          
          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="special-requests" className="text-foreground">
              Special Requests
            </Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-primary" />
              <Textarea
                id="special-requests"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="pl-10 bg-background border-input text-foreground focus:ring-primary"
                placeholder="Any special requests or dietary requirements?"
                rows={4}
              />
            </div>
          </div>
          
          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Make Reservation'}
          </Button>
          
          <p className="text-sm text-muted-foreground text-center">
            By making a reservation, you agree to our reservation policy.
          </p>
        </motion.form>
      )}
    </div>
  );
};

export default ReservationForm;