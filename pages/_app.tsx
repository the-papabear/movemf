import { useEffect, useState } from "react";

import data from "@/pages/api/mockData.json";
import Card from "@/components/layout/Card/Card";
import Layout from "@components/layout/Layout/Layout";
import Header from "@components/layout/Header/Header";

import "@/styles/globals.css";
import Accordion from "@/components/common/Accordion/Accordion";

export default function App() {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  return (
    <Layout>
      <Header />
      {innerWidth < 1024 ? (
        <Accordion label="Workouts">
          <Card
            data={data.workouts}
            buttonLabel="Start Workout"
            onClick={() => {}}
          />
        </Accordion>
      ) : (
        <Card
          data={data.workouts}
          buttonLabel="Start Workout"
          onClick={() => {}}
        />
      )}
      {innerWidth < 1024 ? (
        <Accordion label="Exercises">
          <Card
            data={data.exercises}
            buttonLabel="Add Exercise"
            onClick={() => {}}
          />
        </Accordion>
      ) : (
        <Card
          data={data.exercises}
          buttonLabel="Add Exercise"
          onClick={() => {}}
        />
      )}
    </Layout>
  );
}
