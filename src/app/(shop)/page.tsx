import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, HeartHandshake, ShieldCheck, Leaf } from "lucide-react";
import { db } from "@/lib/db";
import ProductGrid from "@/components/ProductGrid";

export const revalidate = 60; // ISR cache revalidation every minute

async function getFeaturedProducts() {
  try {
    return await db.product.findMany({
      where: {
        isAvailable: true,
        isFeatured: true,
      },
      take: 8,
    });
  } catch (e) {
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  const stations = [
    {
      title: "Trạm Chanh",
      tagline: "Trà Trái Cây & Bánh Lăn",
      desc: "Trà Olong thượng hạng kết hợp trái cây tươi giòn thanh ngọt, cùng bánh lăn nướng vỏ giòn xốp thơm lừng.",
      link: "/menu?category=Trạm Chanh",
      color: "from-amber-500/20 to-amber-600/10 border-amber-600/30",
      accent: "text-amber-800",
      bgBtn: "bg-mustard hover:bg-[#d89e40]",
      badge: "🍋 Tươi Mát",
      image: "/images/products/trachanh.png",
    },
    {
      title: "Trạm Sữa",
      tagline: "Sữa Hạt & Bánh Tam Giác",
      desc: "Sữa bò tươi nguyên chất nấu cùng hạt sen, hạt điều, đậu nành hữu cơ sánh mịn, kèm bánh tam giác nướng béo bùi.",
      link: "/menu?category=Trạm Sữa",
      color: "from-teal-500/20 to-teal-600/10 border-teal-600/30",
      accent: "text-teal-800",
      bgBtn: "bg-teal hover:bg-teal-dark text-white",
      badge: "🥛 Bổ Dưỡng",
      image: "/images/products/suadaunanhhanhnhan.png",
    },
    {
      title: "Trạm Bánh",
      tagline: "Cafe, Bơ Coco & Waffle",
      desc: "Cà phê đậm vị Việt Nam, đặc sản bơ sáp cốt dừa béo ngậy và bánh waffle nướng ấm giòn mỗi sáng.",
      link: "/menu?category=Trạm Bánh",
      color: "from-red-500/20 to-red-600/10 border-red-600/30",
      accent: "text-maroon-dark",
      bgBtn: "bg-maroon hover:bg-maroon-dark text-white",
      badge: "🥐 Thơm Lừng",
      image: "/images/products/bococo.png",
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF2D5] border border-navy/20 text-maroon text-xs font-black uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-mustard" />
                <span>Thực đơn Trạm Đà Lạt • Tươi mới mỗi ngày</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-navy leading-[1.15] tracking-tight">
                Luôn tươi ngon vì sức khỏe của bạn.
              </h1>

              <p className="text-base sm:text-lg text-navy/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Mỗi thức uống và chiếc bánh tại <strong className="text-maroon font-bold">Trạm</strong> đều được làm từ nguyên liệu tự nhiên, vị ngọt thanh mát, không chất bảo quản, giữ trọn vẹn sự tinh túy của vùng đất Đà Lạt.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/menu"
                  className="w-full sm:w-auto px-8 py-4 bg-maroon hover:bg-maroon-dark text-white font-black text-sm uppercase tracking-wider rounded-2xl border-2 border-navy shadow-[0_4px_0_#2D2A4A] active:translate-y-0.5 active:shadow-[0_2px_0_#2D2A4A] flex items-center justify-center gap-2.5 transition-all"
                >
                  <span>Khám phá thực đơn</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/hours"
                  className="w-full sm:w-auto px-6 py-4 bg-white/80 hover:bg-white text-navy font-black text-sm uppercase tracking-wider rounded-2xl border-2 border-navy shadow-[0_3px_0_#2D2A4A] active:translate-y-0.5 transition-all text-center"
                >
                  Giờ mở cửa & Bản đồ
                </Link>
              </div>

              {/* Highlights pills */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-bold text-navy/70">
                <div className="flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-teal" />
                  <span>100% Nguyên liệu tươi</span>
                </div>
                <span className="text-navy/30">•</span>
                <div className="flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-maroon" />
                  <span>Không phụ gia độc hại</span>
                </div>
                <span className="text-navy/30">•</span>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-mustard" />
                  <span>Giao tận nơi nhanh chóng</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm sm:max-w-md bg-white p-4 rounded-3xl border-3 border-navy shadow-[0_16px_40px_rgba(45,42,74,0.18)] rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="overflow-hidden rounded-2xl border-2 border-navy bg-paper aspect-[4/3] relative">
                  <img
                    src="/images/products/trachanh.png"
                    alt="Trà Chanh Trạm"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-navy/90 text-white text-xs font-bold px-3 py-1.5 rounded-xl backdrop-blur-sm">
                    🍋 Trà Olong Chanh tươi — 20.000đ
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between px-2">
                  <div>
                    <h4 className="font-serif font-black text-navy text-lg">Món Bán Chạy Nhất</h4>
                    <p className="text-xs text-muted font-medium">Trà đậm vị, chanh thanh mát bừng tỉnh</p>
                  </div>
                  <Link
                    href="/menu"
                    className="p-2.5 bg-mustard hover:bg-[#d89e40] text-navy rounded-xl border-2 border-navy shadow-[0_2px_0_#2D2A4A]"
                    title="Đặt món"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3 STATIONS SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black text-teal uppercase tracking-widest block mb-2">
            Hệ sinh thái Trạm
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-black text-navy">
            Ba Trạm Hương Vị Độc Đáo
          </h2>
          <p className="text-sm text-muted mt-2 font-medium">
            Chọn món từ trạm bạn yêu thích hoặc kết hợp nhiều trạm trong cùng một đơn hàng!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stations.map((st) => (
            <div
              key={st.title}
              className={`bg-white rounded-3xl p-6 border-2 border-navy shadow-[0_6px_20px_rgba(45,42,74,0.08)] flex flex-col justify-between hover:-translate-y-1.5 transition-all`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-[#FFF2D5] border border-navy/20 text-navy">
                    {st.badge}
                  </span>
                  <span className="text-xs font-bold text-muted uppercase">
                    {st.tagline}
                  </span>
                </div>

                <div className="aspect-[16/10] rounded-2xl overflow-hidden border-2 border-navy mb-4 bg-paper">
                  <img
                    src={st.image}
                    alt={st.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h3 className={`font-serif text-2xl font-black ${st.accent} mb-2`}>
                  {st.title}
                </h3>
                <p className="text-sm text-navy/70 leading-relaxed font-medium mb-6">
                  {st.desc}
                </p>
              </div>

              <Link
                href={st.link}
                className={`w-full py-3 text-center text-xs font-black uppercase tracking-wider rounded-xl border-2 border-navy shadow-[0_3px_0_#2D2A4A] active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5 ${st.bgBtn}`}
              >
                <span>Xem menu {st.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS GRID */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-black text-maroon uppercase tracking-widest block mb-1">
              Tuyển chọn đặc biệt
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-black text-navy">
              Món Được Yêu Thích Nhất
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-black text-maroon hover:text-maroon-dark hover:underline underline-offset-4"
          >
            <span>Xem tất cả 29 món</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <ProductGrid products={featuredProducts as any} />
      </section>

      {/* BRAND PHILOSOPHY BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-[#FFF2D5] rounded-3xl p-8 sm:p-12 border-3 border-navy shadow-[0_8px_24px_rgba(45,42,74,0.1)] relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-xs font-black text-maroon uppercase tracking-widest">
              Câu chuyện thương hiệu
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-navy leading-snug">
              "Trạm dừng chân ngọt lành giữa lòng phố núi Đà Lạt"
            </h2>
            <p className="text-sm sm:text-base text-navy/85 leading-relaxed font-medium">
              Chúng tôi tin rằng thức uống ngon nhất là thức uống tự nhiên nhất. Không siro hương liệu nhân tạo, không hóa chất bảo quản. Từng ly trà, chai sữa hạt và mẻ bánh nướng được hoàn thành mỗi sáng với niềm đam mê mang lại sức khỏe và năng lượng tích cực cho bạn.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-navy hover:bg-navy-dark text-white font-extrabold text-xs uppercase tracking-wider rounded-xl border border-navy shadow-sm transition-all"
              >
                <span>Tìm hiểu thêm & Liên hệ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
