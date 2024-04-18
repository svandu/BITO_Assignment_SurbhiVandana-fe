import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import ROUTES from "@/constant";

const RootLayout = ({ children }) => {
  const router = useRouter();

  return (
    <main className="px-5 w-full max-w-[1280px] mx-auto flex flex-col items-center">
      <div className="mt-3 text-gray-600">
        <p>Developed by Surbhi Vandana</p>
        <p>
          GitHub: <a href="">svandu</a>
        </p>
      </div>
      <div className="flex bg-gray-200 w-fit space-x-3 p-2 rounded-sm mt-5">
        <Button
          className={cn(
            "bg-transparent text-gray-800 hover:text-gray-800 hover:bg-gray-300 rounded-sm",
            router.pathname === ROUTES.ADD_SUBSCRIPTION &&
              "bg-indigo-600 hover:bg-indigo-700 text-gray-50 hover:text-gray-50"
          )}
          onClick={() => router.replace(ROUTES.ADD_SUBSCRIPTION)}
        >
          Add Subscription
        </Button>
        <Button
          className={cn(
            "bg-transparent text-gray-800 hover:text-gray-800 hover:bg-gray-300 rounded-sm",
            router.pathname === ROUTES.SUBSCRIPTION_DETAILS &&
              "bg-indigo-600 hover:bg-indigo-700 text-gray-50 hover:text-gray-50"
          )}
          onClick={() => router.replace(ROUTES.SUBSCRIPTION_DETAILS)}
        >
          Subscription Details
        </Button>
      </div>
      {children}
    </main>
  );
};

export default RootLayout;
