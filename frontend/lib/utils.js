// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Format date
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

// Truncate wallet address
export const truncateAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Calculate progress percentage
export const calculateProgress = (completed, total) => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

// Get difficulty color
export const getDifficultyColor = (difficulty) => {
  const colors = {
    beginner: 'text-neon-green',
    intermediate: 'text-neon-blue',
    advanced: 'text-neon-pink',
  };
  return colors[difficulty] || 'text-gray-400';
};

// Format time duration
export const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

// XP to level
export const calculateLevel = (xp) => {
  return Math.floor(xp / 100) + 1;
};

// XP needed for next level
export const xpForNextLevel = (xp) => {
  const currentLevel = calculateLevel(xp);
  const xpNeeded = currentLevel * 100;
  return Math.max(0, xpNeeded - xp);
};