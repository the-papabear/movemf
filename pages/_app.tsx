import data from "@/pages/api/mockData.json";
import Card from "@/components/layout/Card/Card";
import Layout from "@components/layout/Layout/Layout";
import Header from "@components/layout/Header/Header";

import "@/styles/globals.css";

export default function App() {
  return (
    <Layout>
      <Header />
      <Card
        data={data.workouts}
        buttonLabel="Start Workout"
        onClick={() => console.log("workout btn clicked")}
      />
      <Card
        data={data.exercises}
        buttonLabel="Add Exercise"
        onClick={() => console.log("exercises btn clicked")}
      />
    </Layout>
  );
}
