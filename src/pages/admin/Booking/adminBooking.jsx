export default function AdminBookings() {
  // Hardcoded booking data
  const bookings = [
    {
      bookingId: 101,
      email: "john.doe@example.com",
      status: "confirmed",
      reason: "Business Trip",
      start: new Date("2024-11-01"),
      end: new Date("2024-11-05"),
      notes: "Late check-in requested.",
    },
    {
      bookingId: 102,
      email: "jane.smith@example.com",
      status: "pending",
      reason: "Vacation",
      start: new Date("2024-12-15"),
      end: new Date("2024-12-25"),
      notes: "Family suite with sea view.",
    },
    {
      bookingId: 103,
      email: "emma.jones@example.com",
      status: "cancelled",
      reason: "Honeymoon",
      start: new Date("2024-11-10"),
      end: new Date("2024-11-20"),
      notes: "Early check-in preferred.",
    },
  ];
  return (
    <div className="w-full">
      <div className="p-4">
        <h1 className="text-2xl mb-4 text-white">Bookings</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Booking ID</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Reason</th>
              <th className="py-2 px-4 border">Start Date</th>
              <th className="py-2 px-4 border">End Date</th>
              <th className="py-2 px-4 border">Notes</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => {
              return (
                <tr key={booking.bookingId}>
                  <td className="py-2 px-4 border">{booking.bookingId}</td>
                  <td className="py-2 px-4 border">{booking.email}</td>
                  <td className="py-2 px-4 border">
                    {booking.start.toDateString()}
                  </td>
                  <td className="py-2 px-4 border">
                    {booking.end.toDateString()}
                  </td>
                  <td className="py-2 px-4 border">{booking.status}</td>
                  <td className="py-2 px-4 border">{booking.reason}</td>
                  <td className="py-2 px-4 border">{booking.notes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
