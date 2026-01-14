export const updateQuantity = (cartItems, id, change) => {
  return cartItems.map(item =>
    item.id === id
      ? { ...item, quantity: Math.max(1, item.quantity + change) }
      : item
  );
};

export const removeItem = (cartItems, id) => {
  return cartItems.filter(item => item.id !== id);
};

export const updateDate = (cartItems, id, field, value) => {
  return cartItems.map(item =>
    item.id === id ? { ...item, [field]: value } : item
  );
};

export const calculateTotals = (cartItems) => {
  const stayItems = cartItems.filter(item => item.type === 'stay');
  const activityItems = cartItems.filter(item => item.type === 'activity');
  
  const stayTotal = stayItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const activityTotal = activityItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  return {
    stayItems,
    activityItems,
    stayTotal,
    activityTotal,
    grandTotal: stayTotal + activityTotal
  };
};