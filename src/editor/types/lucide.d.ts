declare global {
  interface Window {
    lucide: {
      createIcons: (options?: Record<string, any>) => void;
    };
  }
}
