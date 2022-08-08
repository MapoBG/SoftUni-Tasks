import { useEffect } from 'react';

import { motion } from 'framer-motion';

import { useCustomNavigate } from '../../custom-hooks/navigateHooks';
import Transition from '../utils/Transition';


const duration = 5;
export const NotFound = () => {
  const navigateTo = useCustomNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigateTo('/');
    }, duration * 1000);

    return () => clearTimeout(timeout);
  }, [navigateTo]);

  return (
    <Transition className="NotFound" direction="up" distance={100}>
      <h1>404</h1>
      <p>Page not found.</p>
      <div className="Redirect">
        Redirecting to homepage...
        <motion.div
          className="ProgressBar"
          initial={{ width: 0 }}
          animate={{ width: '100%', transition: { duration } }}
        />
      </div>
    </Transition>
  );
};