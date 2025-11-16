export const formatCount = (value?: number | null): string => {
  const num = typeof value === 'number' ? value : 0;

  if (num >= 1000) {
    const formatted = (num / 1000).toFixed(1);
    // Remove trailing .0 (e.g. 1.0 k -> 1 k)
    const normalized = formatted.endsWith('.0')
      ? formatted.slice(0, -2)
      : formatted;
    return `${normalized} k`;
  }

  return String(num);
};
