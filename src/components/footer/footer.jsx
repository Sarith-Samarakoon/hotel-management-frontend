function footer() {
  return (
    <div>
      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        {/* Address Section */}
        <div className="container mx-auto flex flex-wrap justify-between items-start">
          <div className="w-full sm:w-1/3 mb-4">
            <h4 className="font-bold mb-2">Address</h4>
            <p>Hotel in Jaipur</p>
            <p>+91 123456789</p>
            <p>hotel@goldenhorizonhotel.com</p>
          </div>
          <div className="w-full sm:w-1/3 mb-4">
            <h4 className="font-bold mb-2">My Account</h4>
            <ul>
              <li>Order History</li>
              <li>My Wishlist</li>
              <li>Newsletter</li>
            </ul>
          </div>
          <div className="w-full sm:w-1/3 mb-4">
            <h4 className="font-bold mb-2">Newsletter</h4>
            <p>Subscribe to receive updates.</p>
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded-md w-full mt-2"
            />
            <button className="bg-red-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-red-700">
              Subscribe
            </button>
          </div>
        </div>
      </footer>

      <footer className="bg-gray-900 text-gray-300 py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <aside className="flex items-center gap-3">
            {/* Logo Image */}
            <img
              src="https://xsdzkvctceyxhipwoaht.supabase.co/storage/v1/object/public/Images/Golden%20Horizon%20Villa%20Logo.webp?t=2024-11-27T09%3A38%3A05.191Z"
              alt="Golden Horizon Hotel Logo"
              className="w-20 h-20 object-cover rounded-full"
            />
            <p>
              <span className="text-lg font-semibold text-white">
                Golden Horizon Hotel
              </span>
              <br />
              <span className="text-sm text-gray-400">
                Providing luxury service since 2010.
              </span>
            </p>
          </aside>

          {/* Copyright Text */}
          <div className="text-center text-sm">
            <p>&copy; {new Date().getFullYear()} - All rights reserved.</p>
          </div>

          {/* Social Media Links */}
          <nav className="flex items-center gap-5">
            <a
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-red-500 transition-all duration-300"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current text-gray-300 hover:text-white"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-blue-500 transition-all duration-300"
              aria-label="YouTube"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current text-gray-300 hover:text-white"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-gray-800 hover:bg-blue-700 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current text-gray-300 hover:text-white"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default footer;
