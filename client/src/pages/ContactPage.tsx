import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // フォーム送信処理（実際の実装では、バックエンドAPIに送信）
    console.log("Form submitted:", formData);
    
    toast.success("お問い合わせを受け付けました。ご連絡ありがとうございます。");
    
    // フォームをリセット
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="font-serif text-4xl md:text-5xl mb-4 tracking-wider">
              お問い合わせ
            </h1>
            <p className="text-slate-600 leading-relaxed">
              能登百業録に関するお問い合わせは、こちらのフォームからお送りください。
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-12 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="山田 太郎"
                  className="w-full"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@example.com"
                  className="w-full"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                  件名 <span className="text-red-500">*</span>
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="お問い合わせの件名"
                  className="w-full"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  お問い合わせ内容 <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="お問い合わせ内容をご記入ください"
                  rows={8}
                  className="w-full"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 text-lg"
                >
                  送信する
                </Button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-12 p-6 bg-slate-100 text-sm text-slate-600 leading-relaxed">
            <h2 className="font-serif text-lg mb-3 text-slate-900">お問い合わせ先</h2>
            <div className="space-y-1">
              <p>能登町役場</p>
              <p>〒927-0492　石川県鳳珠郡能登町宇出津ト字50番地1</p>

              <p className="mt-3">開庁時間：8時30分から17時15分（土曜日・日曜日・祝日、年末年始を除く）</p>
              <p className="text-xs">窓口延長：能登町役場のみ毎週木曜日17時15分から18時30分(祝日は除く)</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
