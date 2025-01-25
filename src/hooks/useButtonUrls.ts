import { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { ButtonUrls } from '../types/admin';

const defaultButtonUrls: ButtonUrls = {
  requestDemoFooterUrl: '#',
  scheduleDemo1Url: '#',
  watchVideoUrl: '#',
  scheduleDemo2Url: '#',
  talkConsultant1Url: '#',
  startNowBottomUrl: '#',
  talkConsultant2Url: '#',
  requestDemoUrl: '#',
  whatsappButtonUrl: '#'
};

export function useButtonUrls() {
  const [buttonUrls, setButtonUrls] = useState<ButtonUrls>(defaultButtonUrls);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'admin', 'config'), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (data.buttonUrls) {
          setButtonUrls({
            ...defaultButtonUrls,
            ...data.buttonUrls
          });
        }
      }
      setLoading(false);
    }, (error) => {
      console.error('Erro ao carregar URLs dos botões:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { buttonUrls, loading };
}
