import { useEffect } from "react";

const StructuredData = () => {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "ATS Générale",
      "description": "Votre solution complète pour la maison et le jardin. Services premium de construction, rénovation, aménagement paysager et entretien à Genève.",
      "url": "https://atsgenerale.ch",
      "telephone": "+41772883838",
      "email": "contact@atsgenerale.ch",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Genève",
        "addressCountry": "CH"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "46.2044",
        "longitude": "6.1432"
      },
      "openingHours": [
        "Mo-Fr 08:00-18:00",
        "Sa 09:00-16:00"
      ],
      "priceRange": "€€€",
      "servedRegion": ["Genève", "Vaud", "Suisse Romande"],
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "46.2044",
          "longitude": "6.1432"
        },
        "geoRadius": "50000"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services ATS Générale",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Construction et Rénovation",
              "description": "Services complets de construction, rénovation intérieure et extérieure, maçonnerie, peinture, carrelage"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Aménagement Paysager",
              "description": "Création et entretien d'espaces verts, jardinage professionnel, plantation et aménagement extérieur"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Entretien et Maintenance",
              "description": "Services d'entretien complets, plomberie, électricité, nettoyage professionnel et maintenance"
            }
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      },
      "founder": {
        "@type": "Person",
        "name": "ATS Générale"
      },
      "foundingDate": "1999",
      "numberOfEmployees": "15-25",
      "sameAs": [
        "https://www.facebook.com/atsgenerale",
        "https://www.instagram.com/atsgenerale",
        "https://www.linkedin.com/company/atsgenerale"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

export default StructuredData;