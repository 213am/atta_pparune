interface AdminHeaderI {
  title: string;
}

const AdminHeader = ({ title }: AdminHeaderI) => {
  return (
    <div className="abosolute top-0 left-0 flex w-full h-[75px] min-h-[75px] border-b justify-between items-center px-10 bg-white">
      <div>
        <span className="text-2xl font-semibold tracking-widest">{title}</span>
      </div>
      <div>
        <img
          src="/profile.jpeg"
          alt=""
          className="flex w-10 h-10 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
};
export default AdminHeader;
