const GA_MEASUREMENT_ID = 'G-66DT0H32RV';
const CONSENT_KEY = 'alna-analytics-consent';

function loadGoogleAnalytics() {
  if (window.__alnaGaLoaded) return;
  window.__alnaGaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  document.head.appendChild(script);
}

function showConsentBanner() {
  const banner = document.getElementById('cookie-consent-banner');
  if (banner) banner.style.display = 'flex';
}

function hideConsentBanner() {
  const banner = document.getElementById('cookie-consent-banner');
  if (banner) banner.style.display = 'none';
}

function applyConsent(value) {
  localStorage.setItem(CONSENT_KEY, value);
  hideConsentBanner();
  if (value === 'granted') loadGoogleAnalytics();
}

document.addEventListener('DOMContentLoaded', () => {
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === 'granted') {
    loadGoogleAnalytics();
  } else if (stored !== 'denied') {
    showConsentBanner();
  }

  const acceptBtn = document.getElementById('cookie-accept');
  const declineBtn = document.getElementById('cookie-decline');
  const prefsLink = document.getElementById('cookie-prefs-link');
  if (acceptBtn) acceptBtn.addEventListener('click', () => applyConsent('granted'));
  if (declineBtn) declineBtn.addEventListener('click', () => applyConsent('denied'));
  if (prefsLink) prefsLink.addEventListener('click', (e) => { e.preventDefault(); showConsentBanner(); });
});
