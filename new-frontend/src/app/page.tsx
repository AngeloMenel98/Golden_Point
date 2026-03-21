import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gp-pastel">
      <h1 className="text-5xl font-bold text-white mb-4">Golden Point</h1>
      <p className="text-xl text-white/90 mb-8">Padel Tournament Management</p>
      <div className="flex gap-4">
        <Link href="/login" className="px-6 py-3 bg-white text-gp-dark font-semibold rounded-md hover:bg-gp-light transition-colors">
          Login
        </Link>
        <Link href="/register" className="px-6 py-3 bg-gp-dark text-white font-semibold rounded-md hover:bg-gp-light hover:text-gp-dark transition-colors">
          Register
        </Link>
      </div>
    </div>
  );
}
