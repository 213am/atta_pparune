import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
  isClick: Click;
  setIsClick: (state: Click) => void;
  handleClick: (menu: number) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isClick, setIsClick] = useState<Click>({
    first: true,
    second: false,
    third: false,
    forth: false,
    fifth: false,
  });

  const handleClick = (menu: number) => {
    setIsClick(prev => ({
      first: menu === 1 ? true : prev.first,
      second: menu === 2 ? !prev.second : prev.second,
      third: menu === 3 ? !prev.third : prev.third,
      forth: menu === 4 ? true : prev.forth,
      fifth: menu === 5 ? true : prev.fifth,
    }));
  };

  return (
    <SidebarContext.Provider value={{ isClick, setIsClick, handleClick }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
