import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/feeds');
    } else {
      router.push('/auth/login');
    }
  }, [router]);

  return null;
};

export default Home;
