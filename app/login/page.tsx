// LoginPage.tsx
import FormSection from "@/components/organisms/login/FormSection";
import HeroSection from "@/components/organisms/login/HeroSection";

export default function LoginPage() {
  return (
    <main className="min-h-screen relative md:grid md:grid-cols-2">      
      <HeroSection />

      <div className="absolute inset-2 flex top-40 items-center justify-center
                    md:bg-gray-200 md:static md:flex md:items-center md:justify-center">
        <FormSection />
      </div>
    </main>
  );
}
