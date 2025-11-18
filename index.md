---
layout: default
lang: en
---

<script>
  // Auto-redirect to language-specific page based on browser preference
  (function() {
    const browserLang = navigator.language || navigator.userLanguage;
    const isSpanish = browserLang.toLowerCase().startsWith('es');
    const targetLang = isSpanish ? 'es' : 'en';
    const baseUrl = '{{ "/" | relative_url }}';
    const targetUrl = baseUrl + targetLang + '/';

    // Redirect immediately
    window.location.href = targetUrl;
  })();
</script>

<noscript>
  <p>Please enable JavaScript or select your language:</p>
  <ul>
    <li><a href="{{ '/en/' | relative_url }}">English</a></li>
    <li><a href="{{ '/es/' | relative_url }}">Español</a></li>
  </ul>
</noscript>

<div style="text-align: center; padding: 4rem 2rem;">
  <p>Redirecting to your preferred language...</p>
  <p style="margin-top: 2rem;">
    <a href="{{ '/en/' | relative_url }}">English</a> |
    <a href="{{ '/es/' | relative_url }}">Español</a>
  </p>
</div>
