export default function RegisterPage() {
  return (
    <div className="card w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-gp-dark">Register</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gp-gray mb-1">Name</label>
          <input type="text" className="input-field" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gp-gray mb-1">Email</label>
          <input type="email" className="input-field" placeholder="email@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gp-gray mb-1">Password</label>
          <input type="password" className="input-field" placeholder="••••••••" />
        </div>
        <button type="submit" className="btn-primary">Register</button>
      </form>
      <p className="text-center mt-4 text-gp-gray text-sm">
        Already have an account?{' '}
        <a href="/login" className="text-gp-pastel hover:underline">Login</a>
      </p>
    </div>
  );
}
