'use client'

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in development or when performance monitoring is enabled
    if (process.env.NODE_ENV !== 'development' && !process.env.NEXT_PUBLIC_PERFORMANCE_MONITOR) {
      return;
    }

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        const { name, startTime, value } = entry;
        
        // Log performance metrics
        console.group(`🔍 Performance Metric: ${name}`);
        console.log(`Value: ${Math.round(value)}ms`);
        console.log(`Start Time: ${Math.round(startTime)}ms`);
        console.groupEnd();

        // You can send these metrics to your analytics service
        // analytics.track('web-vital', { name, value, startTime });
      });
    });

    // Observe Core Web Vitals
    try {
      observer.observe({ entryTypes: ['paint', 'layout-shift', 'largest-contentful-paint'] });
    } catch (e) {
      console.warn('Performance Observer not supported');
    }

    // Monitor resource loading times
    const resourceObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.name.includes('.css')) {
          console.log(`🎨 CSS Load Time: ${entry.name} - ${Math.round(entry.duration)}ms`);
        }
        if (entry.name.includes('font')) {
          console.log(`🔤 Font Load Time: ${entry.name} - ${Math.round(entry.duration)}ms`);
        }
      });
    });

    try {
      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (e) {
      console.warn('Resource Performance Observer not supported');
    }

    // Monitor First Contentful Paint
    const paintObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          console.log(`🎨 First Contentful Paint: ${Math.round(entry.startTime)}ms`);
        }
        if (entry.name === 'largest-contentful-paint') {
          console.log(`🖼️ Largest Contentful Paint: ${Math.round(entry.startTime)}ms`);
        }
      });
    });

    try {
      paintObserver.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
    } catch (e) {
      console.warn('Paint Performance Observer not supported');
    }

    return () => {
      observer?.disconnect();
      resourceObserver?.disconnect();
      paintObserver?.disconnect();
    };
  }, []);

  // This component doesn't render anything
  return null;
}