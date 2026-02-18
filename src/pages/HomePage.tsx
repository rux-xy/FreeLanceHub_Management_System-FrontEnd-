import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  Shield,
  MessageSquare,
  CreditCard,
  Star,
  Users,
  FileText,
  GraduationCap,
  ChevronDown,
  Briefcase } from
'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
export function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
              <Shield className="h-4 w-4" /> Trusted by 10,000+ students
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Freelance work, <br />
              <span className="text-blue-600">powered by your campus</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Post Jobs, Apply, Deliver. Get paid — in a verified student
              marketplace across universities. Build your portfolio while you
              study.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-lg px-8 py-4 h-auto">

                  Join UniFreelancerHub
                </Button>
              </Link>
              <Link to="/jobs">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-lg px-8 py-4 h-auto">

                  Explore Features
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600" /> Verified
                university emails
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600" /> Milestone +
                escrow payments
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            {/* Dashboard Preview Card Mockup */}
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 relative z-10 transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-xs text-slate-400">
                  unifreelancer.com/dashboard
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-xs text-slate-500 uppercase font-bold mt-1">
                    Active Jobs
                  </div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-emerald-600">
                    $1,240
                  </div>
                  <div className="text-xs text-slate-500 uppercase font-bold mt-1">
                    Earned
                  </div>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-amber-600">
                    4.9 <span className="text-sm">★</span>
                  </div>
                  <div className="text-xs text-slate-500 uppercase font-bold mt-1">
                    Rating
                  </div>
                </div>
              </div>

              <h3 className="font-bold text-slate-900 mb-4">
                Recent Opportunities
              </h3>
              <div className="space-y-3">
                <div className="p-4 border border-slate-100 rounded-xl flex justify-between items-center hover:bg-slate-50 transition-colors">
                  <div>
                    <div className="font-semibold text-slate-900">
                      React Frontend Development
                    </div>
                    <div className="text-xs text-slate-500">
                      University of Colombo • Posted 2h ago
                    </div>
                  </div>
                  <span className="font-bold text-blue-600">$150</span>
                </div>
                <div className="p-4 border border-slate-100 rounded-xl flex justify-between items-center hover:bg-slate-50 transition-colors">
                  <div>
                    <div className="font-semibold text-slate-900">
                      Graphic Design for Event
                    </div>
                    <div className="text-xs text-slate-500">
                      University of Kelaniya • Posted 5h ago
                    </div>
                  </div>
                  <span className="font-bold text-blue-600">$80</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  VS
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    Verified Student
                  </div>
                  <div className="text-xs text-slate-500">
                    University of Kelaniya
                  </div>
                </div>
                <CheckCircle className="h-5 w-5 text-blue-500 ml-auto" />
              </div>
            </div>

            {/* Floating Notification */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 z-20 animate-bounce">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <DollarSignIcon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">Payment Released</div>
                  <div className="font-bold text-slate-900">+$75.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-10 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">
            Trusted by Students From
          </p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-xl font-bold text-slate-800">
              University of Kelaniya
            </span>
            <span className="text-xl font-bold text-slate-800">
              University of Colombo
            </span>
            <span className="text-xl font-bold text-slate-800">
              University of Moratuwa
            </span>
            <span className="text-xl font-bold text-slate-800">
              University of Jaffna
            </span>
            <span className="text-xl font-bold text-slate-800">
              University of Peradeniya
            </span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-slate-900 mb-2">
              10,000+
            </div>
            <div className="text-slate-500 font-medium">Student Profiles</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-slate-900 mb-2">2,500+</div>
            <div className="text-slate-500 font-medium">Jobs Posted</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-slate-900 mb-2">$180K+</div>
            <div className="text-slate-500 font-medium">Paid to Students</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-slate-900 mb-2">
              4.8 <span className="text-yellow-400 text-3xl">★</span>
            </div>
            <div className="text-slate-500 font-medium">Average Rating</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              How it Works
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Powerful tools designed specifically for student freelancers and
              clients.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Briefcase}
              title="Smart Marketplace"
              desc="Browse jobs with advanced filters by university, faculty, skills, budget, and ratings. Get AI-powered recommendations." />

            <FeatureCard
              icon={FileText}
              title="Milestone Contracts"
              desc="Create contracts with clear milestones, deadlines, and deliverables. Track progress with built-in activity logs." />

            <FeatureCard
              icon={MessageSquare}
              title="In-App Messaging"
              desc="Chat with clients and freelancers, share files, negotiate terms, and stay organized within UniFreelancerHub." />

            <FeatureCard
              icon={CreditCard}
              title="Secure Payments"
              desc="Escrow-style milestone payments swap funds safe until work is approved. Withdraw to bank or card." />

            <FeatureCard
              icon={Shield}
              title="Verified Students"
              desc="Badges verify verified university email. Optional Student ID verification for extra trust. Badges show verification level." />

            <FeatureCard
              icon={Star}
              title="Reputation System"
              desc="Build profile with ratings, reviews, skill endorsements, and level badges. Rise from New to Elite." />

          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="gap-2">
              View all features <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Ethics Section */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
              Academic Integrity
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              We support ethical collaboration
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              UniFreelancerHub is built on trust and academic integrity. We
              connect students for legitimate work that enhances learning, not
              cheating.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-green-100 p-2 rounded-full h-fit">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">What's Allowed</h4>
                  <p className="text-slate-600 text-sm mt-1">
                    Tutoring, guidance, debugging help, design work,
                    documentation, research assistance, collaboration on side
                    projects.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-red-100 p-2 rounded-full h-fit">
                  <XIcon className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    What's Not Allowed
                  </h4>
                  <p className="text-slate-600 text-sm mt-1">
                    Essay writing, exam impersonation, submitting others' work
                    as your own, completing assignments for payment, any form of
                    academic dishonesty.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-blue-100 p-2 rounded-full h-fit">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Our Commitment</h4>
                  <p className="text-slate-600 text-sm mt-1">
                    We enforce strict policies, and provide dispute resolution
                    to maintain a trusted student community.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Button variant="outline">Read our full integrity policy</Button>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Students collaborating"
              className="rounded-2xl shadow-2xl" />

            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-6 w-6 text-blue-600" />
                <span className="font-bold text-slate-900">
                  Integrity First
                </span>
              </div>
              <p className="text-sm text-slate-500">
                Trusted student community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-sm font-bold text-slate-400 uppercase mb-2">
              FAQ
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Frequently asked questions
            </h2>
            <p className="text-slate-600">
              Everything you need to know about UniFreelancerHub.
            </p>
          </div>

          <div className="space-y-4">
            <FAQItem question="How does verification work?" />
            <FAQItem question="How do secure payments work?" />
            <FAQItem question="What if there's a dispute?" />
            <FAQItem question="Is this platform free to use?" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 bg-blue-600/20"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/30 to-transparent"></div>

          <div className="relative z-10 px-8 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to earn from your skills — or <br />
              hire trusted campus talent?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Join thousands of students already building their future on
              UniFreelancerHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-500 text-white border-none text-lg px-8 py-4 h-auto">

                  Create Account
                </Button>
              </Link>
              <Link to="/jobs">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white border-white hover:bg-white/10 text-lg px-8 py-4 h-auto">

                  Browse Jobs
                </Button>
              </Link>
            </div>
            <p className="text-slate-400 text-sm mt-6 flex items-center justify-center gap-2">
              <ClockIcon className="h-4 w-4" /> It takes less than 2 minutes to
              get started
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A192F] text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  UniFreelancer
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-6">
                The trusted student freelance marketplace. Build skills, earn
                money, and connect with campus talent.
              </p>
              <div className="flex gap-4">
                {/* Social icons placeholders */}
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="font-bold text-xs">tw</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="font-bold text-xs">in</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="font-bold text-xs">ig</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Product</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Safety
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Browse Jobs
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    For Universities
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Integrity Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400 transition-colors">
                    Request Demo
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <div>&copy; 2026 UniFreelancerHub. All rights reserved.</div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" /> Verified Student Marketplace
            </div>
          </div>
        </div>
      </footer>
    </div>);

}
function FeatureCard({
  icon: Icon,
  title,
  desc




}: {icon: any;title: string;desc: string;}) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>);

}
function FAQItem({ question }: {question: string;}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex justify-between items-center cursor-pointer hover:bg-slate-50 transition-colors">
      <span className="font-medium text-slate-900">{question}</span>
      <ChevronDown className="h-5 w-5 text-slate-400" />
    </div>);

}
function DollarSignIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">

      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>);

}
function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">

      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>);

}
function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">

      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>);

}