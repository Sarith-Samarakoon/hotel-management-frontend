export default function AdminGalleryItems() {
  // Hardcoded gallery item data
  const galleryItems = [
    {
      name: "Sunset Over Mountains",
      image: "https://example.com/sunset-mountains.jpg",
      description: "A beautiful sunset view over the mountains.",
    },
    {
      name: "Ocean Waves",
      image: "https://example.com/ocean-waves.jpg",
      description: "Waves crashing on the beach during sunrise.",
    },
    {
      name: "City Skyline",
      image: "https://example.com/city-skyline.jpg",
      description: "A night view of a city skyline with skyscrapers.",
    },
  ];

  return (
    <div className="w-full">
      <div className="p-4">
        <h1 className="text-2xl mb-4 text-white">Gallery Items</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Image</th>
              <th className="py-2 px-4 border">Description</th>
            </tr>
          </thead>
          <tbody>
            {galleryItems.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border">{item.name}</td>
                <td className="py-2 px-4 border">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="py-2 px-4 border">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
