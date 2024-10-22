import Header from "../../components/header/Header";
export default function HomePage() {
  return (
    <>
      <Header />
      <div className="w-full h-screen bg-blue-900 flex flex-col items-center">
        <div className="w-[700px] h-[100px] border border-white bg-white rounded-lg flex justify-center items-center">
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
        <h1 className="text-white text-[50px]">Welcome to the Leonine Villa</h1>
      </div>
    </>
  );
}
