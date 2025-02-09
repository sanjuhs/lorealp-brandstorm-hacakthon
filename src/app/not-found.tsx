import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFF5E1] items-center justify-center">
      <h1 className="text-4xl font-bold text-[#FFB74D]">404 - Not Found</h1>
      <p className="mt-4 text-lg text-gray-700">
        Sorry, the page you are looking for does not exist.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-[#FFB74D] text-white rounded-lg shadow-md hover:bg-[#FF9F00] transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
