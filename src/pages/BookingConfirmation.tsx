import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, Clock } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(15);
  const [isNavigating, setIsNavigating] = useState(false);

  // Safely get translations with fallbacks
  let t: any;
  try {
    t = useLocale();
  } catch (error) {
    console.error('Locale context error:', error);
    // Fallback translations
    t = {
      confirmation: {
        title: "Demande envoyée avec succès !",
        description: "Merci pour votre demande de devis. Notre équipe vous contactera dans les plus brefs délais pour discuter de votre projet.",
        emailNote: "Vous recevrez une confirmation par email sous peu.",
        autoRedirect: "Redirection automatique dans",
        seconds: "secondes",
        backHome: "Retour à l'accueil",
        questionsText: "Questions ? Contactez-nous au"
      }
    };
  }

  useEffect(() => {
    if (isNavigating) return; // Prevent multiple timers

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsNavigating(true);
          // Small delay to ensure state is updated
          setTimeout(() => {
            try {
              navigate("/");
            } catch (error) {
              console.error('Navigation error:', error);
              // Fallback to window location
              window.location.href = "/";
            }
          }, 100);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, isNavigating]);

  const handleBackHome = () => {
    if (isNavigating) return; // Prevent double navigation
    
    setIsNavigating(true);
    try {
      navigate("/");
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to window location
      window.location.href = "/";
    }
  };

  // Safe translation access with fallbacks
  const getTranslation = (key: string, fallback: string) => {
    try {
      const keys = key.split('.');
      let value = t;
      for (const k of keys) {
        value = value?.[k];
      }
      return value || fallback;
    } catch (error) {
      console.error('Translation error for key:', key, error);
      return fallback;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>

        {/* Thank You Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {getTranslation('confirmation.title', 'Demande envoyée avec succès !')}
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            {getTranslation('confirmation.description', 'Merci pour votre demande de devis. Notre équipe vous contactera dans les plus brefs délais pour discuter de votre projet.')}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {getTranslation('confirmation.emailNote', 'Vous recevrez une confirmation par email sous peu.')}
          </p>
        </div>

        {/* Auto-redirect Timer */}
        <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-4 border border-blue-200 dark:border-gray-600">
          <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium" aria-live="polite" data-testid="countdown-timer">
              {getTranslation('confirmation.autoRedirect', 'Redirection automatique dans')} {countdown} {getTranslation('confirmation.seconds', 'secondes')}
            </span>
          </div>
        </div>

        {/* Back to Home Button */}
        <Button 
          onClick={handleBackHome}
          disabled={isNavigating}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          data-testid="button-back-home"
        >
          <Home className="w-5 h-5" />
          <span>
            {getTranslation('confirmation.backHome', 'Retour à l\'accueil')}
          </span>
        </Button>

        {/* Contact Info */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {getTranslation('confirmation.questionsText', 'Questions ? Contactez-nous au')}
            <br />
            <a href="tel:+41772883838" className="text-red-600 hover:text-red-700 font-medium">
              +41 77 288 38 38
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;