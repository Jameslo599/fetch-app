'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useState } from 'react';

const Logout = () => {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);

  const handleLogout = useCallback(async () => {
    setClicked(!clicked);
    try {
      const res = await fetch(
        'https://frontend-take-home-service.fetch.com/auth/logout',
        {
          method: 'POST',
          credentials: 'include',
        }
      );
      if (!res.ok) {
        throw new Error(`HTTP Error. Status: ${res.status}`);
      }
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  }, [router, clicked]);

  return (
    <Button
      onClick={handleLogout}
      disabled={clicked ? true : false}
      className="absolute right-0 m-4"
    >
      {clicked ? 'Logging Out...' : 'Log Out'}
    </Button>
  );
};

export default Logout;
