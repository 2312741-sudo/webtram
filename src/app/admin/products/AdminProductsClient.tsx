"use client";

import React, { useState, useRef } from "react";
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Search,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Loader2,
  Link as LinkIcon,
  AlertCircle,
} from "lucide-react";
import { formatVND } from "@/lib/utils";

interface ProductItem {
  id: string;
  name: string;
  categoryName: string;
  subCategory?: string | null;
  price: number;
  multiPrice?: string | null;
  image: string;
  description?: string | null;
  isAvailable: boolean;
  isFeatured: boolean;
}

interface CategoryItem {
  id: string;
  name: string;
}

export default function AdminProductsClient({
  initialProducts,
  categories,
}: {
  initialProducts: ProductItem[];
  categories: CategoryItem[];
}) {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("Trạm Chanh");
  const [formSubCategory, setFormSubCategory] = useState("");
  const [formPrice, setFormPrice] = useState(20000);
  const [formMultiPrice, setFormMultiPrice] = useState("");
  const [formImage, setFormImage] = useState("/images/products/trachanh.png");
  const [formDescription, setFormDescription] = useState("");
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Direct upload states
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showManualUrl, setShowManualUrl] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormName("");
    setFormCategory("Trạm Chanh");
    setFormSubCategory("");
    setFormPrice(25000);
    setFormMultiPrice("");
    setFormImage("/images/products/trachanh.png");
    setFormDescription("");
    setFormIsFeatured(false);
    setUploadError(null);
    setUploadSuccess(false);
    setShowManualUrl(false);
    setModalOpen(true);
  };

  const openEditModal = (p: ProductItem) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormCategory(p.categoryName);
    setFormSubCategory(p.subCategory || "");
    setFormPrice(p.price);
    setFormMultiPrice(p.multiPrice || "");
    setFormImage(p.image);
    setFormDescription(p.description || "");
    setFormIsFeatured(p.isFeatured);
    setUploadError(null);
    setUploadSuccess(false);
    setShowManualUrl(false);
    setModalOpen(true);
  };

  // Direct file upload handler
  const handleUploadFile = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Vui lòng chọn file hình ảnh (PNG, JPG, WEBP, GIF)");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Kích thước ảnh không được vượt quá 10MB");
      return;
    }

    setIsUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setFormImage(data.url);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      } else {
        setUploadError(data.error || "Tải ảnh thất bại. Vui lòng thử lại.");
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setUploadError("Không thể kết nối đến máy chủ để tải ảnh.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUploadFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUploadFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formImage) {
      setUploadError("Vui lòng tải ảnh cho sản phẩm");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formName,
        categoryName: formCategory,
        subCategory: formSubCategory || null,
        price: Number(formPrice),
        multiPrice: formMultiPrice || null,
        image: formImage,
        description: formDescription || null,
        isFeatured: formIsFeatured,
      };

      if (editingProduct) {
        // PATCH
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setProducts((prev) =>
            prev.map((p) => (p.id === editingProduct.id ? data.data : p))
          );
          setModalOpen(false);
        }
      } else {
        // POST
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          setProducts((prev) => [data.data, ...prev]);
          setModalOpen(false);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleAvailable = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: !current }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, isAvailable: !current } : p))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa món "${name}" khỏi thực đơn?`)) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(search.toLowerCase()) ||
      (p.subCategory && p.subCategory.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase text-maroon tracking-wider">
            Quản Lý Thực Đơn
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-navy">
            Danh Sách Món Ăn & Thức Uống ({products.length})
          </h1>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-maroon hover:bg-maroon-dark text-white rounded-xl text-xs font-black uppercase tracking-wider border border-navy shadow-[0_3px_0_#2D2A4A] flex items-center gap-1.5 transition-all active:translate-y-0.5"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Món Mới</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm món trong kho..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-navy bg-white text-sm font-semibold text-navy focus:outline-none"
        />
        <Search className="w-4 h-4 text-navy/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border-2 border-navy shadow-[0_6px_20px_rgba(45,42,74,0.06)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-navy">
            <thead className="bg-[#FFF2D5] border-b-2 border-navy text-xs font-black uppercase text-navy">
              <tr>
                <th className="py-3.5 px-4">Ảnh</th>
                <th className="py-3.5 px-4">Tên Món</th>
                <th className="py-3.5 px-4">Danh Mục</th>
                <th className="py-3.5 px-4">Nhóm Món</th>
                <th className="py-3.5 px-4">Giá Bán</th>
                <th className="py-3.5 px-4">Trạng Thái</th>
                <th className="py-3.5 px-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/10 font-medium">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-[#F6EFDF]/30 transition-colors">
                  <td className="py-3 px-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-xl object-cover border border-navy/20 bg-paper"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-navy flex items-center gap-1.5">
                      {product.name}
                      {product.isFeatured && (
                        <span className="text-[10px] bg-maroon text-white font-black px-1.5 py-0.5 rounded">
                          HOT
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-xs font-bold text-muted">
                    {product.categoryName}
                  </td>
                  <td className="py-3 px-4 text-xs font-semibold text-teal">
                    {product.subCategory || "—"}
                  </td>
                  <td className="py-3 px-4 font-black">
                    {formatVND(product.price)}
                    {product.multiPrice && (
                      <span className="text-[10px] text-muted block font-normal">
                        ({product.multiPrice})
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleToggleAvailable(product.id, product.isAvailable)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
                        product.isAvailable
                          ? "bg-green-100 text-green-800 border-green-300"
                          : "bg-red-100 text-red-800 border-red-300"
                      }`}
                    >
                      {product.isAvailable ? "Còn hàng" : "Hết hàng"}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-1.5 text-navy hover:text-maroon border border-navy/30 rounded-lg hover:bg-navy/5"
                        title="Sửa món"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id, product.name)}
                        className="p-1.5 text-muted hover:text-red-600 border border-navy/30 rounded-lg hover:bg-red-50"
                        title="Xóa món"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit Product */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-navy/60 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-[#FFFDF7] rounded-3xl border-3 border-navy shadow-2xl p-6 z-10 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b-2 border-navy/10 mb-4">
              <h2 className="font-serif text-xl font-black text-navy uppercase">
                {editingProduct ? "Chỉnh Sửa Món Ăn" : "Thêm Món Mới"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-navy hover:text-maroon rounded-lg hover:bg-navy/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              
              {/* IMAGE UPLOAD SECTION */}
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase text-navy">
                  Hình ảnh món ăn <span className="text-red-500">*</span>
                </label>

                {/* Hidden input file */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {/* Upload Card / Dropzone */}
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-4 transition-all flex flex-col sm:flex-row items-center gap-4 ${
                    isDragging
                      ? "border-maroon bg-maroon/5 scale-[1.01]"
                      : "border-navy/30 bg-[#F6EFDF]/50 hover:bg-[#F6EFDF] hover:border-navy"
                  }`}
                >
                  {/* Image Preview Thumbnail */}
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-navy bg-white shrink-0 shadow-sm flex items-center justify-center">
                    {formImage ? (
                      <img
                        src={formImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-navy/30" />
                    )}

                    {isUploading && (
                      <div className="absolute inset-0 bg-navy/70 flex flex-col items-center justify-center text-white p-1 text-center">
                        <Loader2 className="w-6 h-6 animate-spin text-mustard" />
                      </div>
                    )}
                  </div>

                  {/* Upload button & guide */}
                  <div className="flex-1 text-center sm:text-left space-y-1.5">
                    <button
                      type="button"
                      disabled={isUploading}
                      className="inline-flex items-center gap-2 px-3.5 py-2 bg-navy hover:bg-navy-dark text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all pointer-events-none"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-mustard" />
                          <span>Đang tải ảnh lên...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 text-mustard" />
                          <span>Tải ảnh từ máy / điện thoại</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-muted font-medium">
                      Bấm vào để chọn ảnh hoặc kéo thả ảnh vào đây (Hỗ trợ JPG, PNG, WEBP tối đa 10MB).
                    </p>
                  </div>
                </div>

                {/* Upload Status / Error feedback */}
                {uploadSuccess && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-50 p-2 rounded-xl border border-green-200">
                    <Check className="w-4 h-4 text-green-600" />
                    <span>Tải ảnh lên thành công và đã tự động lưu vào hệ thống!</span>
                  </div>
                )}

                {uploadError && (
                  <div className="flex items-center gap-1.5 text-xs font-bold text-red-700 bg-red-50 p-2 rounded-xl border border-red-200">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {/* Optional toggle to view or manually enter URL */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowManualUrl(!showManualUrl)}
                    className="text-[11px] font-bold text-teal hover:underline flex items-center gap-1"
                  >
                    <LinkIcon className="w-3 h-3" />
                    <span>{showManualUrl ? "Ẩn đường dẫn ảnh" : "Hoặc xem / dán link ảnh thủ công"}</span>
                  </button>

                  {showManualUrl && (
                    <div className="mt-2">
                      <input
                        type="text"
                        value={formImage}
                        onChange={(e) => setFormImage(e.target.value)}
                        placeholder="/images/products/ten-mon.png hoặc https://..."
                        className="w-full px-3 py-2 rounded-xl border border-navy/30 bg-white text-xs font-mono text-navy"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* PRODUCT NAME */}
              <div>
                <label className="block text-xs font-black uppercase text-navy mb-1">
                  Tên món ăn / thức uống <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Ví dụ: Trà Olong - Bưởi đỏ"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-navy bg-white text-sm font-semibold text-navy focus:outline-none focus:border-maroon"
                />
              </div>

              {/* CATEGORY & SUBCATEGORY */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase text-navy mb-1">
                    Trạm / Danh Mục
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-navy bg-white text-xs font-bold text-navy"
                  >
                    <option value="Trạm Chanh">Trạm Chanh</option>
                    <option value="Trạm Sữa">Trạm Sữa</option>
                    <option value="Trạm Bánh">Trạm Bánh</option>
                    <option value="Trạm Chanh, Trạm Sữa">Trạm Chanh, Trạm Sữa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-navy mb-1">
                    Nhóm phụ (SubCategory)
                  </label>
                  <input
                    type="text"
                    value={formSubCategory}
                    onChange={(e) => setFormSubCategory(e.target.value)}
                    placeholder="Ví dụ: Trà Trái Cây"
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-navy bg-white text-xs font-semibold text-navy"
                  />
                </div>
              </div>

              {/* PRICE & DISPLAY MULTIPRICE */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase text-navy mb-1">
                    Giá bán (VND) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    step={1000}
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-navy bg-white text-sm font-bold text-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-navy mb-1">
                    Khoảng giá (tuỳ chọn)
                  </label>
                  <input
                    type="text"
                    value={formMultiPrice}
                    onChange={(e) => setFormMultiPrice(e.target.value)}
                    placeholder="Ví dụ: 20k - 30k"
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-navy bg-white text-xs font-semibold text-navy"
                  />
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-xs font-black uppercase text-navy mb-1">
                  Mô tả món
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Thành phần, vị ngon, đặc điểm tươi sạch..."
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-navy bg-white text-xs resize-none text-navy"
                />
              </div>

              {/* FEATURED CHECKBOX */}
              <div className="flex items-center gap-2 pt-1 bg-[#FFF2D5]/70 p-3 rounded-xl border border-navy/15">
                <input
                  type="checkbox"
                  id="featuredCheck"
                  checked={formIsFeatured}
                  onChange={(e) => setFormIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-maroon accent-maroon"
                />
                <label htmlFor="featuredCheck" className="text-xs font-bold text-navy cursor-pointer">
                  Đánh dấu là món NỔI BẬT (Hiển thị ngoài Trang Chủ & mục Bán Chạy)
                </label>
              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 text-xs font-bold text-navy border-2 border-navy rounded-xl hover:bg-navy/5"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className="flex-1 py-3 bg-maroon hover:bg-maroon-dark text-white text-xs font-black uppercase tracking-wider rounded-xl border-2 border-navy shadow-[0_3px_0_#2D2A4A] active:translate-y-0.5 disabled:opacity-50"
                >
                  {isSubmitting ? "Đang lưu..." : "Lưu Sản Phẩm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
