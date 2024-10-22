export default function AdminFeedback() {
  // Hardcoded feedback data
  const feedbacks = [
    {
      feedbackId: 1,
      email: "john.doe@example.com",
      message: "Great service, really enjoyed my stay!",
      rating: 5,
      date: "2024-10-01",
      status: "Addressed",
    },
    {
      feedbackId: 2,
      email: "jane.smith@example.com",
      message: "The room was clean but the Wi-Fi was slow.",
      rating: 3,
      date: "2024-10-03",
      status: "Pending",
    },
    {
      feedbackId: 3,
      email: "mark.jones@example.com",
      message: "Had an issue with the booking, but it was resolved quickly.",
      rating: 4,
      date: "2024-10-05",
      status: "Addressed",
    },
  ];

  return (
    <div className="w-full">
      <div className="p-4">
        <h1 className="text-2xl mb-4 text-white">Feedback</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Feedback ID</th>
              <th className="py-2 px-4 border">User Email</th>
              <th className="py-2 px-4 border">Message</th>
              <th className="py-2 px-4 border">Rating</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.feedbackId}>
                <td className="py-2 px-4 border">{feedback.feedbackId}</td>
                <td className="py-2 px-4 border">{feedback.email}</td>
                <td className="py-2 px-4 border">{feedback.message}</td>
                <td className="py-2 px-4 border">{feedback.rating}/5</td>
                <td className="py-2 px-4 border">
                  {new Date(feedback.date).toDateString()}
                </td>
                <td className="py-2 px-4 border">{feedback.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
