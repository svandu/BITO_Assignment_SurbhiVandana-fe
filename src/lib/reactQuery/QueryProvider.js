import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

export const queryClient = new QueryClient();

const QueryProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "#0DC384",
              color: "#fff",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default QueryProvider;
