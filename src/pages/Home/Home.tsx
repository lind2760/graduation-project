import React from "react";
import Media from "react-media";
import HomePc from "@/pages/Home/HomePc/HomePc";

function Home() {
  return (
    <Media
      queries={{
        small: "(max-width: 992px)",
        large: "(min-width: 993px)",
      }}
    >
      {(matches) => (
        <>
          {matches.small && <span>mobile首页</span>}
          {matches.large && <HomePc />}
        </>
      )}
    </Media>
  );
}

export default Home;
