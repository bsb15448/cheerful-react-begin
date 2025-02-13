
import { NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "../ui/navigation-menu";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";

interface CategoryLinkProps {
  href: string;
  topText: string;
  bottomText: string;
  subItems?: Array<{
    title: string;
    description: string;
    image: string;
    path: string;
  }>;
}

const CategoryLink = ({ href, topText, bottomText, subItems }: CategoryLinkProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger 
        className={cn(
          "h-auto py-2",
          location.pathname === href && "border-2 border-primary rounded-md bg-transparent text-primary"
        )} 
        onClick={() => navigate(href)}
      >
        <div className="flex flex-col text-left min-w-max px-3 rounded-md transition-all">
          <span className="text-sm font-medium text-gray-800 whitespace-nowrap">
            {topText}
          </span>
          <span className="text-xs text-gray-600 whitespace-nowrap">
            {bottomText}
          </span>
        </div>
      </NavigationMenuTrigger>
      {subItems && (
        <NavigationMenuContent>
          <div className="grid grid-cols-3 gap-4 p-6 w-[600px] bg-white rounded-lg shadow-lg">
            {subItems.map((item) => (
              <NavigationMenuLink
                key={item.path}
                asChild
              >
                <Link
                  to={item.path}
                  className="block p-4 space-y-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 mb-2">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </Link>
              </NavigationMenuLink>
            ))}
          </div>
        </NavigationMenuContent>
      )}
    </NavigationMenuItem>
  );
};

export default CategoryLink;
