import UserTag from "../userData/userdata";

function Header() {
  return (
    <header className="min-w-full bg-blue-500 flex sm:h-[50px] lg:h-[100px] relative items-center p-[10px] ">
      <h1 className="text-white text-[30px] ">Leonine Villa</h1>
      <UserTag
        imageLink="https://i.pinimg.com/564x/55/f4/3d/55f43de2412ad3f18fe90fac70c6472a.jpg"
        name="Sarith Samarakoon "
      />
    </header>
  );
}

export default Header;
