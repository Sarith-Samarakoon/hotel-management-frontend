import Header from "../../components/header/Header";
export default function HomePage() {
  return (
    <>
      <Header />
      <div className="w-full h-screen bg-blue-900 flex flex-col items-center">
        <h1 className="text-white text-[50px] w-full text-center hidden lg:block">
          Welcome to the Leonine Villa
        </h1>
        <h1 className="text-white text-[50px] w-full text-center lg:hidden">
          Welcome to the Sri Lanka
        </h1>
        <div className="px-[10px] py-[20px] mt-[20px]  border border-white bg-white rounded-lg flex justify-center items-center">
          <input type="date" />

          <input type="date" />

          <select>
            <option value="1">Luxury</option>
            <option value="2">Double Room</option>
            <option value="3">Triple Room</option>
            <option value="4">Normal</option>
          </select>
          <button>Book Now</button>
        </div>
      </div>
    </>
  );
}
