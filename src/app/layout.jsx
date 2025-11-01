import "@/assets/styles/globals.css";
import { montserrat, hallengerSerif } from "@/lib/fonts";
import Nav from "@/components/home/part/Nav";
import Footer from "@/components/home/sections/Footer";
import Whatsapp from "@/components/whatsapp/Whatsapp";
import ConversionTracking from "@/components/others/ConversionTracking";
import Booking from "@/booking/Booking";
import Script from "next/script";
import PixelTracker from "@/components/pixeltracker"; // New client-side component

export default function RootLayout({ children }) {

   const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://thedermahouse.com/#organization",
    "name": "The Derma House",
    "url": "https://thedermahouse.com/",
    "logo": "https://thedermahouse.com/logo.svg",
    "sameAs": [
      "https://www.facebook.com/people/The-Dermahouse/61572606715527/",
      "https://www.instagram.com/thedermahouseofficial/",
      "https://www.linkedin.com/company/the-dermahouse",
      "https://www.youtube.com/@thedermahouse"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+919463762930",
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": ["English"]
      }
    ]
  };

  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": "https://thedermahouse.com/#localbusiness",
    "name": "The Derma House - Santacruz",
    "url": "https://thedermahouse.com/",
    "image": "https://thedermahouse.com/logo.svg",
    "parentOrganization": { "@id": "https://thedermahouse.com/#organization" },
    "telephone": "+919463762930",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Linking Road",
      "addressLocality": "Mumbai",
      "postalCode": "400050",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
        ],
        "opens": "11:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday"],
        "opens": "11:00",
        "closes": "16:00"
      }
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "19.0623",
      "longitude": "72.8266"
    },
    "priceRange": "₹₹"
  };

  return (
    <html lang="en">
      <head>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel-2" strategy="afterInteractive">
          {`
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '621252900234726');
    fbq('track', 'PageView');
  `}
        </Script>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MRQZ72GT');
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7RLXWMJCS9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-7RLXWMJCS9'); // Replace with your GA4 Measurement ID
    `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
        />
      </head>
      <body
        className={`antialiased ${montserrat.variable} ${hallengerSerif.variable}`}
      >
        {/* Google Tag Manager (noscript) */}
         <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MRQZ72GT"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* Meta Pixel Code (noscript) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=621252900234726&ev=PageView&noscript=1"
          />
        </noscript>
        <PixelTracker /> {/* Add the client-side tracker */}
        <Nav />
        {children}
        <ConversionTracking/>
        <Footer/>
        <Booking/>
        <Whatsapp/>
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";
