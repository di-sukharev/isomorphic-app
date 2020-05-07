import React, { useState } from "react";
import { Layout } from "antd";
import Search from "./components/Search";
import Info from "./components/Info";
import Map from "./components/Map";


const { Header, Footer, Content } = Layout;


const App = () => {
  return (
    <Layout>
      <Header>
        <Search
        />
      </Header>
      <Content>
        <Info />
      </Content>
      <Footer>
        <Map />
      </Footer>
    </Layout>
  );
};

export default App;
