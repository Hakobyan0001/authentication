import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';

export default function Home() {
  const { user } = useSelector((state: RootState) => state.login);
  return (
    user && (
      <div style={{ margin: '200px' }}>
        name: {user.full_name},<br></br> email: {user.email}
      </div>
    )
  );
}
