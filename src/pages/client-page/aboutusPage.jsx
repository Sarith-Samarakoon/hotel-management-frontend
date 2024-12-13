import Header from "../../components/header/Header";
import Footer from "../../components/footer/footer";

function AboutUs() {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col bg-gradient-to-r from-indigo-100 via-blue-200 to-purple-200">
        <Header />
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <section
            className="relative bg-cover bg-center bg-no-repeat h-[500px] rounded-lg overflow-hidden shadow-lg mb-12"
            style={{
              backgroundImage: `url('https://xsdzkvctceyxhipwoaht.supabase.co/storage/v1/object/public/Images/about2.webp')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center">
                About Golden Horizon Hotel
              </h1>
            </div>
          </section>

          {/* Introduction Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
              Welcome to Your Luxurious Escape
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              Golden Horizon Hotel is a haven of tranquility, combining modern
              luxury with nature's beauty. Nestled in a serene location, we
              provide our guests with a unique blend of comfort, elegance, and
              unparalleled hospitality. Whether you're looking for a romantic
              getaway, a family retreat, or a peaceful escape, Golden Horizon
              Hotel is the perfect destination.
            </p>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-12 bg-gray-100 rounded-lg shadow-md mb-12">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
              Why Choose Golden Horizon Hotel?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="flex flex-col items-center">
                <img
                  src="https://xsdzkvctceyxhipwoaht.supabase.co/storage/v1/object/public/Images/luxury.webp?t=2024-11-27T14%3A10%3A10.690Z"
                  alt="Luxury Rooms"
                  className="rounded-lg w-full h-48 object-cover mb-4 shadow-md"
                />
                <h3 className="text-lg font-semibold text-blue-600">
                  Luxury Rooms
                </h3>
                <p className="text-gray-600 text-center mt-2">
                  Experience unparalleled luxury with elegantly designed rooms
                  featuring modern amenities and breathtaking views.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center">
                <img
                  src="https://xsdzkvctceyxhipwoaht.supabase.co/storage/v1/object/public/Images/dining.webp?t=2024-11-27T14%3A06%3A56.711Z"
                  alt="Fine Dining"
                  className="rounded-lg w-full h-48 object-cover mb-4 shadow-md"
                />
                <h3 className="text-lg font-semibold text-blue-600">
                  Fine Dining
                </h3>
                <p className="text-gray-600 text-center mt-2">
                  Savor exquisite cuisine prepared by world-class chefs using
                  the freshest local ingredients.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center">
                <img
                  src="https://xsdzkvctceyxhipwoaht.supabase.co/storage/v1/object/public/Images/Spa.webp?t=2024-11-27T14%3A05%3A12.165Z"
                  alt="Spa & Wellness"
                  className="rounded-lg w-full h-48 object-cover mb-4 shadow-md"
                />
                <h3 className="text-lg font-semibold text-blue-600">
                  Spa & Wellness
                </h3>
                <p className="text-gray-600 text-center mt-2">
                  Relax and rejuvenate with our world-class spa treatments, yoga
                  sessions, and wellness programs.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col items-center">
                <img
                  src="https://xsdzkvctceyxhipwoaht.supabase.co/storage/v1/object/public/Images/Outdoor.webp?t=2024-11-27T14%3A08%3A38.376Z"
                  alt="Outdoor Activities"
                  className="rounded-lg w-full h-48 object-cover mb-4 shadow-md"
                />
                <h3 className="text-lg font-semibold text-blue-600">
                  Outdoor Activities
                </h3>
                <p className="text-gray-600 text-center mt-2">
                  Enjoy a variety of activities including hiking, biking, and
                  water sports, all surrounded by natural beauty.
                </p>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">
              Explore Our Hotel
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <img
                src="https://i.pinimg.com/736x/ab/f7/57/abf7570c4d918fc8a5fbda63c9fe291f.jpg"
                alt="Room"
                className="rounded-lg w-full h-64 object-cover shadow-md"
              />
              <img
                src="https://i.pinimg.com/736x/ae/59/db/ae59db3be049d043db3a32f8e7f93de1.jpg"
                alt="Pool"
                className="rounded-lg w-full h-64 object-cover shadow-md"
              />
              <img
                src="https://i.pinimg.com/736x/a0/6a/23/a06a2390fd44f663edc132bd99d936b9.jpg"
                alt="Dining Area"
                className="rounded-lg w-full h-64 object-cover shadow-md"
              />
            </div>
          </section>

          {/* Vision and Mission Section */}
          <section className="py-12 bg-blue-600 text-white rounded-lg shadow-md text-center">
            <h2 className="text-3xl font-bold mb-6">Our Vision & Mission</h2>
            <p className="text-lg leading-relaxed mb-4">
              At Golden Horizon Hotel, our vision is to create a world-class
              hospitality experience that fosters relaxation, inspiration, and
              unforgettable memories.
            </p>
            <p className="text-lg leading-relaxed">
              Our mission is to provide exceptional service, luxurious
              accommodations, and unique experiences that exceed our guests'
              expectations.
            </p>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default AboutUs;
