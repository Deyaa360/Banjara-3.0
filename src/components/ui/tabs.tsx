"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

// Simple tabs implementation without Radix UI
interface TabsProps {
  children: React.ReactNode;
  defaultValue?: string;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ children, className, ...props }) => {
  return <div className={cn("w-full", className)} {...props}>{children}</div>;
};

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

const TabsList: React.FC<TabsListProps> = ({ children, className, ...props }) => {
  return (
    <div 
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

interface TabsTriggerProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

const TabsTrigger: React.FC<TabsTriggerProps> = ({ children, className, ...props }) => {
  return (
    <button 
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50",
        className
      )} 
      {...props}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

const TabsContent: React.FC<TabsContentProps> = ({ children, className, ...props }) => {
  return (
    <div 
      className={cn(
        "mt-2 focus:outline-none",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent }