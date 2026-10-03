import { useState, useEffect } from 'react';
import { db, type AppState } from './db';

export function useStore(): AppState {
  const [state, setState] = useState<AppState>(db.getState());

  useEffect(() => {
    const unsubscribe = db.subscribe(() => {
      setState(db.getState());
    });
    return unsubscribe;
  }, []);

  return state;
}
