const Footer = () => {
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          Mernholidays.com
        </span>
        <div className="flex items-center gap-4 text-white font-bold">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of service</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
