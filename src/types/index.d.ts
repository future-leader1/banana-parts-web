import React from 'react';

type ReactI18NextChild = React.ReactNode | Record<string, unknown>;

declare global {
  namespace React {
    interface HTMLAttributes<T> {
      children?: ReactI18NextChild | Iterable<ReactI18NextChild>;
    }
  }
}
