import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FC } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import MintNft from "./pages/MintNft";
import SaleNft from "./pages/SaleNft";
import MyNft from "./pages/MyNft";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<MintNft />} />
          <Route path="/" element={<SaleNft />} />
          <Route path="/" element={<MyNft />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
