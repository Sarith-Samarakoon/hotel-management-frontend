export default function AdminCategories() {
  // Hardcoded category data
  const categories = [
    {
      name: "Luxury Room",
      price: 250,
      features: ["Sea view", "Private pool", "Free breakfast"],
      description: "A luxurious room with premium amenities and services.",
      image:
        "https://i.pinimg.com/control/564x/e8/f5/f2/e8f5f2ffe359e84437d3002b8a778ccf.jpg",
    },
    {
      name: "Standard Room",
      price: 100,
      features: ["City view", "Wi-Fi included"],
      description: "A standard room with essential facilities for comfort.",
      image:
        "https://i.pinimg.com/control/564x/12/db/c5/12dbc5b6af5e5d0cf417458dd7d143dd.jpg",
    },
    {
      name: "Family Suite",
      price: 300,
      features: ["Kid-friendly", "Extra beds", "Play area"],
      description: "A spacious suite designed for families with children.",
      image:
        "https://i.pinimg.com/564x/24/58/a0/2458a0cbf5c8f841a6a368caaaa1d8f0.jpg",
    },
  ];

  return (
    <div className="w-full">
      <div className="p-4">
        <h1 className="text-2xl mb-4 text-white">Categories</h1>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Category Name</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Features</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Image</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => {
              return (
                <tr key={index}>
                  <td className="py-2 px-4 border">{category.name}</td>
                  <td className="py-2 px-4 border">${category.price}</td>
                  <td className="py-2 px-4 border">
                    {category.features.join(", ")}
                  </td>
                  <td className="py-2 px-4 border">{category.description}</td>
                  <td className="py-2 px-4 border">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
