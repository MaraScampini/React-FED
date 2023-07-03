import jwtDecode from "jwt-decode";
import React from "react";

export const Home = () => {
  let token = sessionStorage.getItem("token");
  let decoded;
  if(token){
     decoded = jwtDecode(token)

  }

  console.log(decoded)
  return <>{token ? <div>{decoded?.name}</div> : <div>HOME</div>}</>;
};
