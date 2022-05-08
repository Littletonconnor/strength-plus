import { motion } from 'framer-motion';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import { Start } from 'components/Svg';
import Spacer from 'components/Spacer';

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ onClose, children }: Props) {
  return (
    <motion.div
      className="overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.8, ease: [0.36, 0.66, 0.04, 1] },
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
      }}
    >
      <DialogOverlay allowPinchZoom className="overflow-hidden pt-8" isOpen={true}>
        <motion.div
          className="flex h-full w-full overflow-hidden overflow-hidden rounded-t-lg bg-white shadow-xl"
          initial={{ y: '100%' }}
          animate={{
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
          }}
          exit={{
            y: '100%',
            transition: { duration: 0.5, ease: 'easeIn' },
          }}
        >
          <DialogContent className="w-full p-3" aria-label="A dialog modal">
            <div className="flex w-full justify-between">
              <button
                className="justify-center rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-white"
                onClick={() => onClose()}
              >
                <Start className="h-5 w-5 text-gray-700" />
              </button>
              <button
                className="justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white"
                onClick={() => onClose()}
              >
                Finish
              </button>
            </div>
            <Spacer size={32} />
            {children}
          </DialogContent>
        </motion.div>
      </DialogOverlay>
    </motion.div>
  );
}

export default Modal;
