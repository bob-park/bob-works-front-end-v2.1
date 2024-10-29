import { useContext } from 'react';

import { ToastContext } from '@/components/toast/ToastProvider';

export default function useToast() {
  const { push } = useContext(ToastContext);

  return { push };
}
