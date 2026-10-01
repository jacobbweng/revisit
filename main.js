/* Change the contact email here. */
const CONFIG = { email: "revisit.atl@gmail.com" };
(function () {
  document.querySelectorAll("[data-email]").forEach(el => el.textContent = CONFIG.email);
  document.querySelectorAll("[data-email-link]").forEach(el => el.href = "mailto:" + CONFIG.email);
  const pages = [...document.querySelectorAll("[data-page]")];
  const titles = { home: "Revisit", solutions: "Solutions · Revisit", contact: "Contact · Revisit", privacy: "Privacy · Revisit", terms: "Terms · Revisit" };
  const menu = document.getElementById("mobileMenu"), menuBtn = document.getElementById("menuBtn");
  const setMenu = o => { menu.hidden = !o; menuBtn.setAttribute("aria-expanded", String(o)); menuBtn.textContent = o ? "Close" : "Menu"; };
  menuBtn.addEventListener("click", () => setMenu(menu.hidden));
  function route() {
    let id = (location.hash || "#home").slice(1); if (!titles[id]) id = "home";
    pages.forEach(p => p.hidden = p.dataset.page !== id);
    document.querySelectorAll("[data-nav]").forEach(a => a.dataset.nav === id ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
    document.title = titles[id]; setMenu(false); window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route); route();
  document.addEventListener("click", e => { const a = e.target.closest('a[href^="#"]'); if (a && a.getAttribute("href") === location.hash) { setMenu(false); window.scrollTo(0, 0); } });

  const form = document.getElementById("contactForm"), done = document.getElementById("formSuccess");
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function setErr(i, m) { const f = i.closest(".f"), s = f.querySelector(".msg"); f.classList.toggle("err", !!m); if (s) { s.textContent = m || ""; s.hidden = !m; } i.setAttribute("aria-invalid", m ? "true" : "false"); }
  function check(i) { const v = i.value.trim(); if (!v) { setErr(i, i.tagName === "SELECT" ? "Select one." : "Required."); return false; } if (i.type === "email" && !emailRe.test(v)) { setErr(i, "Enter a valid email."); return false; } setErr(i, ""); return true; }
  form.querySelectorAll("[required]").forEach(i => { i.addEventListener("change", () => check(i)); i.addEventListener("input", () => { if (i.closest(".f").classList.contains("err")) check(i); }); });
  form.addEventListener("submit", e => {
    e.preventDefault();
    const req = [...form.querySelectorAll("[required]")];
    if (!req.map(check).every(Boolean)) { req.find(i => i.getAttribute("aria-invalid") === "true")?.focus(); return; }
    /* To connect a backend, POST Object.fromEntries(new FormData(form)) here. */
    form.hidden = true; done.hidden = false;
  });
  document.getElementById("formReset").addEventListener("click", () => { form.reset(); form.querySelectorAll("[required]").forEach(i => setErr(i, "")); done.hidden = true; form.hidden = false; });
  const copyBtn = document.getElementById("copyEmail");
  copyBtn.addEventListener("click", () => {
    const reset = () => setTimeout(() => copyBtn.textContent = "Copy", 1500);
    const fallback = () => { const r = document.createRange(); r.selectNodeContents(document.querySelector(".mail [data-email]")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); copyBtn.textContent = "Selected"; reset(); };
    try { navigator.clipboard.writeText(CONFIG.email).then(() => { copyBtn.textContent = "Copied"; reset(); }, fallback); } catch (_) { fallback(); }
  });
})();
