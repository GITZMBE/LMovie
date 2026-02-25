'use client';

import Header from "../components/connectors/Layout/Header";
import Footer from "../components/connectors/Layout/Footer";
import ToastContainer from "../components/connectors/Toast/ToastContainer";
import { SessionProvider } from "next-auth/react";

export const Layer = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ToastContainer />
      <Header />
      {children}
      <Footer />
    </SessionProvider>
  );
};

export default Layer;