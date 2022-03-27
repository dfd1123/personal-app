import useModal from '@/hooks/useModal';
import { useDispatch } from 'react-redux';
import { ToastType } from '@/store/modal/types/toast';
import { addToast, removeToast } from '@/store/modal/toast';
import { removeModal } from '@/store/modal/modal';
import { FunctionComponent, SVGProps } from 'react';

export interface ToastOption {
  type?: 'success' | 'warning';
  emoji?: string;
  duration?: number;
}

export interface ToastFunctionType {
  toast: (msg: string, options?: ToastOption) => void;
}

const useToast = () => {
  const dispatch = useDispatch();

  const toast = (
    msg: string,
    options: ToastOption | undefined = {
      type: 'warning',
      emoji: '',
      duration: 1000,
    }
  ) => {
    let { type, emoji, duration } = options;

    const toast: ToastType = {
      id: -1,
      msg,
      type: type ?? 'warning',
      emoji,
      duration: duration ?? 1000,
    };
    setTimeout(() => {
     dispatch(addToast({ toast }));
    }, 1);
  };

  const closeToast = (id: number): void => {
    dispatch(removeToast({ id }));
  };

  return { toast, closeToast };
};

export default useToast;
