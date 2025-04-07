"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "Nama Pengguna",
    email: "user@email.com",
    bio: "Halo! Saya pengguna HijauBersama. Saya tertarik pada isu lingkungan dan ingin ikut berkontribusi menjaga kelestarian alam.",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(form);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#F2EFE7] pt-28 px-6"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8"
      >
        <div className="flex items-center space-x-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 relative"
          >
            <Image
              src="/profil/avatar.jpg"
              alt="User Avatar"
              fill
              className="rounded-full object-cover"
            />
          </motion.div>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="edit"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="text-2xl font-semibold text-[#006A71] w-full border-b focus:outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="text-gray-600 w-full mt-1 border-b focus:outline-none"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl font-semibold text-[#006A71]">{profile.name}</h2>
                  <p className="text-gray-600">{profile.email}</p>
                  <p className="mt-2 text-sm text-gray-500">Bergabung sejak: April 2025</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div>
            {isEditing ? (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#006A71] text-white rounded-xl text-sm hover:bg-[#00565b] transition-all"
              >
                Simpan
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-[#9ACBD0] text-[#006A71] rounded-xl text-sm hover:bg-[#8ac2c6] transition-all"
              >
                Edit Profil
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold text-[#006A71] mb-4">Tentang Saya</h3>
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.textarea
                key="edit-bio"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                name="bio"
                value={form.bio}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border rounded-md focus:outline-none"
              />
            ) : (
              <motion.p
                key="view-bio"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-700"
              >
                {profile.bio}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfilePage;
