"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "violet" | "bubblegum";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  href?: string;
}

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  type = "button",
  href,
}: ButtonProps) {
  const baseClasses =
    "font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center relative overflow-hidden group";

  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:shadow-2xl hover:shadow-purple-500/25 focus:ring-purple-500 hover:scale-105 transform transition-all duration-300",
    secondary:
      "bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white hover:shadow-2xl hover:shadow-blue-500/25 focus:ring-blue-500 hover:scale-105 transform transition-all duration-300",
    violet:
      "bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600 text-white hover:shadow-2xl hover:shadow-violet-500/30 focus:ring-violet-500 hover:scale-105 transform transition-all duration-300",
    bubblegum:
      "bg-gradient-to-r from-pink-400 via-pink-500 to-yellow-400 text-white hover:shadow-2xl hover:shadow-pink-500/30 focus:ring-pink-500 hover:scale-105 transform transition-all duration-300",
    outline:
      "border-2 border-gradient-to-r from-indigo-500 to-purple-500 bg-transparent text-white hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 focus:ring-purple-500 relative before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-indigo-500 before:to-purple-500 before:-z-10 hover:scale-105 transform transition-all duration-300",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  const componentClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        whileHover={{ scale: disabled ? 1 : 1.05, y: -2 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={componentClasses}
        href={href}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05, y: -2 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={componentClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
    </motion.button>
  );
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  gradient = "from-indigo-500 via-purple-500 to-pink-500",
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group relative p-8 rounded-3xl bg-glass backdrop-blur-xl border border-white/10 hover:border-purple-400/30 transition-all duration-500 overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

      <div
        className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${gradient} mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl shadow-purple-500/25`}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>

      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500">
        {title}
      </h3>

      <p className="text-gray-300 leading-relaxed group-hover:text-gray-100 transition-colors duration-500">
        {description}
      </p>
    </motion.div>
  );
}

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  className = "",
}: LoadingSpinnerProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div
      className={`animate-spin rounded-full border-2 border-transparent bg-gradient-conic from-indigo-500 via-purple-500 to-pink-500 ${sizes[size]} ${className}`}
    />
  );
}

interface GradientTextProps {
  children: React.ReactNode;
  gradient?: string;
  className?: string;
}

export function GradientText({
  children,
  gradient = "from-indigo-400 via-purple-500 to-pink-400",
  className = "",
}: GradientTextProps) {
  return (
    <span
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent font-bold animate-pulse-glow ${className}`}
    >
      {children}
    </span>
  );
}

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  to,
  suffix = "",
  className = "",
}: Omit<AnimatedCounterProps, "from" | "duration">) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {to}
      {suffix}
    </motion.span>
  );
}
