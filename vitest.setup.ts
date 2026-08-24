import '@testing-library/jest-dom/vitest';

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
  // @ts-expect-error test-only polyfill
  window.IntersectionObserver = MockIntersectionObserver;
}
