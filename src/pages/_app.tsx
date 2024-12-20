import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";
import Layout from "~/components/layout/Layout";
import { api } from "~/utils/api";
import { UserProfileProvider } from "~/utils/UserProfileContext";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <UserProfileProvider>
      <div className={GeistSans.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    </UserProfileProvider>
  );
};

export default api.withTRPC(MyApp);
