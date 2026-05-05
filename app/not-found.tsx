export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-3">Không tìm thấy trang</h1>
      <p className="text-neutral-600 mb-6">
        Trang bạn đang tìm có thể đã bị xoá hoặc chưa được công bố.
      </p>
      <a
        href="/"
        className="inline-block px-5 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600"
      >
        Về trang chủ
      </a>
    </div>
  );
}
