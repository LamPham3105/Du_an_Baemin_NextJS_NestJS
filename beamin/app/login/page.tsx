"use client";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  FacebookOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useState } from "react";

const Page: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { usernameOrEmail, password } = formData;

    // Validation
    if (!usernameOrEmail || !password) {
      message.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8080/auth/login", {
        usernameOrEmail,
        password,
      });

      if (response.data?.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        message.success("Đăng nhập thành công!");
        router.push("/dashboard"); // Adjust the redirect path as needed
      } else {
        message.error("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      message.error(
        error.response?.data?.message || "Đã xảy ra lỗi, vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-14 w-1/3 bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8">
        <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
          Đăng Nhập
        </div>
        <div className="flex flex-col w-full gap-3">
          <Input
            name="usernameOrEmail"
            placeholder="Email/Số điện thoại/Tên đăng nhập"
            value={formData.usernameOrEmail}
            onChange={handleInputChange}
            className="h-[40px]"
          />
        </div>
        <div className="flex flex-col w-full mt-3">
          <Input.Password
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleInputChange}
            className="h-[40px]"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
        <div className="flex flex-col w-full mt-3">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full h-[40px] uppercase text-white bg-beamin rounded-lg ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Đang xử lý..." : "Đăng Nhập"}
          </button>
          <div className="flex flex-row justify-between items-center w-full text-sm text-beamin">
            <span className="cursor-pointer">Quên mật khẩu</span>
            <span className="cursor-pointer">Đăng nhập bằng SMS</span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-sm text-gray-600">HOẶC</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex flex-row items-center justify-center gap-5 h-[40px]">
          <button className="flex items-center justify-center gap-3 border w-full h-full p-1 text-beamin text-base">
            <FacebookOutlined />
            <span>Facebook</span>
          </button>
          <button className="flex items-center justify-center gap-3 border w-full h-full p-1 text-beamin text-base">
            <GoogleOutlined />
            <span>Google</span>
          </button>
        </div>
        <div className="flex items-center justify-center gap-1">
          <span className="text-gray-600">Bạn mới biết đến Baemin?</span>
          <Link className="text-beamin cursor-pointer" href="/register">
            Đăng kí
          </Link>
        </div>
      </div>
    </>
  );
};

export default Page;
