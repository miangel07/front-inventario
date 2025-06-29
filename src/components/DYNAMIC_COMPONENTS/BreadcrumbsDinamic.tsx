
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  data: { nombre: string; link: string }[];
  size?: "sm" | "md" | "lg";
}



const BreadcrumbsHeroIU = ({ data, size = "md" }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {

    const currentPath = location.pathname;
    const activeItem = data.find(item => item.link === currentPath);
    if (activeItem) {
      setActiveTab(activeItem.nombre);
    } else {
    
      data.length > 0 && setActiveTab(data[0].nombre);
    }
  }, [location, data]);

  const handleTabClick = (tab: string, link: string) => {
    setActiveTab(tab);
    navigate(link);
  };


  const sizeClasses = {
    sm: "text-xs py-2 px-3",
    md: "text-sm py-2.5 px-4",
    lg: "text-base py-3 px-5"
  };

  const tabStyle = sizeClasses[size];

  
  return (
    <div className="w-full bg-gray-50 rounded-lg shadow-sm ">
      <div className="flex overflow-x-auto no-scrollbar">
        <nav className="flex items-center w-full" aria-label="Navegación">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="mx-1 text-gray-800" size={16} />
              )}
              <button
                onClick={() => handleTabClick(item.nombre, item.link)}
                className={`${tabStyle} font-roboto rounded-md transition-all duration-200 ease-in-out whitespace-nowrap flex items-center
                  ${
                    activeTab === item.nombre
                      ? "bg-white text-principal border border-gray-200 shadow-sm"
                      : "text-gray-600 hover:bg-gray-100 hover:text-cuarto"
                  }
                `}
                aria-current={activeTab === item.nombre ? "page" : undefined}
              >
                {item.nombre}
              </button>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );


};

export default BreadcrumbsHeroIU;
