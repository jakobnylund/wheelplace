import { useState } from 'react';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 relative flex items-center justify-center pt-[72px]">
        {/* Hero background */}
        <div className="absolute inset-0">
          <img
            src="/login-bg.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Card */}
        <div className="relative z-10 w-full max-w-md mx-4 my-12 bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-brand-gray/40">
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-4 text-sm font-medium transition-colors cursor-pointer bg-transparent border-none border-b-2 ${
                activeTab === 'register'
                  ? 'text-brand-blue border-brand-blue'
                  : 'text-brand-gray-medium border-transparent hover:text-brand-dark'
              }`}
            >
              Registrera dig
            </button>
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-4 text-sm font-medium transition-colors cursor-pointer bg-transparent border-none border-b-2 ${
                activeTab === 'login'
                  ? 'text-brand-blue border-brand-blue'
                  : 'text-brand-gray-medium border-transparent hover:text-brand-dark'
              }`}
            >
              Logga in
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function LoginForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1.5">
          E-post
        </label>
        <input
          type="email"
          placeholder="din@email.se"
          className="w-full px-4 py-2.5 border border-brand-gray rounded-lg text-sm text-brand-dark placeholder:text-brand-gray-medium outline-none focus:border-brand-blue transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1.5">
          Lösenord
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full px-4 py-2.5 border border-brand-gray rounded-lg text-sm text-brand-dark placeholder:text-brand-gray-medium outline-none focus:border-brand-blue transition-colors"
        />
      </div>
      <div className="text-right">
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="text-sm text-brand-blue hover:text-brand-blue-dark transition-colors"
        >
          Glömt ditt lösenord? Återställ lösenord
        </a>
      </div>
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-brand-blue hover:bg-brand-blue-dark text-white text-sm font-medium transition-colors cursor-pointer border-none"
      >
        Logga in
      </button>
    </form>
  );
}

function RegisterForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-brand-dark mb-1.5">
          Användartyp
        </label>
        <select className="w-full px-4 py-2.5 border border-brand-gray rounded-lg text-sm text-brand-dark outline-none focus:border-brand-blue transition-colors bg-white appearance-none cursor-pointer">
          <option value="private">Privatperson</option>
          <option value="company">Företag</option>
        </select>
      </div>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="terms"
          className="mt-1 w-4 h-4 rounded border-brand-gray text-brand-blue cursor-pointer"
        />
        <label htmlFor="terms" className="text-sm text-brand-gray-medium leading-relaxed cursor-pointer">
          Jag godkänner{' '}
          <a href="#" onClick={(e) => e.preventDefault()} className="text-brand-blue hover:text-brand-blue-dark transition-colors">
            Användarvillkoren
          </a>{' '}
          och{' '}
          <a href="#" onClick={(e) => e.preventDefault()} className="text-brand-blue hover:text-brand-blue-dark transition-colors">
            Integritetspolicyn
          </a>
        </label>
      </div>
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-brand-blue hover:bg-brand-blue-dark text-white text-sm font-medium transition-colors cursor-pointer border-none"
      >
        Registrera dig
      </button>
    </form>
  );
}
