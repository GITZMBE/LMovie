'use client';

import Header from "../components/connectors/Layout/Header";
import Footer from "../components/connectors/Layout/Footer";

export const Layer = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layer;