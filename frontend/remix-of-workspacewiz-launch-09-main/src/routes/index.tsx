import { createFileRoute } from "@tanstack/react-router";
import {
  ShieldCheck,
  Search,
  Users,
  QrCode,
  Heart,
  BarChart3,
  ArrowRight,
  Play,
  Check,
  Zap,
  Sparkles,
  TrendingUp,
  Smile,
  Twitter,
  Linkedin,
  Github,
  Mail,
} from "lucide-react";
import heroImg from "@/assets/hero-workspace.jpg";
import shotDashboard from "@/assets/screenshot-dashboard.jpg";
import shotMobile from "@/assets/screenshot-mobile.jpg";
import shotAnalytics from "@/assets/screenshot-analytics.jpg";
import logoAsset from "@/assets/workspacewiz-logo.png.asset.json";

export const Route = createFileRoute("/")({
  component: Landing,
});

const features = [
  { icon: ShieldCheck, title: "OTP Secure Login", desc: "Passwordless authentication with email-based one-time passcodes for enterprise-grade security." },
  { icon: Search, title: "Smart Workspace Search", desc: "Filter by location, amenities, capacity and availability with intelligent recommendations." },
  { icon: Users, title: "Real-Time Seat Availability", desc: "Live floor plans show open desks and meeting rooms updated the moment they change." },
  { icon: QrCode, title: "QR-Based Booking Confirmation", desc: "Scan in, scan out. Frictionless check-ins backed by secure, single-use codes." },
  { icon: Heart, title: "Wishlist Management", desc: "Save favourite spaces and teams for one-tap booking on your next visit." },
  { icon: BarChart3, title: "Admin Dashboard & Analytics", desc: "Utilisation insights, occupancy trends and cost reports for facility leaders." },
];

const steps = [
  { n: "01", title: "Login using Email OTP", desc: "Sign in securely without passwords." },
  { n: "02", title: "Search and Explore Workspaces", desc: "Browse floors, rooms and desks in seconds." },
  { n: "03", title: "Select Seat and Time Slot", desc: "Pick the perfect seat for your day." },
  { n: "04", title: "Confirm Booking & Receive QR", desc: "Check in instantly when you arrive." },
];

const benefits = [
  { icon: Zap, title: "Faster Workspace Allocation", desc: "Reduce booking time from minutes to seconds across your organisation." },
  { icon: Sparkles, title: "Reduced Administrative Effort", desc: "Automate the busywork so facility teams can focus on experience." },
  { icon: TrendingUp, title: "Better Space Utilisation", desc: "Right-size your real estate footprint with data-driven decisions." },
  { icon: Smile, title: "Improved Employee Experience", desc: "Give your people a seamless, modern way to plan their workday." },
];

const testimonials = [
  {
    quote:
      "WorkspaceWiz cut our average booking time by 84%. Our hybrid teams finally have a tool that respects their time.",
    name: "Priya Anand",
    role: "Head of Workplace, Lumen Group",
  },
  {
    quote:
      "The analytics gave us the confidence to consolidate two floors. The ROI was visible within the first quarter.",
    name: "Marcus Hale",
    role: "VP Real Estate, Northwind Labs",
  },
  {
    quote:
      "Implementation was painless and the QR check-in is a hit with our members. Polished from end to end.",
    name: "Sofía Ramírez",
    role: "Community Director, HiveSpace Coworking",
  },
];

