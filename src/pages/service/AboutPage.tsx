import ServiceHeader from "../../components/ServiceHeader";
interface AboutPageProps {
  children?: React.ReactNode;
}

const AboutPage = (props: AboutPageProps): JSX.Element => {
  return (
    <div className="relative w-full h-dvh bg-white overflow-y-auto scrollbar-hide z-10 flex flex-col">
      <ServiceHeader />
    </div>
  );
};

export default AboutPage;
