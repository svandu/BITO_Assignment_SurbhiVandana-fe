import RootLayout from "@/components/RootLayout";
import QueryProvider from "@/lib/reactQuery/QueryProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <RootLayout>
      <QueryProvider>
        <Component {...pageProps} />
      </QueryProvider>
    </RootLayout>
  );
}
