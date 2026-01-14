'use server';

import { createContactSubmission } from '@/lib/cosmic';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface SubmitResult {
  success: boolean;
  error?: string;
}

export async function submitContactForm(data: ContactFormData): Promise<SubmitResult> {
  // Validate required fields
  if (!data.name || !data.email || !data.subject || !data.message) {
    return {
      success: false,
      error: 'All fields are required.',
    };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return {
      success: false,
      error: 'Please enter a valid email address.',
    };
  }

  try {
    await createContactSubmission({
      name: data.name.trim(),
      email: data.email.trim(),
      subject: data.subject,
      message: data.message.trim(),
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to submit contact form:', error);
    return {
      success: false,
      error: 'Failed to submit your message. Please try again later.',
    };
  }
}