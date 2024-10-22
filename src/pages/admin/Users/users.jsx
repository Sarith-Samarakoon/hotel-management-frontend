export default function AdminUsers() {
  // Hardcoded user data
  const users = [
    {
      email: "john.doe@example.com",
      password: "hashedpassword123", // Not displayed in the table for security reasons
      firstName: "John",
      lastName: "Doe",
      type: "admin",
      whatsApp: "+1234567890",
      phone: "+0987654321",
      disabled: false,
      emailVerified: true,
    },
    {
      email: "jane.smith@example.com",
      password: "hashedpassword456", // Not displayed in the table for security reasons
      firstName: "Jane",
      lastName: "Smith",
      type: "customer",
      whatsApp: "+1111111111",
      phone: "+2222222222",
      disabled: false,
      emailVerified: false,
    },
    {
      email: "mark.jones@example.com",
      password: "hashedpassword789", // Not displayed in the table for security reasons
      firstName: "Mark",
      lastName: "Jones",
      type: "customer",
      whatsApp: "+3333333333",
      phone: "+4444444444",
      disabled: true,
      emailVerified: true,
    },
  ];

  return (
    <div className="w-full">
      <div className="p-4">
        <h1 className="text-2xl mb-4 text-white">Users</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">First Name</th>
              <th className="py-2 px-4 border">Last Name</th>
              <th className="py-2 px-4 border">Type</th>
              <th className="py-2 px-4 border">WhatsApp</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Disabled</th>
              <th className="py-2 px-4 border">Email Verified</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border">{user.firstName}</td>
                <td className="py-2 px-4 border">{user.lastName}</td>
                <td className="py-2 px-4 border">{user.type}</td>
                <td className="py-2 px-4 border">{user.whatsApp}</td>
                <td className="py-2 px-4 border">{user.phone}</td>
                <td className="py-2 px-4 border">
                  {user.disabled ? "Yes" : "No"}
                </td>
                <td className="py-2 px-4 border">
                  {user.emailVerified ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
