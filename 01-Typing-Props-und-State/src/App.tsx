import './App.css';
import Button from './components/Button';
import UserList from './components/UserList';
import UserProfile from './components/UserProfile';
import { user } from './data';

function App() {
  return (
    <>
      <UserProfile username={user.username} img={user.img} info={user.info} status='inactive' />
      <Button
        username='Anakin'
        onClick={() => console.log('hallo Marco')}
        type='button'
        style={{
          backgroundColor: 'rebeccapurple',
        }}
      >
        <span>Send</span>
      </Button>

      <UserList />
    </>
  );
}

export default App;
