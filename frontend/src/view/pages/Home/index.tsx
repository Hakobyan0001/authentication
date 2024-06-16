import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';

export default function Home() {
  const { user } = useSelector((state: RootState) => state.login);
  console.log(user);
  return (
    user && (
      <div>
        {user.full_name} {user.email}
      </div>
    )
  );
}
