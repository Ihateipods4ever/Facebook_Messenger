import { Navbar } from "@/components/Navbar";
import { FeatureCard } from "@/components/FeatureCard";
import { CodeBlock } from "@/components/CodeBlock";
import { FeedbackForm } from "@/components/FeedbackForm";
import { FeedbackGrid } from "@/components/FeedbackGrid";
import { 
  MessageCircle, 
  Bell, 
  Laptop, 
  Zap, 
  Shield, 
  Download, 
  Github,
  Terminal,
  Cpu
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 container mx-auto text-center z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-30 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary rounded-full blur-[128px]" />
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-purple-500 rounded-full blur-[128px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium text-muted-foreground">Latest v1.2.0 is live</span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-6">
            Facebook Messenger, <br />
            <span className="text-gradient-primary">Native on Mac</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            A lightweight, privacy-focused Electron wrapper that brings your chats 
            out of the browser and into your dock.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-0.5"
              onClick={() => document.getElementById("installation")?.scrollIntoView({ behavior: "smooth" })}
            >
              <Download className="w-5 h-5 mr-2" />
              Download Source
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full px-8 h-12 text-base border-white/10 hover:bg-white/5 bg-transparent"
              onClick={() => window.open("https://github.com/btatarov/shai", "_blank")}
            >
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Hero Image / Terminal Preview */}
      <section className="container mx-auto px-4 mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="absolute -inset-1 bg-gradient-to-b from-primary/20 to-transparent rounded-2xl blur-xl opacity-50" />
          <CodeBlock 
            filename="electron/main.js (Preview)"
            language="javascript"
            code={`const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadURL('https://www.messenger.com');
}

app.whenReady().then(createWindow);`} 
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-transparent to-background/50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why use the wrapper?</h2>
            <p className="text-muted-foreground text-lg">More than just a browser tab.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Bell className="w-6 h-6" />}
              title="Native Notifications"
              description="Integrates seamlessly with macOS Notification Center. Never miss a message again."
              delay={0}
            />
            <FeatureCard 
              icon={<Laptop className="w-6 h-6" />}
              title="Dock Integration"
              description="Proper unread badge counts right on your dock icon, just like a native app."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Shield className="w-6 h-6" />}
              title="Privacy Focused"
              description="Sandboxed environment. No cross-site tracking cookies from other browser tabs."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Zap className="w-6 h-6" />}
              title="Lightweight"
              description="Significantly lower memory footprint compared to keeping a Chrome tab open."
              delay={0.3}
            />
            <FeatureCard 
              icon={<Terminal className="w-6 h-6" />}
              title="Open Source"
              description="Full access to the source code. Inspect, modify, and build it yourself."
              delay={0.4}
            />
            <FeatureCard 
              icon={<Cpu className="w-6 h-6" />}
              title="System Theme"
              description="Automatically detects your system appearance and toggles dark mode accordingly."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section id="installation" className="py-24 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Build it yourself</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Since this is an open-source wrapper, you get to build the binary yourself. 
              Don't worry, it takes less than 2 minutes.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">1</div>
                <div>
                  <h4 className="font-semibold mb-1">Clone the repository</h4>
                  <p className="text-sm text-muted-foreground">Download the source code to your local machine.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">2</div>
                <div>
                  <h4 className="font-semibold mb-1">Install dependencies</h4>
                  <p className="text-sm text-muted-foreground">Run npm install to fetch Electron and other required packages.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">3</div>
                <div>
                  <h4 className="font-semibold mb-1">Launch the app</h4>
                  <p className="text-sm text-muted-foreground">Start the application in development mode or build a DMG.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <CodeBlock 
              language="bash"
              code={`# 1. Clone the project
git clone https://github.com/btatarov/shai
cd shai

# 2. Install dependencies
npm install

# 3. Start the app
npm start`}
            />
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="py-24 bg-white/[0.02]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">We value your feedback</h2>
            <p className="text-muted-foreground">Help us improve the wrapper by sharing your experience.</p>
          </div>

          <div className="relative">
            {/* Decorative background elements */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] -z-10" />
            
            <FeedbackForm />
          </div>

          <FeedbackGrid />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <MessageCircle className="w-3 h-3 text-white fill-current" />
              </div>
              <span className="font-semibold text-sm">MessengerMac</span>
            </div>
            
            <p className="text-xs text-muted-foreground text-center md:text-right max-w-md">
              This project is an open-source Electron wrapper and is not affiliated with, endorsed by, or connected to Meta Platforms, Inc. or Facebook Messenger.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
