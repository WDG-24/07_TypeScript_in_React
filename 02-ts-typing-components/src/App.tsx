import Container from './layouts/Container';
import Greeting from './components/Greeting';
import Counter from './components/Counter';
import Status from './components/Status';
import ProfileCard from './components/ProfileCard';
import Alert from './components/Alert';
import ProductList from './components/ProductList';
import Toggle from './components/Toggle';
import Avatar from './components/Avatar';
import { useState } from 'react';

const App = () => {
  const [isOn, setIsOn] = useState(false);

  function add() {
    console.log('Macht irgendwas');
  }

  return (
    <Container style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Greeting name='Ada' />
      <Greeting name='' />
      <Counter initialCount={0} />
      <Status status='loading' />
      <ProfileCard user={{ name: 'Ada', age: 36 }} />
      <Alert message={'Everything broke'} type='info' />
      <ProductList
        products={[
          { id: 1, title: 'Book' },
          { id: 2, title: 'Pen' },
        ]}
      />
      <Toggle isOn={isOn} onToggle={() => setIsOn((o) => !o)} setIsOn={setIsOn} add={add} />
      <Avatar url={'1234'} altText={'false'} />
    </Container>
  );
};

export default App;
