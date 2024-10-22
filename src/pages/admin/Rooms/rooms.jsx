export default function AdminRooms() {
  // Hardcoded room data
  const rooms = [
    {
      roomId: 101,
      category: "Luxury Suite",
      maxGuests: 4,
      available: true,
      photos: [
        "https://i.pinimg.com/564x/e5/e6/c5/e5e6c53d74f74f3cc745e7d09f76cc01.jpg",
        "https://i.pinimg.com/control/564x/bb/5b/c1/bb5bc13f084d668ad95f432efba0d97d.jpg",
      ],
      specialDescription: "A luxury suite with a sea view and private pool.",
      notes: "Room includes free minibar and butler service.",
    },
    {
      roomId: 102,
      category: "Standard Room",
      maxGuests: 2,
      available: false,
      photos: [
        "https://i.pinimg.com/564x/cc/4c/4a/cc4c4a9b8519b729f9ecd568fd9465f2.jpg",
      ],
      specialDescription: "A standard room with a city view.",
      notes: "Currently under maintenance.",
    },
    {
      roomId: 103,
      category: "Family Room",
      maxGuests: 6,
      available: true,
      photos: [
        "https://i.pinimg.com/564x/54/1c/bd/541cbdd4904e1cf57147d7ddca5e10c6.jpg",
      ],
      specialDescription: "A spacious family room with extra beds.",
      notes: "Perfect for families with children.",
    },
  ];

  return (
    <div className="w-full">
      <div className="p-4">
        <h1 className="text-2xl mb-4 text-white">Rooms</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Room ID</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Max Guests</th>
              <th className="py-2 px-4 border">Available</th>
              <th className="py-2 px-4 border">Photos</th>
              <th className="py-2 px-4 border">Special Description</th>
              <th className="py-2 px-4 border">Notes</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border">{room.roomId}</td>
                <td className="py-2 px-4 border">{room.category}</td>
                <td className="py-2 px-4 border">{room.maxGuests}</td>
                <td className="py-2 px-4 border">
                  {room.available ? "Yes" : "No"}
                </td>
                <td className="py-2 px-4 border">
                  {room.photos.map((photo, i) => (
                    <img
                      key={i}
                      src={photo}
                      alt={`Room ${room.roomId}`}
                      className="w-16 h-16 object-cover inline-block mr-0 mt-2"
                    />
                  ))}
                </td>
                <td className="py-2 px-4 border">{room.specialDescription}</td>
                <td className="py-2 px-4 border">{room.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
