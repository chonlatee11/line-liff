import { useEffect, useState } from 'react';
import axios from "axios";
import liff from '@line/liff';
import { useRouter } from 'next/router';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID || '' });
        if (!liff.isLoggedIn()) {
          liff.login();
        }
      } catch (error) {
        console.error('LIFF Initialization failed', error);
      }
    };
    initializeLiff();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, form, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.status === 200) {
      liff.closeWindow(); // Close the LIFF window
    } else {
      liff.closeWindow(); // Close the LIFF window
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-gray-800">เข้าสู่ระบบ</h1>
        <div className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          เข้าสู่ระบบ
        </button>
        <button
          type="button"
          onClick={() => router.push('/register')}
          className="w-full mt-4 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
        >
          สมัครสมาชิก
        </button>
      </form>
    </div>
  );
}