function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2.5">
          <img src={logoAsset.url} alt="WorkspaceWiz logo" className="h-10 w-10 rounded-lg object-cover" />
          <span className="font-display text-lg font-bold tracking-tight">WorkspaceWiz</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#benefits" className="hover:text-foreground transition-colors">Benefits</a>
          
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="http://192.168.1.10:5000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Get Started
          </a>
        </div>

      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,oklch(0.55_0.18_264_/_0.12),transparent_70%)]" />
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 lg:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-glow" />
            Trusted by modern workplaces
          </div>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Book the Perfect Workspace in <span className="text-gradient">Seconds</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            WorkspaceWiz helps employees and organizations discover, reserve, and manage office spaces effortlessly.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="http://192.168.1.10:5000"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-primary px-7 text-sm font-semibold text-primary-foreground shadow-glow transition hover:translate-y-[-1px]"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>


          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-6xl">
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-primary opacity-20 blur-3xl" />
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
            <img
              src={heroImg}
              alt="Modern office workspace with professionals collaborating"
              width={1920}
              height={1080}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="border-t border-border bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-glow">Features</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Everything you need to run a modern workplace</h2>
          <p className="mt-4 text-lg text-muted-foreground">A complete platform purpose-built for hybrid teams, enterprises and coworking operators.</p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl border border-border bg-card p-7 transition hover:shadow-elegant hover:-translate-y-1"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-md">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="bg-secondary/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-glow">How it works</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">From login to seat in four steps</h2>
        </div>
        <div className="relative mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.n} className="relative rounded-2xl border border-border bg-card p-7 shadow-sm">
              <div className="font-display text-5xl font-extrabold text-gradient">{s.n}</div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="absolute -right-4 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-border lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section id="benefits" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-glow">Benefits</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Real outcomes for real estate and people teams</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              WorkspaceWiz pays for itself by unlocking smarter use of space and giving employees a workplace that just works.
            </p>
            <ul className="mt-8 space-y-4">
              {benefits.map((b) => (
                <li key={b.title} className="flex gap-4">
                  <div className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/5 text-primary">
                    <b.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-semibold">{b.title}</p>
                    <p className="text-sm text-muted-foreground">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-primary opacity-10 blur-2xl" />
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
              <img src={shotAnalytics} alt="WorkspaceWiz analytics dashboard" width={1280} height={800} loading="lazy" className="h-auto w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Screenshots() {
  return (
    <section className="bg-secondary/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-glow">Product</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">A workspace experience that feels effortless</h2>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-elegant lg:col-span-2">
            <img src={shotDashboard} alt="Floor plan dashboard" width={1280} height={800} loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-gradient-primary p-6 shadow-elegant">
            <img src={shotMobile} alt="Mobile QR booking confirmation" width={800} height={1024} loading="lazy" className="mx-auto h-full w-auto max-h-[420px] object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-glow">Customers</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Loved by workplace leaders</h2>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="flex h-full flex-col rounded-2xl border border-border bg-card p-8 shadow-sm">
              <div className="flex gap-1 text-primary-glow">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Check key={i} className="h-4 w-4" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-foreground">"{t.quote}"</blockquote>
              <figcaption className="mt-6 border-t border-border pt-5">
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="px-6 py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-cta px-8 py-20 text-center shadow-glow">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,oklch(1_0_0_/_0.15),transparent_70%)]" />
        <h2 className="relative text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
          Ready to Transform Workspace Booking?
        </h2>
        <p className="relative mx-auto mt-5 max-w-2xl text-lg text-primary-foreground/80">
          Join the organisations rethinking how their people use the office. Get up and running in days, not months.
        </p>
        <a
          href="http://192.168.1.10:5000"
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-background px-8 text-sm font-semibold text-primary transition hover:translate-y-[-1px]"
        >
          Launch WorkspaceWiz
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src={logoAsset.url} alt="WorkspaceWiz logo" className="h-10 w-10 rounded-lg object-cover" />
              <span className="font-display text-lg font-bold">WorkspaceWiz</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The intelligent workspace booking platform for modern offices and coworking spaces.
            </p>
            <a href="mailto:hello@workspacewiz.com" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary-glow">
              <Mail className="h-4 w-4" /> hello@workspacewiz.com
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold">Company</p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">About</a></li>
              <li><a href="#" className="hover:text-foreground">Careers</a></li>
              <li><a href="#" className="hover:text-foreground">Press</a></li>
              <li><a href="#" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Follow us</p>
            <div className="mt-4 flex gap-3">
              <a href="#" aria-label="Twitter" className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition hover:border-primary-glow hover:text-primary-glow"><Twitter className="h-4 w-4" /></a>
              <a href="#" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition hover:border-primary-glow hover:text-primary-glow"><Linkedin className="h-4 w-4" /></a>
              <a href="#" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition hover:border-primary-glow hover:text-primary-glow"><Github className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} WorkspaceWiz, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Benefits />
        <Screenshots />
        
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
