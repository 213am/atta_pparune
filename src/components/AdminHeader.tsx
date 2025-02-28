interface AdminHeaderI {
  title: string;
}

const AdminHeader = ({ title }: AdminHeaderI) => {
  return (
    <div className="abosolute top-0 left-0 flex w-full h-[8%] border-b justify-between items-center px-10 mb-4">
      <div>
        <span className="text-lg">{title}</span>
      </div>
      <div>
        <img
          src="/profile.jpeg"
          alt=""
          className="flex w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
};
export default AdminHeader;
