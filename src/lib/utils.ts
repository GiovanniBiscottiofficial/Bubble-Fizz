import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const INQUIRY_EMAIL = 'bubble_fizzbar@yahoo.com';

export function buildInquiryMailto(subject = 'Booking Inquiry', extra = '') {
  const body = `🥂 Bubble & Fizz Mobile Bartending

Hi there,

I'd love to book mobile bartending for my upcoming event. Here are the details I can share so far:

Event Date:
Location / Venue:
Estimated Guest Count:
Event Type:
Preferred Package or Menu:

A few details about the vibe:
${extra || '[tell us more about your event]'}

I look forward to hearing from you!

—
Bubble & Fizz Mobile Bartending
Luxury champagne bars & craft cocktails
https://bubbleandfizz.co`
  return `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
