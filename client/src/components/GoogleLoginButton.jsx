const GoogleLoginButton = () => (
  <button className="flex h-12 px-5 flex-1 items-center justify-center gap-2 rounded-xl bg-[#0c77f2] text-white text-base font-bold">
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
      <path d="M224,128a96,96,0,1,1-21.95-61.09,8,8,0,1,1-12.33,10.18A80,80,0,1,0,207.6,136H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128Z"></path>
    </svg>
    <span className="truncate">Login with Google</span>
  </button>
);

export default GoogleLoginButton;
