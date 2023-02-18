import { motion, AnimatePresence } from 'framer-motion';
const ProgressBar = ({ progress }) => {
  // const colors = [
  //   "rgb(255, 214, 161)",
  //   "rgb(255,175,163)",
  //   "rgb(108, 115, 148)",
  //   "rgb(141, 181, 145)",
  // ];

  // const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const setProgressColor = (progress) => {
    if (progress <= 49) {
      return 'rgb(255, 214, 161)';
    }
    if (progress >= 50 && progress < 80) {
      return 'rgb(255,175,163)';
    } else {
      return 'rgb(141, 181, 145)';
    }
  };

  return (
    <div className='outer-bar'>
      <AnimatePresence initial={false}>
        <motion.div
          className='inner-bar'
          style={{
            width: `${progress}%`,
            backgroundColor: setProgressColor(progress),
          }}
          initial={{ width: 0 }}
          animate={{
            width: `${progress}%`,
          }}
          transition={{ duration: 2 }}
        >
          <span>{`${progress} %`}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProgressBar;
