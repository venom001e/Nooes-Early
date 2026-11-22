export type WaitlistStatus = 'pending' | 'confirmed';

export type WaitlistRecord = {
  id: string;
  email: string;
  name: string | null;
  useCase: string | null;
  status: WaitlistStatus;
  tokenHash: string;
  tokenExpiresAt: string;
  createdAt: string;
  confirmedAt: string | null;
};

export type WaitlistInput = {
  email: string;
  name: string | null;
  useCase: string | null;
};

export type WaitlistFieldErrors = {
  email?: string;
  name?: string;
  useCase?: string;
  consent?: string;
};

export type WaitlistState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  email?: string;
  fieldErrors?: WaitlistFieldErrors;
  devConfirmUrl?: string;
};

export type NewWaitlistRecord = Omit<WaitlistRecord, 'id' | 'createdAt'> & {
  id: string;
  createdAt: string;
};
