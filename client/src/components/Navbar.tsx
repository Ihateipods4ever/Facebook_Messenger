import { Link } from "wouter";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white fill-current" />
          </div>
          <span className="font-bold text-lg tracking-tight">Messenger<span className="text-muted-foreground">Mac</span></span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection("features")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </button>
          <button onClick={() => scrollToSection("installation")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Installation
          </button>
          <button onClick={() => scrollToSection("feedback")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Feedback
          </button>
        </div>

        <div className="flex items-center gap-4">
          <Button 
            onClick={() => scrollToSection("installation")}
            className="hidden sm:flex bg-primary hover:bg-primary/90 text-white rounded-full px-6 shadow-lg shadow-primary/20"
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
