import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, Clock } from "lucide-react";
import { useLocale } from "@/lib/locale-context";

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const t = useLocale();
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleBackHome = () => {
    navigate("/");
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
            {t.confirmation.title}
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            {t.confirmation.description}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t.confirmation.emailNote}
          </p>
        </div>

        {/* Auto-redirect Timer */}
        <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-4 border border-blue-200 dark:border-gray-600">
          <div className="flex items-center justify-center space-x-2 text-blue-600 dark:text-blue-400">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium" aria-live="polite" data-testid="countdown-timer">
              {t.confirmation.autoRedirect} {countdown} {t.confirmation.seconds}
            </span>
          </div>
        </div>

        {/* Back to Home Button */}
        <Button 
          onClick={handleBackHome}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          data-testid="button-back-home"
        >
          <Home className="w-5 h-5" />
          <span>
            {t.confirmation.backHome}
          </span>
        </Button>

        {/* Contact Info */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t.confirmation.questionsText}
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