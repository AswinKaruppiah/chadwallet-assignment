export function truncateAddress(addr) {
  if (typeof addr !== 'string' || !addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function getDisplayName(str) {
  if (!str) return '';
  return str.length > 20 ? str.slice(0, 20) + '…' : str;
}
