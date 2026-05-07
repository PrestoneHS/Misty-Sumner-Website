/**
 * components.js — Misty Sumner Website
 *
 * Fetches header.html and footer.html and injects them into every page.
 * To update the nav:    edit header.html
 * To update the footer: edit footer.html
 */

const COMPONENT_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
  :root {
    --navy:#1B2A4A; --navy-d:#111D33; --navy-l:#243560;
    --gold:#C9A84C; --gold-l:#E8C97A;
    --white:#FFFFFF; --off:#F7F4EF; --gray:#888; --light:#E0DDD7; --dgray:#3A3733;
  }
  #site-header {
    position:fixed; top:0; left:0; right:0; z-index:100;
    padding:14px 5%; display:flex; align-items:center;
    justify-content:space-between; transition:all 0.35s ease; background:transparent;
  }
  #site-header.scrolled {
    background:rgba(27,42,74,0.97); backdrop-filter:blur(12px);
    box-shadow:0 4px 30px rgba(0,0,0,0.15);
  }
  .nav-brand { display:flex; align-items:center; gap:10px; text-decoration:none; }
  .nav-photo { width:36px; height:36px; border-radius:50%; object-fit:cover; border:1.5px solid var(--gold); flex-shrink:0; }
  .nav-agent-info { display:flex; flex-direction:column; gap:1px; }
  .nav-logo { font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:600; color:var(--white); letter-spacing:0.5px; line-height:1; }
  .nav-logo span { color:var(--gold); }
  .nav-lic { font-size:9px; color:rgba(255,255,255,0.35); letter-spacing:0.5px; }
  .nav-links { display:flex; gap:28px; align-items:center; }
  .nav-links a { font-size:11px; font-weight:500; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,0.75); text-decoration:none; transition:color 0.2s; }
  .nav-links a:hover { color:var(--gold); }
  .nav-cta { background:var(--gold)!important; color:var(--navy)!important; padding:8px 18px; border-radius:2px; font-weight:600!important; }
  .nav-cta:hover { background:var(--gold-l)!important; }
  #site-footer { background:var(--navy-d); padding:40px 5%; border-top:1px solid rgba(255,255,255,0.06); }
  .footer-inner { max-width:1200px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px; }
  .footer-logo { font-family:'Cormorant Garamond',serif; font-size:18px; font-weight:600; color:var(--white); text-decoration:none; }
  .footer-logo span { color:var(--gold); }
  .footer-social { display:flex; gap:12px; }
  .footer-social-link { width:36px; height:36px; border-radius:50%; border:1px solid rgba(255,255,255,0.15); display:flex; align-items:center; justify-content:center; color:rgba(255,255,255,0.5); text-decoration:none; transition:all 0.2s; }
  .footer-social-link:hover { border-color:var(--gold); color:var(--gold); }
  .footer-legal { font-size:10px; color:rgba(255,255,255,0.3); letter-spacing:0.5px; line-height:1.6; text-align:right; }
  @media (max-width:768px) { .nav-links { display:none; } .footer-legal { text-align:left; } }
`;

// Inject shared CSS
const styleEl = document.createElement('style');
styleEl.textContent = COMPONENT_CSS;
document.head.appendChild(styleEl);

// Load and inject header.html
fetch('partials/header.html')
  .then(r => r.text())
  .then(html => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html.trim();
    const header = tmp.firstElementChild;
    document.body.insertBefore(header, document.body.firstChild);
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })
  .catch(e => console.warn('header.html not found:', e));

// Load and inject footer.html
fetch('partials/footer.html')
  .then(r => r.text())
  .then(html => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html.trim();
    document.body.appendChild(tmp.firstElementChild);
  })
  .catch(e => console.warn('footer.html not found:', e));
