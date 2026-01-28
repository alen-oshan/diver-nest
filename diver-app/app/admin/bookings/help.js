// -------------------------------
// Helper: format date for UI
// -------------------------------
function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

// -------------------------------
// Helper: generate per-day dates
// checkIn → (checkOut - 1)
// -------------------------------
function getReservationDays(checkIn, checkOut) {
  const days = [];

  let current = new Date(checkIn);
  const lastDay = new Date(checkOut);
  lastDay.setDate(lastDay.getDate() - 1);

  while (current <= lastDay) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return days;
}

// -------------------------------
// Transform ONE booking
// Activity → single day
// Stay → multiple per-day blocks
// -------------------------------
export function transformBooking(item) {
  if (!item || !item.type) return [];

  // ---------- ACTIVITY ----------
  if (item.type === "activity") {
    return [
      {
        _id: item._id,
        bookingId: item._id,
        type: "activity",
        name: item.name,
        email: item.userEmail,
        date: new Date(item.activityDate),
        status: "confirmed",
        totalAmount: 0,
        details: `Activity Date: ${formatDate(item.activityDate)}`
      }
    ];
  }

  // ---------- STAY (ROOM) ----------
  if (item.type === "stay") {
    const days = getReservationDays(item.checkIn, item.checkOut);

    return days.map(date => ({
      _id: item._id,
      bookingId: item._id,
      type: "room",
      name: item.name,
      email: item.userEmail,
      date,
      status: "confirmed",
      totalAmount: 0,
      details: `${item.quantity} Room(s) | ${formatDate(item.checkIn)} - ${formatDate(
        new Date(item.checkOut).setDate(new Date(item.checkOut).getDate() - 1)
      )}`
    }));
  }

  return [];
}
