import { TwinSpin } from 'react-cssfx-loading';
import Transition from './Transition';

const Loading = () => {
  return (
    <Transition className="Loading">
      <TwinSpin
        height="100px"
        width="100px"
        color="#00FFFF"
      />
    </Transition>
  );
}

export default Loading;