import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useLanguage } from '../LanguageContext';

const AdminDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { language } = useLanguage();
    const [session, setSession] = useState<any>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'services' | 'projects' | 'faq'>('services');

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setError(error.message);
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    if (!session) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
                        <p className="text-gray-500 mt-2 text-sm">Access your content management system</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                placeholder="admin@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>
                    <button
                        onClick={onBack}
                        className="w-full mt-4 text-gray-500 text-sm hover:text-gray-900 transition-colors"
                    >
                        ← Back to website
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar / Header */}
            <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold text-gray-900">WebXlux Admin</h1>
                    <nav className="flex items-center gap-2 ml-8">
                        {(['services', 'projects', 'faq'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-400 hidden sm:block">{session.user.email}</span>
                    <button
                        onClick={handleLogout}
                        className="text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all"
                    >
                        Sign Out
                    </button>
                    <button
                        onClick={onBack}
                        className="text-sm bg-gray-100 text-gray-700 px-4 py-1.5 rounded-lg hover:bg-gray-200 transition-all font-medium"
                    >
                        Exit Admin
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="p-6 md:p-10 max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 min-h-[600px] p-6">
                    {activeTab === 'services' && <ServicesManager />}
                    {activeTab === 'projects' && <ProjectsManager />}
                    {activeTab === 'faq' && <FAQManager />}
                </div>
            </main>
        </div>
    );
};

const ServicesManager: React.FC = () => {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    async function fetchServices() {
        setLoading(true);
        const { data, error } = await supabase.from('services').select('*').order('order');
        if (data) setServices(data);
        setLoading(false);
    }

    if (loading) return <div className="p-8 text-center text-gray-500">Loading services...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Manage Services</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all">
                    + Add Service
                </button>
            </div>
            <div className="space-y-4">
                {services.map((s) => (
                    <div key={s.id} className="p-4 border border-gray-100 rounded-xl flex items-center justify-between hover:border-blue-100 transition-all">
                        <div>
                            <h3 className="font-bold text-gray-900">{s.title_en} / {s.title_fr}</h3>
                            <p className="text-sm text-gray-500 line-clamp-1">{s.description_en}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-all"><i className="fas fa-edit"></i></button>
                            <button className="p-2 text-gray-400 hover:text-red-600 transition-all"><i className="fas fa-trash"></i></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProjectsManager: React.FC = () => (
    <div className="p-8 text-center">
        <i className="fas fa-project-diagram text-4xl text-gray-200 mb-4 block"></i>
        <h2 className="text-xl font-bold text-gray-900">Projects Manager</h2>
        <p className="text-gray-500 mt-2">Projects management interface coming soon...</p>
    </div>
);

const FAQManager: React.FC = () => {
    const [faqs, setFaqs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFaqs();
    }, []);

    async function fetchFaqs() {
        setLoading(true);
        const { data } = await supabase.from('faq_items').select('*').order('order');
        if (data) setFaqs(data);
        setLoading(false);
    }

    if (loading) return <div className="p-8 text-center text-gray-500">Loading FAQs...</div>;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all">
                    + Add FAQ
                </button>
            </div>
            <div className="space-y-4">
                {faqs.map((f) => (
                    <div key={f.id} className="p-4 border border-gray-100 rounded-xl hover:border-blue-100 transition-all">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-gray-900">{f.question_en}</h3>
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-gray-400 hover:text-blue-600 transition-all"><i className="fas fa-edit"></i></button>
                                <button className="p-2 text-gray-400 hover:text-red-600 transition-all"><i className="fas fa-trash"></i></button>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-2 italic">FR: {f.question_fr}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
