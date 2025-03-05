import ServiceHeader from "../../components/ServiceHeader";

interface AboutPageProps {
  children?: React.ReactNode;
}

const AboutPage = (props: AboutPageProps): JSX.Element => {
  return (
    <div className="relative w-full h-dvh bg-white overflow-hidden z-10">
      <ServiceHeader />
    </div>
  );
};

export default AboutPage;
