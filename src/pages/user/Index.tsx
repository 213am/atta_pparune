import UserMainPage from "./UserMainPage";

interface IndexProps {
  children?: React.ReactNode;
}

const Index = (props: IndexProps): JSX.Element => {
  return (
    <div className="outline-1">
      <UserMainPage />
    </div>
  );
};

export default Index;
