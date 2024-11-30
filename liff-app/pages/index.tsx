import { useEffect } from 'react';
import liff from '@line/liff';

export default function Home() {
  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID || '' });
      } catch (error) {
        console.error('LIFF Initialization failed', error);
      }
    };
    initializeLiff();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to LINE LIFF Chat App</h1>
      <p className="text-gray-600 mb-8">
        ระบบ Chat Real-time พร้อมการลงทะเบียนและเข้าสู่ระบบผ่าน LINE LIFF
      </p>
      <div className="space-x-4">
        <a
          href="/register"
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          ลงทะเบียน
        </a>
        <a
          href="/login"
          className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
        >
          เข้าสู่ระบบ
        </a>
        <a
          href="/profile"
          className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
        >
          โปรไฟล์
        </a>
      </div>
    </div>
  );
}
