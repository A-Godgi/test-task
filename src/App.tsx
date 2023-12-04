import React from 'react';

//Styles
import './assets/sass/style.sass'

//Components
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

function App() {


  return (
    <Layout>
        <HomePage/>
    </Layout>
  );
}

export default App;
