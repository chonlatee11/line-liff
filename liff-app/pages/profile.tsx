import { useEffect, useState } from 'react';

interface Profile {
    name: string;
    lastname: string;
    email: string;
  }

export default function Profile() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('/api/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (response.ok) {
        setProfile(await response.json());
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <div>กำลังโหลดข้อมูล...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-gray-800">ข้อมูลส่วนตัว</h1>
        <div className="space-y-2">
          <p><span className="font-semibold">ชื่อ:</span> {profile.name}</p>
          <p><span className="font-semibold">นามสกุล:</span> {profile.lastname}</p>
          <p><span className="font-semibold">Email:</span> {profile.email}</p>
        </div>
      </div>
    </div>
  );
}
