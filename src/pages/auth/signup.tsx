import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import UserService from '@/pages/api/services/user'
import Loading from '@/components/Loading';


export default function SignUp() {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [passwordAgain, setPasswordAgain] = useState<string>("")
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (password !== passwordAgain) {
                throw new Error('Passwords do not match');
            }

            const { data } = await UserService.createUser({ username, email, password });

            if (data) {
                await router.push('/auth/login');
            }

        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-lg p-10 space-y-6 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold text-center">Sign Up</h1>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">

                        {error && (
                            <div className="text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="username"
                                autoComplete="username"
                                className="appearance-none rounded-md w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                value={username}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="appearance-none rounded-md w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                value={email}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                className="appearance-none rounded-md w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                value={password}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="passwordagain" className="sr-only">
                                Password Again
                            </label>
                            <input
                                id="passwordAgain"
                                name="passwordAgain"
                                type="password"
                                autoComplete="passwordAgain"
                                className="appearance-none rounded-md w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                onChange={(e) => setPasswordAgain(e.target.value)}
                                placeholder="Password"
                                value={passwordAgain}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <p className="text-sm">
                        Already have an account?{' '}
                        <Link href="/">
                            <span className="font-medium text-indigo-600 hover:text-indigo-500">Log in</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
