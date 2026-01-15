/**
 * Matomo Analytics Event Tracking
 * Privacy-focused, DSGVO-compliant event tracking
 */

declare global {
  interface Window {
    _paq?: any[];
  }
}

export const trackEvent = (
  category: string,
  action: string,
  name?: string,
  value?: number
) => {
  if (typeof window === 'undefined') return;
  
  try {
    const _paq = window._paq || [];
    if (name) {
      _paq.push(['trackEvent', category, action, name, value]);
    } else {
      _paq.push(['trackEvent', category, action]);
    }
  } catch (error) {
    // Silently fail if Matomo is blocked or not loaded
    console.debug('Matomo tracking failed:', error);
  }
};

export const trackGoal = (goalId: number, value?: number) => {
  if (typeof window === 'undefined') return;
  
  try {
    const _paq = window._paq || [];
    if (value !== undefined) {
      _paq.push(['trackGoal', goalId, value]);
    } else {
      _paq.push(['trackGoal', goalId]);
    }
  } catch (error) {
    console.debug('Matomo goal tracking failed:', error);
  }
};

export const trackPageView = (customUrl?: string, customTitle?: string) => {
  if (typeof window === 'undefined') return;
  
  try {
    const _paq = window._paq || [];
    if (customUrl) _paq.push(['setCustomUrl', customUrl]);
    if (customTitle) _paq.push(['setDocumentTitle', customTitle]);
    _paq.push(['trackPageView']);
  } catch (error) {
    console.debug('Matomo page view tracking failed:', error);
  }
};

// Predefined event categories
export const EventCategories = {
  NAVIGATION: 'Navigation',
  CTA: 'Call to Action',
  FORM: 'Form',
  DASHBOARD: 'Dashboard',
  CHAT: 'Chat',
  CONTACT: 'Contact',
  WAITLIST: 'Waitlist',
  ACHIEVEMENT: 'Achievement',
  SHARE: 'Share',
  DOWNLOAD: 'Download',
} as const;

// Common tracking helpers
export const MatomoEvents = {
  // Navigation
  navClick: (destination: string) => 
    trackEvent(EventCategories.NAVIGATION, 'Click', destination),
  
  // CTAs
  ctaClick: (ctaType: string, location: string) =>
    trackEvent(EventCategories.CTA, 'Click', `${ctaType} - ${location}`),
  
  // Forms
  formStart: (formName: string) =>
    trackEvent(EventCategories.FORM, 'Start', formName),
  
  formSubmit: (formName: string, success: boolean) =>
    trackEvent(EventCategories.FORM, success ? 'Submit Success' : 'Submit Error', formName),
  
  // Dashboard
  dashboardView: (viewMode: string) =>
    trackEvent(EventCategories.DASHBOARD, 'View Mode', viewMode),
  
  dashboardMetricClick: (metricId: string) =>
    trackEvent(EventCategories.DASHBOARD, 'Metric Click', metricId),
  
  // Chat
  chatMessage: (messageLength: number) =>
    trackEvent(EventCategories.CHAT, 'Message Sent', undefined, messageLength),
  
  // Achievements
  achievementUnlock: (achievementId: string) =>
    trackEvent(EventCategories.ACHIEVEMENT, 'Unlock', achievementId),
  
  // Share
  shareClick: (platform: string) =>
    trackEvent(EventCategories.SHARE, 'Click', platform),
  
  // Downloads/Lead Magnets
  downloadClick: (resource: string) =>
    trackEvent(EventCategories.DOWNLOAD, 'Click', resource),
};

