import { newRidgeState } from 'react-ridge-state';
import { ModalInfoProps } from 'src/components/Modal/Modal';

export const tokenState = newRidgeState<string | null>(null, {
  onSet: async (newState) => {
    if (newState) {
      localStorage.setItem('token', newState);
    } else {
      localStorage.removeItem('token');
    }
  },
});

export const adminTokenState = newRidgeState<string | null>(null, {
  onSet: async (newState) => {
    if (newState) {
      localStorage.setItem('adminToken', newState);
    } else {
      localStorage.removeItem('adminToken');
    }
  },
});

export const osState = newRidgeState<string>('');
export const resetQueryClientState = newRidgeState<boolean>(false);

function setInitialState() {
  if (typeof window === 'undefined') {
    return;
  }
  const token = localStorage.getItem('token');
  const adminToken = localStorage.getItem('adminToken');
  tokenState.set(token);
  adminTokenState.set(adminToken);
}

export const modalState = newRidgeState<ModalInfoProps>({
  title: '',
  bodyText: '',
  primaryClick: () => {},
  primaryButtonText: '',
  primaryButtonClassName: '',
  secondaryClick: () => {},
  secondaryButtonText: '',
  secondaryButtonClassName: '',
});

setInitialState();
