import data from '@/pages/api/mockData.json';

import Card from '@components/common/Card/Card';
import Modal from '@/components/common/Modal/Modal';
import Layout from '@components/layout/Layout/Layout';
import Header from '@components/layout/Header/Header';
import Accordion from '@/components/common/Accordion/Accordion';

import '@/styles/globals.css';

export default function App() {
  return (
    <Layout>
      <Header />
      <Accordion label="Workouts">
        <Card
          data={data.workouts}
          buttonLabel="Start Workout"
          onClick={() => {}}
        />
      </Accordion>
      <Accordion label="Exercises">
        <Card
          data={data.exercises}
          buttonLabel="Add Exercise"
          onClick={() => {}}
        />
      </Accordion>
      <Modal title="Test modal" trigger={<span>Modal</span>}>
        <Card
          data={data.exercises}
          buttonLabel="Add Exercise"
          onClick={() => {}}
        />
      </Modal>
    </Layout>
  );
}
