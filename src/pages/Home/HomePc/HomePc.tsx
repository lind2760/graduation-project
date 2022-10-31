import React, { useEffect } from "react";
import axios from "axios";
import HeaderPc from "@/components/Header/pc/HeaderPc";

function HomePc() {
  useEffect(() => {
    axios.get("http://localhost:3001/echo?test=6666").then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <>
      <HeaderPc />
      213
    </>
  );
}

export default HomePc;
