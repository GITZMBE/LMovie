'use client';

import Header from "../components/connectors/Layout/Header";
import Footer from "../components/connectors/Layout/Footer";
import ToastContainer from "../components/connectors/Toast/ToastContainer";

export const Layer = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastContainer />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layer;