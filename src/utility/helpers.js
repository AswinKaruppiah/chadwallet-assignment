export function truncateAddress(addr) {
  if (typeof addr !== 'string' || !addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}
