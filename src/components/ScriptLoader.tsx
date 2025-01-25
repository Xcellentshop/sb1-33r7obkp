import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAdmin } from '../contexts/AdminContext';

export default function ScriptLoader() {
  const { scripts } = useAdmin();

  return (
    <Helmet>
      {/* Google Tag Manager */}
      {scripts.googleTagManager && (
        <>
          <script>
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${scripts.googleTagManager}');`}
          </script>
          <noscript>
            {`<iframe src="https://www.googletagmanager.com/ns.html?id=${scripts.googleTagManager}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`}
          </noscript>
        </>
      )}

      {/* Facebook Pixel */}
      {scripts.facebookPixel && (
        <>
          <script>
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${scripts.facebookPixel}');
              fbq('track', 'PageView');

              // Configuração global para eventos de conversão
              window.trackConversion = function(eventName, data = {}) {
                if (window.fbq) {
                  fbq('track', eventName, data);
                }
                if (window.gtag) {
                  gtag('event', eventName, data);
                }
                if (window.dataLayer) {
                  dataLayer.push({
                    event: eventName,
                    ...data
                  });
                }
              };
            `}
          </script>
          <noscript>
            {`<img height="1" width="1" style="display:none"
              src="https://www.facebook.com/tr?id=${scripts.facebookPixel}&ev=PageView&noscript=1"
            />`}
          </noscript>
        </>
      )}

      {/* Google Ads */}
      {scripts.googleAdsTag && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${scripts.googleAdsTag}`} />
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${scripts.googleAdsTag}');
            `}
          </script>
        </>
      )}

      {/* Google Analytics */}
      {scripts.googleAnalyticsTag && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${scripts.googleAnalyticsTag}`} />
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${scripts.googleAnalyticsTag}', {
                page_path: window.location.pathname,
                send_page_view: true
              });
            `}
          </script>
        </>
      )}

      {/* Custom Head Scripts */}
      {scripts.headScripts && (
        <script>{scripts.headScripts}</script>
      )}

      {/* Custom Body Scripts */}
      {scripts.bodyScripts && (
        <script>{scripts.bodyScripts}</script>
      )}
    </Helmet>
  );
}