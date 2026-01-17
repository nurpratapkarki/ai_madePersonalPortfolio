'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';


const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');
    setErrorMessage('');

    try {
      // Note: Backend contact endpoint would need to be implemented
      // For now, just simulate success
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-gray-600">
            Have a project in mind? Let&apos;s discuss how we can work together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200"
        >
          {status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Message Sent!
              </h3>
              <p className="text-gray-600 mb-6">
                Thank you for reaching out. I&apos;ll get back to you soon.
              </p>
              <Button
                variant="outline"
                onClick={() => setStatus('idle')}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Name"
                id="name"
                placeholder="Your name"
                error={errors.name?.message}
                {...register('name')}
              />

              <Input
                label="Email"
                id="email"
                type="email"
                placeholder="your.email@example.com"
                error={errors.email?.message}
                {...register('email')}
              />

              <Textarea
                label="Message"
                id="message"
                placeholder="Tell me about your project..."
                rows={5}
                error={errors.message?.message}
                {...register('message')}
              />

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errorMessage}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={status === 'loading'}
              >
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
