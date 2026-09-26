import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Leaf,
  MapPin,
  Star,
  Clock,
  Compass,
} from "lucide-react";
import { db } from "@/lib/db";
import ProductGrid from "@/components/ProductGrid";
import HeroShowcase from "@/components/HeroShowcase";
import MarqueeBanner from "@/components/MarqueeBanner";
import ScrollReveal from "@/components/ScrollReveal";

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

  const branches = [
    {
      name: "Trạm Chanh",
      tag: "Trà Trái Cây & Bánh Lăn",
      address: "09 Hải Thượng, Phường Cam Ly, TP. Đà Lạt",
      hours: "19:00 - 24:00",
      highlight: "Trà Olong hoa quả tự nhiên, trà chanh tươi thanh mát & bánh lăn nướng giòn.",
      mapsUrl: "https://maps.google.com/?q=09+Hai+Thuong+Da+Lat",
      badge: "🍋 Trạm Chanh",
    },
    {
      name: "Trạm Sữa",
      tag: "Sữa Hạt & Bánh Tam Giác",
      address: "44 Yersin, Phường Xuân Hương, TP. Đà Lạt",
      hours: "19:00 - 24:00",
      highlight: "Sữa bò tươi nguyên chất kết hợp hạt hữu cơ béo bùi & bánh tam giác nướng ấm nóng.",
      mapsUrl: "https://maps.google.com/?q=44+Yersin+Da+Lat",
      badge: "🥛 Trạm Sữa",
    },
    {
      name: "Trạm Bánh",
      tag: "Cà Phê, Bơ Coco & Waffle",
      address: "46 Yersin, Phường Xuân Hương, TP. Đà Lạt",
      hours: "19:00 - 24:00",
      highlight: "Cà phê đậm vị Việt Nam, đặc sản bơ sáp cốt dừa & bánh waffle nướng bơ tỏi thơm lừng.",
      mapsUrl: "https://maps.google.com/?q=46+Yersin+Da+Lat",
      badge: "🥐 Trạm Bánh",
    },
  ];

  const testimonials = [
    {
      quote:
        "Trà chanh ở Trạm thơm đậm mùi ô long tự nhiên chứ không phải siro hương liệu. Uống ngụm đầu tiên là thấy vị chua ngọt thanh mát cực kỳ khác biệt!",
      author: "Bảo Trâm",
      role: "Du khách TP. Hồ Chí Minh",
      rating: 5,
      favorite: "Trà Chanh Olong",
    },
    {
      quote:
        "Thời tiết Đà Lạt tối se lạnh 17-18 độ, ngồi quây quần cùng bạn bè uống ly sữa đậu nành nóng hổi kèm bánh lăn nướng thì không còn gì bằng.",
      author: "Minh Tuấn",
      role: "Khách quen tại Đà Lạt",
      rating: 5,
      favorite: "Sữa Đậu Nành & Bánh Lăn",
    },
    {
      quote:
        "Món Bơ Coco cốt dừa siêu đỉnh! Bơ sáp dẻo béo ngậy, dừa nạo giòn rụm, order giao tới khách sạn vẫn giữ được độ tươi mát tuyệt đối.",
      author: "Thùy Dung",
      role: "Food Reviewer Hà Nội",
      rating: 5,
      favorite: "Bơ Coco Cốt Dừa",
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-8 md:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading & CTA */}
            <ScrollReveal direction="up" delay={0.05} className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF2D5] border-2 border-navy text-maroon text-xs font-black uppercase tracking-wider shadow-[0_2px_0_#2D2A4A]">
                <Sparkles className="w-3.5 h-3.5 text-mustard" />
                <span>Thực đơn Trạm Đà Lạt • Tươi mới mỗi ngày</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-navy leading-[1.12] tracking-tight">
                Luôn tươi ngon vì sức khỏe của bạn.
              </h1>

              <p className="text-base sm:text-lg text-navy/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Mỗi thức uống và chiếc bánh tại <strong className="text-maroon font-black">Trạm</strong> đều được làm từ nguyên liệu tự nhiên, vị ngọt thanh mát, không hóa chất bảo quản, giữ trọn vẹn hương vị tinh túy xứ sương mù Đà Lạt.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/menu"
                  className="w-full sm:w-auto px-8 py-4 bg-maroon hover:bg-maroon-dark text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl border-2 border-navy shadow-[0_4px_0_#2D2A4A] active:translate-y-0.5 active:shadow-[0_2px_0_#2D2A4A] flex items-center justify-center gap-2.5 transition-all"
                >
                  <span>Khám phá thực đơn</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/hours"
                  className="w-full sm:w-auto px-6 py-4 bg-white/90 hover:bg-white text-navy font-black text-xs sm:text-sm uppercase tracking-wider rounded-2xl border-2 border-navy shadow-[0_3px_0_#2D2A4A] active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-2"
                >
                  <Clock className="w-4 h-4 text-teal" />
                  <span>Giờ mở cửa (19h - 24h)</span>
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
                  <span>Không phụ gia bảo quản</span>
                </div>
                <span className="text-navy/30">•</span>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-mustard" />
                  <span>Giao tận nơi Đà Lạt</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Column: Interactive Hero Showcase */}
            <ScrollReveal direction="left" delay={0.15} className="lg:col-span-5">
              <HeroShowcase />
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* MARQUEE INFINITE TICKER */}
      <ScrollReveal direction="up" delay={0.05}>
        <MarqueeBanner />
      </ScrollReveal>

      {/* 3 STATIONS SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black text-teal uppercase tracking-widest block mb-2">
            Hệ sinh thái Trạm
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-black text-navy">
            Ba Trạm Hương Vị Độc Đáo
          </h2>
          <p className="text-sm text-navy/70 mt-2 font-medium">
            Chọn món từ trạm bạn yêu thích hoặc kết hợp nhiều trạm trong cùng một đơn hàng!
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stations.map((st, idx) => (
            <ScrollReveal
              key={st.title}
              delay={idx * 0.12}
              direction="up"
              scale={true}
              className="h-full"
            >
              <div className="bg-white rounded-3xl p-6 border-2 border-navy shadow-[0_6px_20px_rgba(45,42,74,0.08)] flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 group h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-[#FFF2D5] border border-navy/20 text-navy">
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
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS GRID */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal direction="up" className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
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
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-maroon hover:text-maroon-dark hover:underline underline-offset-4"
          >
            <span>Xem tất cả thực đơn</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </ScrollReveal>

        <ProductGrid products={featuredProducts as any} />
      </section>

      {/* 3 PHYSICAL BRANCHES LOCATIONS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black text-maroon uppercase tracking-widest block mb-2">
            Địa chỉ ghé quán
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-black text-navy">
            3 Chi Nhánh Trạm Tại Đà Lạt
          </h2>
          <p className="text-sm text-navy/70 mt-2 font-medium">
            Đều mở cửa đón khách từ <strong className="text-maroon font-bold">19:00 đến 24:00</strong> mỗi tối (Thứ 2 → Chủ Nhật).
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {branches.map((branch, idx) => (
            <ScrollReveal
              key={branch.name}
              delay={idx * 0.12}
              direction="up"
              scale={true}
              className="h-full"
            >
              <div className="bg-white rounded-3xl p-6 border-2 border-navy shadow-[0_4px_16px_rgba(45,42,74,0.06)] flex flex-col justify-between hover:-translate-y-1 transition-all h-full">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-[#FFF2D5] border border-navy/20 text-xs font-black text-navy">
                      {branch.badge}
                    </span>
                    <span className="text-[11px] font-bold text-teal flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {branch.hours}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-black text-navy">
                      {branch.name}
                    </h3>
                    <span className="text-[11px] font-bold text-muted uppercase">
                      {branch.tag}
                    </span>
                  </div>

                  <p className="text-xs text-navy/85 font-bold flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-maroon shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </p>

                  <p className="text-xs text-muted font-medium bg-[#F6EFDF] p-3 rounded-xl border border-navy/10 leading-relaxed">
                    {branch.highlight}
                  </p>
                </div>

                <div className="pt-4 mt-2">
                  <a
                    href={branch.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-3 bg-[#FFF2D5] hover:bg-[#FFE6B3] text-navy font-black text-xs rounded-xl border border-navy shadow-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Compass className="w-3.5 h-3.5 text-teal" />
                    <span>Mở Google Maps chỉ đường</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CUSTOMER TESTIMONIALS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black text-teal uppercase tracking-widest block mb-2">
            Đánh giá từ khách quen
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-black text-navy">
            Khách Hàng Nói Gì Về Trạm?
          </h2>
          <p className="text-sm text-navy/70 mt-2 font-medium">
            Hàng ngàn lượt ghé thăm và yêu mến mỗi tháng tại phố núi Đà Lạt.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <ScrollReveal
              key={idx}
              delay={idx * 0.12}
              direction="up"
              scale={true}
              className="h-full"
            >
              <div className="bg-[#FFFDF7] rounded-3xl p-6 border-2 border-navy shadow-[0_4px_16px_rgba(45,42,74,0.06)] flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-mustard">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-mustard text-mustard" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-navy/85 leading-relaxed font-medium italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-navy/10 mt-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-black text-navy text-sm">
                      {t.author}
                    </h4>
                    <span className="text-[11px] font-medium text-muted">
                      {t.role}
                    </span>
                  </div>
                  <span className="text-[10px] font-black text-teal bg-teal/10 px-2 py-0.5 rounded-md border border-teal/20">
                    {t.favorite}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* BRAND PHILOSOPHY BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <ScrollReveal scale={true} direction="up">
          <div className="bg-[#FFF2D5] rounded-3xl p-8 sm:p-12 border-3 border-navy shadow-[0_8px_24px_rgba(45,42,74,0.1)] relative overflow-hidden">
            <div className="max-w-2xl relative z-10 space-y-4">
              <span className="text-xs font-black text-maroon uppercase tracking-widest">
                Câu chuyện thương hiệu
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-navy leading-snug">
                &ldquo;Trạm dừng chân ngọt lành giữa lòng phố núi Đà Lạt&rdquo;
              </h2>
              <p className="text-sm sm:text-base text-navy/85 leading-relaxed font-medium">
                Chúng tôi tin rằng thức uống ngon nhất là thức uống tự nhiên nhất. Không siro hương liệu nhân tạo, không hóa chất bảo quản. Từng ly trà, chai sữa hạt và mẻ bánh nướng được hoàn thành mỗi tối với niềm đam mê mang lại sức khỏe và năng lượng tích cực cho bạn.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-navy hover:bg-navy-dark text-white font-black text-xs uppercase tracking-wider rounded-xl border border-navy shadow-sm transition-all"
                >
                  <span>Liên hệ với Trạm</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/hours"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-[#F6EFDF] text-navy font-black text-xs uppercase tracking-wider rounded-xl border border-navy/30 transition-all"
                >
                  <span>Xem bản đồ 3 trạm</span>
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
