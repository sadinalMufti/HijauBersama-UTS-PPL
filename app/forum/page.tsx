"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Reply = {
  isi: string;
  author: string;
  waktu: string;
};

type Post = {
  judul: string;
  isi: string;
  author: string;
  waktu: string;
  replies: Reply[];
};

export default function Forum() {
  const [posts, setPosts] = useState<Post[]>([
    {
      judul: "Cara Menanam Pohon dengan Benar",
      isi: "Apakah ada tips untuk menanam pohon yang mudah dan cepat tumbuh di lingkungan tropis? Mari berbagi pengalaman!",
      author: "Aulia Vika Rahman",
      waktu: "2 hari yang lalu",
      replies: [],
    },
    {
      judul: "Pengalaman Merawat Tanaman dalam Pot",
      isi: "Ada yang punya tips merawat tanaman dalam pot di ruangan tertutup? Bagaimana agar tanaman tetap sehat dan hijau?",
      author: "Ali",
      waktu: "1 minggu yang lalu",
      replies: [],
    },
  ]);

  const [input, setInput] = useState<string>("");
  const [replyInputs, setReplyInputs] = useState<{ [key: number]: string }>({});
  const [showReply, setShowReply] = useState<{ [key: number]: boolean }>({});

  const handleAddPost = () => {
    if (input.trim() === "") return;

    const newPost: Post = {
      judul: "Pengalaman Baru",
      isi: input,
      author: "Anda",
      waktu: "Baru saja",
      replies: [],
    };

    setPosts([newPost, ...posts]);
    setInput("");
  };

  const toggleReply = (index: number) => {
    setShowReply((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleReplyChange = (index: number, value: string) => {
    setReplyInputs({ ...replyInputs, [index]: value });
  };

  const handleReplySubmit = (index: number) => {
    const replyText = replyInputs[index];
    if (!replyText || replyText.trim() === "") return;

    const updatedPosts = [...posts];
    updatedPosts[index].replies.push({
      isi: replyText,
      author: "Anda",
      waktu: "Baru saja",
    });

    setPosts(updatedPosts);
    setReplyInputs({ ...replyInputs, [index]: "" });
    setShowReply({ ...showReply, [index]: false });
  };

  return (
    <div className="bg-[#F2EFE7] min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-[#006A71] text-center mb-8"
        >
          Forum Diskusi & Sharing Pengalaman 🗣️
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-lg text-gray-700 mb-10"
        >
          Tempat berbagi pengalaman bercocok tanam, merawat lingkungan, dan proyek penghijauan bersama komunitas 🌱
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-xl mb-10"
        >
          <h2 className="text-2xl font-semibold text-[#006A71] mb-4">Bagikan Pengalaman Anda</h2>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 p-4 border-2 border-[#9ACBD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48A6A7] mb-4 placeholder-[#5C7C7D] text-[#5C7C7D]"
            placeholder="Tulis pengalaman atau pertanyaan Anda di sini..."
          ></textarea>
          <button
            onClick={handleAddPost}
            className="bg-[#006A71] text-white px-6 py-2 rounded-lg hover:bg-[#48A6A7] transition-colors"
          >
            Kirim Pengalaman
          </button>
        </motion.div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-[#006A71] mb-2">Diskusi Terbaru</h2>
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold text-[#006A71]">{post.judul}</h3>
              <p className="text-gray-700 mt-2">{post.isi}</p>
              <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                <span>Oleh: <strong>{post.author}</strong></span>
                <span>•</span>
                <span>{post.waktu}</span>
              </div>

              <button
                onClick={() => toggleReply(index)}
                className="text-[#006A71] mt-4 text-sm hover:underline"
              >
                {showReply[index] ? "Sembunyikan Balasan" : "Balas"}
              </button>

              {showReply[index] && (
                <div className="mt-3">
                  <textarea
                    value={replyInputs[index] || ""}
                    onChange={(e) => handleReplyChange(index, e.target.value)}
                    placeholder="Tulis balasan Anda..."
                    className="w-full h-32 p-4 border-2 border-[#9ACBD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#48A6A7] mb-4 placeholder-[#5C7C7D] text-[#5C7C7D]"
                  ></textarea>
                  <button
                    onClick={() => handleReplySubmit(index)}
                    className="bg-[#48A6A7] text-white px-4 py-1 rounded text-sm hover:bg-[#35999C]"
                  >
                    Kirim
                  </button>
                </div>
              )}

              {/* Tampilkan balasan */}
              {post.replies.length > 0 && (
                <div className="mt-4 space-y-2 border-t pt-3">
                  {post.replies.map((reply, i) => (
                    <div
                      key={i}
                      className="text-sm bg-[#F5F7F7] p-3 rounded-md text-gray-800"
                    >
                      <p>{reply.isi}</p>
                      <div className="text-xs text-gray-500 mt-1">
                        Oleh: <strong>{reply.author}</strong> • {reply.waktu}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
