
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Footer, HeroSection,Header,Card } from '../components/index';

const Home: NextPage = () => {
  return (
    <div className ="bg-[#1A1A1A]">
      Hey
     <Header />
     
     <HeroSection />
     {/*
     <Card />
     <Footer />
     */}
  </div>
  );
};

export default Home;
