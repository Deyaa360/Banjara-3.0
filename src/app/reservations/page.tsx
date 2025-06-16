"use client";

import { useState, useEffect, useCallback } from "react";
import { format, addDays, isBefore, isAfter, setHours, setMinutes, parseISO } from "date-fns";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Phone, 
  Mail, 
  User, 
  AlertCircle, 
  CheckCircle2,
  ChevronRight,
  Home,
  Info,
  Calendar as CalendarLucide,
  MapPin,
  ChevronsUp,
  ChevronsDown,
  Utensils
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  generateTimeSlots,
  getAvailableTables,
  createReservation,
  type TimeSlot,
  type Table,
  type ReservationRequest,
  RESTAURANT_CONFIG
} from "@/lib/reservations";

export default function ReservationsPage() {
  
  // Form state
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>("");
  const [guests, setGuests] = useState<string>("");
  const [tableId, setTableId] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  
  // Form validation state
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // UI state
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [availableTables, setAvailableTables] = useState<Table[]>([]);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [reservationId, setReservationId] = useState<string>("");
  const [isDateSelectOpen, setIsDateSelectOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate time slots when date changes
  useEffect(() => {
    if (date) {
      setLoading(true);
      try {
        const slots = generateTimeSlots(date);
        setTimeSlots(slots);
        setTime("");
        setTableId("");
        setAvailableTables([]);
      } catch (err) {
        setError(["Failed to generate time slots"]);
      } finally {
        setLoading(false);
      }
    }
  }, [date]);

  // Update available tables when time changes
  useEffect(() => {
    if (date && time) {
      setLoading(true);
      try {
        const tables = getAvailableTables(date, time);
        setAvailableTables(tables);
        setTableId("");
      } catch (err) {
        setError(["Failed to get available tables"]);
      } finally {
        setLoading(false);
      }
    }
  }, [date, time]);

  // Form validation functions
  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Basic phone validation - can be enhanced for specific formats
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return re.test(phone.replace(/\s/g, ''));
  };

  const validateForm = (): boolean => {
    const errors = {
      name: "",
      email: "",
      phone: "",
    };
    
    let isValid = true;

    if (!name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!phone.trim()) {
      errors.phone = "Phone number is required";
      isValid = false;
    } else if (!validatePhone(phone)) {
      errors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError([]);
    
    // Validate all required fields
    if (!date || !time || !guests || !tableId) {
      setError(["Please complete all reservation details"]);
      return;
    }

    // Validate contact information
    if (!validateForm()) {
      setError(["Please correct the errors in the form"]);
      return;
    }
    
    // Check if the selected time has already passed
    const now = new Date();
    const selectedDateTime = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    selectedDateTime.setHours(hours, minutes, 0, 0);
    
    if (selectedDateTime < now) {
      setError(["Cannot make reservations for a time that has already passed"]);
      return;
    }

    setLoading(true);

    try {
      const request: ReservationRequest = {
        date,
        time,
        guests: parseInt(guests),
        tableId: parseInt(tableId),
        name,
        email,
        phone,
        specialRequests: specialRequests || undefined
      };

      const result = await createReservation(request);

      if (result.success && result.reservation) {
        setSuccess(true);
        setReservationId(result.reservation.id);
        setStep(4);
        // Scroll to top to show confirmation
        scrollToTop();
      } else {
        setError(result.errors || ["Failed to create reservation"]);
      }
    } catch (err) {
      setError(["An unexpected error occurred. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="mb-6 pb-4 border-b">
              <h3 className="text-xl font-serif font-medium text-primary">1. Choose Your Reservation Details</h3>
              <p className="text-sm text-muted-foreground mt-1">Select your preferred date, time, and party size</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date-select" className="text-base font-medium flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  <span>Select Date</span>
                </Label>
                <Popover open={isDateSelectOpen} onOpenChange={setIsDateSelectOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="date-select"
                      variant="outline"
                      className={cn(
                        "w-full max-w-full h-12 bg-background border-2 justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white border-2 shadow-lg" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => {
                        if (newDate) {
                          setDate(newDate);
                          setIsDateSelectOpen(false);
                        }
                      }}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0); // Set to beginning of today
                        
                        // Only disable dates before today and after max booking window
                        return date < today || 
                               isAfter(date, addDays(today, RESTAURANT_CONFIG.maxAdvanceBooking));
                      }}
                      initialFocus
                      className="rounded-md border-0"
                    />
                    <div className="p-3 border-t text-xs text-muted-foreground space-y-1">
                      <p>You can book up to {RESTAURANT_CONFIG.maxAdvanceBooking} days in advance.</p>
                      <p>Same-day reservations available with just {RESTAURANT_CONFIG.minimumReservationNotice} minutes notice.</p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {date && (
                <div className="space-y-2 animate-in fade-in-50 duration-300">
                  <Label htmlFor="time-select" className="text-base font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Select Time</span>
                  </Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger 
                      id="time-select"
                      className="h-12 bg-background border-2"
                    >
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 shadow-lg max-h-[300px]">
                      {loading ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                          Loading available times...
                        </div>
                      ) : timeSlots.length === 0 ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                          No time slots available for this date
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-1 p-1">
                          {timeSlots.map((slot) => (
                            <SelectItem
                              key={slot.time}
                              value={slot.time}
                              disabled={!slot.isAvailable}
                              className={cn(
                                "h-12 text-foreground data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
                                "hover:bg-accent hover:text-accent-foreground rounded-md",
                                "flex items-center justify-center"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="font-medium">{slot.time}</span>
                                {!slot.isAvailable && (
                                  <span className="text-xs text-destructive ml-1">(Full)</span>
                                )}
                              </div>
                            </SelectItem>
                          ))}
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Dining duration: {RESTAURANT_CONFIG.diningDuration / 60} hours
                  </p>
                </div>
              )}

              {date && time && (
                <div className="space-y-2 animate-in fade-in-50 duration-300">
                  <Label htmlFor="guests-select" className="text-base font-medium flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>Number of Guests</span>
                  </Label>
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger 
                      id="guests-select"
                      className="h-12 bg-background border-2"
                    >
                      <SelectValue placeholder="Select number of guests" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 shadow-lg">
                      {Array.from(
                        { length: RESTAURANT_CONFIG.maxPartySize },
                        (_, i) => i + 1
                      ).map((num) => (
                        <SelectItem 
                          key={num} 
                          value={num.toString()}
                          className="h-12 text-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span className="font-medium">
                              {num} {num === 1 ? "Guest" : "Guests"}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    For parties larger than {RESTAURANT_CONFIG.maxPartySize}, please call us directly.
                  </p>
                </div>
              )}

              {date && time && guests && (
                <div className={cn(
                  "space-y-2 animate-in fade-in-50 duration-300",
                  availableTables.length === 0 && "opacity-50"
                )}>
                  <Label htmlFor="table-select" className="text-base font-medium flex items-center gap-2">
                    <Utensils className="h-4 w-4 text-primary" />
                    <span>Select Table</span>
                  </Label>
                  <Select 
                    value={tableId} 
                    onValueChange={setTableId}
                    disabled={availableTables.length === 0 || loading}
                  >
                    <SelectTrigger 
                      id="table-select"
                      className="h-12 bg-background border-2"
                    >
                      <SelectValue placeholder={
                        loading 
                          ? "Loading tables..." 
                          : availableTables.length === 0 
                            ? "No tables available" 
                            : "Select a table"
                      } />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 shadow-lg">
                      {availableTables.length === 0 ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                          No tables available for this time and party size
                        </div>
                      ) : (
                        availableTables.map((table) => (
                          <SelectItem 
                            key={table.id} 
                            value={table.id.toString()}
                            className="h-12 text-foreground hover:bg-accent hover:text-accent-foreground"
                            disabled={table.minPartySize > parseInt(guests) || table.maxPartySize < parseInt(guests)}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{table.name}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                ({table.minPartySize}-{table.maxPartySize} guests)
                              </span>
                            </div>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tables are assigned based on your party size and availability.
                  </p>
                </div>
              )}

              {date && time && guests && tableId && (
                <Button
                  className="w-full mt-6 h-12 text-base animate-in fade-in-50 duration-300"
                  onClick={() => setStep(2)}
                >
                  Continue to Contact Details
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="mb-6 pb-4 border-b">
              <h3 className="text-xl font-serif font-medium text-primary">2. Your Contact Information</h3>
              <p className="text-sm text-muted-foreground mt-1">We'll use these details to confirm your reservation</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-medium flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <span>Full Name</span>
                  <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (formErrors.name && e.target.value.trim()) {
                        setFormErrors({...formErrors, name: ""});
                      }
                    }}
                    className={cn(
                      "h-12 pl-4 bg-background border-2 w-full max-w-full",
                      formErrors.name && "border-destructive focus-visible:ring-destructive"
                    )}
                    placeholder="Enter your full name"
                    aria-invalid={!!formErrors.name}
                    aria-describedby={formErrors.name ? "name-error" : undefined}
                  />
                </div>
                {formErrors.name && (
                  <p id="name-error" className="text-sm text-destructive flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {formErrors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>Email Address</span>
                  <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (formErrors.email && e.target.value.trim()) {
                        setFormErrors({...formErrors, email: ""});
                      }
                    }}
                    className={cn(
                      "h-12 pl-4 bg-background border-2 w-full max-w-full",
                      formErrors.email && "border-destructive focus-visible:ring-destructive"
                    )}
                    placeholder="Enter your email address"
                    aria-invalid={!!formErrors.email}
                    aria-describedby={formErrors.email ? "email-error" : undefined}
                  />
                </div>
                {formErrors.email && (
                  <p id="email-error" className="text-sm text-destructive flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {formErrors.email}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  We'll send a confirmation email with your reservation details
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>Phone Number</span>
                  <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (formErrors.phone && e.target.value.trim()) {
                        setFormErrors({...formErrors, phone: ""});
                      }
                    }}
                    className={cn(
                      "h-12 pl-4 bg-background border-2 w-full max-w-full",
                      formErrors.phone && "border-destructive focus-visible:ring-destructive"
                    )}
                    placeholder="Enter your phone number"
                    aria-invalid={!!formErrors.phone}
                    aria-describedby={formErrors.phone ? "phone-error" : undefined}
                  />
                </div>
                {formErrors.phone && (
                  <p id="phone-error" className="text-sm text-destructive flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    {formErrors.phone}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  We may contact you in case of changes or to confirm your reservation
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <Label htmlFor="specialRequests" className="text-base font-medium flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                  <span>Special Requests</span>
                  <span className="text-xs text-muted-foreground">(Optional)</span>
                </Label>
                <Textarea
                  id="specialRequests"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Any dietary requirements, allergies, special occasions, or seating preferences?"
                  className="min-h-[100px] bg-background border-2 resize-none w-full max-w-full"
                />
                <p className="text-xs text-muted-foreground">
                  We'll do our best to accommodate your requests, but they cannot be guaranteed
                </p>
              </div>

              <div className="flex gap-4 mt-6">
                <Button
                  variant="outline"
                  className="w-full h-12"
                  onClick={() => setStep(1)}
                >
                  <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
                  Back
                </Button>
                <Button
                  className="w-full h-12"
                  onClick={() => {
                    if (validateForm()) {
                      setStep(3);
                    } else {
                      setError(["Please fill in all required fields correctly"]);
                    }
                  }}
                >
                  Review Reservation
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        );

      case 3:
        const selectedTable = availableTables.find(t => t.id.toString() === tableId);
        return (
          <div className="space-y-6">
            <div className="mb-6 pb-4 border-b">
              <h3 className="text-xl font-serif font-medium text-primary">3. Review Your Reservation</h3>
              <p className="text-sm text-muted-foreground mt-1">Please confirm all details before finalizing</p>
            </div>
            
            <Alert className="bg-amber-50 border-amber-200 text-amber-800">
              <Info className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800 font-medium">Almost Done!</AlertTitle>
              <AlertDescription className="text-amber-700">
                Please review your reservation details carefully before confirming.
              </AlertDescription>
            </Alert>

            <div className="space-y-4 rounded-lg border-2 border-primary/10 p-6 bg-primary/5">
              <h4 className="font-serif text-lg font-medium text-primary flex items-center gap-2">
                <CalendarLucide className="h-5 w-5" />
                Reservation Details
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 bg-primary/10 p-1.5 rounded-full">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Date</p>
                      <p className="font-medium text-lg">{date && format(date, "PPPP")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 bg-primary/10 p-1.5 rounded-full">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Time</p>
                      <p className="font-medium text-lg">{time}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Please arrive 5-10 minutes before your reservation time
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 bg-primary/10 p-1.5 rounded-full">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Party Size</p>
                      <p className="font-medium text-lg">{guests} {parseInt(guests) === 1 ? "Guest" : "Guests"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 bg-primary/10 p-1.5 rounded-full">
                      <Utensils className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Table</p>
                      <p className="font-medium text-lg">{selectedTable?.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Accommodates {selectedTable?.minPartySize}-{selectedTable?.maxPartySize} guests
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-primary/10 pt-6 mt-6">
                <h4 className="font-serif text-lg font-medium text-primary flex items-center gap-2 mb-4">
                  <User className="h-5 w-5" />
                  Contact Information
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 bg-primary/10 p-1.5 rounded-full">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Name</p>
                      <p className="font-medium">{name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 bg-primary/10 p-1.5 rounded-full">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone</p>
                      <p className="font-medium">{phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 md:col-span-2">
                    <div className="mt-0.5 bg-primary/10 p-1.5 rounded-full">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="font-medium">{email}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        A confirmation email will be sent to this address
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {specialRequests && (
                <div className="border-t border-primary/10 pt-6">
                  <h4 className="font-serif text-lg font-medium text-primary flex items-center gap-2 mb-4">
                    <Info className="h-5 w-5" />
                    Special Requests
                  </h4>
                  <div className="bg-white/50 p-4 rounded-md border border-primary/10">
                    <p className="text-sm">{specialRequests}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 text-sm text-muted-foreground">
              <p>By confirming this reservation, you agree to our <Link href="#" className="text-primary underline">reservation policy</Link>.</p>
            </div>

            <div className="flex gap-4 mt-4">
              <Button
                variant="outline"
                className="w-full h-12"
                onClick={() => setStep(2)}
              >
                <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
                Back to Edit
              </Button>
              <Button
                className="w-full h-12"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="animate-pulse">Processing...</span>
                  </>
                ) : (
                  <>
                    Confirm Reservation
                    <CheckCircle2 className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="mb-6 pb-4 border-b">
              <h3 className="text-xl font-serif font-medium text-primary">Reservation Confirmed</h3>
              <p className="text-sm text-muted-foreground mt-1">Your table has been successfully reserved</p>
            </div>
            
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-serif font-medium text-green-800">Thank You!</h3>
              <p className="text-green-700 mt-2">
                Your reservation has been confirmed and is ready to go.
              </p>
            </div>

            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Reservation ID: <span className="font-mono font-medium">{reservationId}</span></AlertTitle>
              <AlertDescription className="text-green-700">
                Please save this ID for your reference. A confirmation email has been sent to {email}.
              </AlertDescription>
            </Alert>

            <div className="space-y-4 rounded-lg border-2 p-6 mt-6">
              <h4 className="font-serif text-lg font-medium flex items-center gap-2">
                <CalendarLucide className="h-5 w-5 text-primary" />
                Reservation Summary
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">{date && format(date, "PPPP")}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Time</p>
                  <p className="font-medium">{time}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Party Size</p>
                  <p className="font-medium">{guests} {parseInt(guests) === 1 ? "Guest" : "Guests"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Table</p>
                  <p className="font-medium">
                    {availableTables.find(t => t.id.toString() === tableId)?.name}
                  </p>
                </div>
                <div className="col-span-2 border-t pt-4 mt-2">
                  <p className="text-muted-foreground">Reserved For</p>
                  <p className="font-medium">{name}</p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-6 space-y-4 mt-4">
              <h4 className="font-medium flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Next Steps
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="mt-1 min-w-4">•</div>
                  <p>A confirmation email has been sent to your email address.</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 min-w-4">•</div>
                  <p>Please save your reservation ID: <span className="font-mono font-medium">{reservationId}</span></p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 min-w-4">•</div>
                  <p>Review our reservation policy for important information about your visit.</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 min-w-4">•</div>
                  <p>For any questions, please refer to the contact information in our "Need Help" section.</p>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              <Button
                className="w-full h-12"
                onClick={() => {
                  setStep(1);
                  setDate(new Date());
                  setTime("");
                  setGuests("");
                  setTableId("");
                  setName("");
                  setEmail("");
                  setPhone("");
                  setSpecialRequests("");
                  setSuccess(false);
                  setReservationId("");
                }}
              >
                Make Another Reservation
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                asChild
              >
                <Link href="/">Return to Homepage</Link>
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('./banner1.png')",
            filter: "brightness(0.7)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white px-4 mt-16 md:mt-24">
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Reserve Your Table
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-200">
              Experience the perfect dining atmosphere at Banjara. Book your table
              now and enjoy our exceptional service and authentic Indian cuisine.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="h-4 w-4 text-gold-400" />
                <span>123 Main Street, New York</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="flex items-center hover:text-primary transition-colors">
              <Home className="h-3.5 w-3.5 mr-1" />
              <span>Home</span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5 mx-2" />
            <span className="text-foreground font-medium">Reservations</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr,320px]">
          {/* Reservation Form */}
          <div className="space-y-6 w-full max-w-full overflow-x-hidden">
            {error.length > 0 && (
              <Alert variant="destructive" className="animate-in fade-in-50 duration-300">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  <ul className="list-inside list-disc">
                    {error.map((err, index) => (
                      <li key={index}>{err}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <div className="rounded-lg border-2 bg-card p-4 sm:p-6 md:p-8 shadow-lg w-full overflow-x-visible">
              {renderStepContent()}
            </div>
            
            {/* FAQ Section - Only show on steps 1 and 2 */}
            {(step === 1 || step === 2) && (
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-2xl font-serif font-medium mb-6">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-base font-medium">
                      Can I request a specific table or seating area?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Yes, you can indicate your seating preference in the "Special Requests" section. 
                      While we cannot guarantee specific tables, we will do our best to accommodate your preferences.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-base font-medium">
                      Do you accommodate dietary restrictions?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Yes, we can accommodate many dietary restrictions including vegetarian, vegan, gluten-free, and allergies. 
                      Please mention your dietary needs in the "Special Requests" section when making your reservation.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-base font-medium">
                      Is there a dress code for dining at Banjara?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      We suggest smart casual attire. While we don't enforce a strict dress code, we recommend avoiding 
                      athletic wear, beachwear, or overly casual clothing to enhance your dining experience.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-base font-medium">
                      Can I bring my own cake for a special occasion?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Yes, you may bring your own cake for special celebrations. Please inform us in advance in the 
                      "Special Requests" section. A small plating fee may apply.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-base font-medium">
                      Do you have high chairs or booster seats for children?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      Yes, we provide high chairs and booster seats for young guests. Please mention that you'll need 
                      these accommodations in the "Special Requests" section when making your reservation.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
          </div>

          {/* Information Sidebar */}
          <div className="space-y-6">
            <div className="rounded-lg border-2 bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-serif text-lg font-semibold text-primary">
                Restaurant Information
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 bg-primary/10 p-1.5 rounded-full">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Hours</p>
                    <p>11:00 AM - 10:00 PM</p>
                    <p>Open Daily</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 bg-primary/10 p-1.5 rounded-full">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Location</p>
                    <p>123 Main Street</p>
                    <p>New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border-2 bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-serif text-lg font-semibold text-primary">
                Reservation Policy
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Reservations can be made up to {RESTAURANT_CONFIG.maxAdvanceBooking} days in advance</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Please arrive 5-10 minutes before your reservation time</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Cancellations must be made at least 24 hours in advance</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Tables are held for 15 minutes after the reservation time</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>A credit card may be required for parties of 6 or more</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Party size is limited to 1-8 guests per table</span>
                </p>
              </div>
            </div>

            <div className="rounded-lg border-2 bg-card p-6 shadow-sm">
              <h3 className="mb-4 font-serif text-lg font-semibold text-primary">
                Need Help?
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  For special arrangements, large parties, or any questions about your reservation:
                </p>
                <div className="space-y-3">
                  <a href="tel:+15551234567" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <div className="bg-primary/10 p-1.5 rounded-full">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    <span>+1 (555) 123-4567</span>
                  </a>
                  <a href="mailto:reservations@banjara.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <div className="bg-primary/10 p-1.5 rounded-full">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <span>reservations@banjara.com</span>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border-2 bg-primary/5 p-6 shadow-sm">
              <h3 className="mb-4 font-serif text-lg font-semibold text-primary">
                Private Dining
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Looking to host a special event? Our private dining room is perfect for celebrations, 
                  corporate events, and family gatherings.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/contact">Inquire About Private Dining</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all z-50 animate-in fade-in duration-300"
          aria-label="Scroll to top"
        >
          <ChevronsUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}