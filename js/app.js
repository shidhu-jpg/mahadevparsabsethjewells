(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const inr = n => "₹" + Math.round(n).toLocaleString("en-IN");
  const rateOf = p => ({ "24K": RATES.gold24, "22K": RATES.gold22, "18K": RATES.gold18, silver: RATES.silver }[p]);
  const label = p => (p === "silver" ? "Silver" : p + " Gold");
  const waLink = msg => `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(msg)}`;

  // Price breakup for a product at today's rate
  function price(p) {
    const metal = rateOf(p.purity) * p.weight;
    const making = metal * (p.making / 100);
    const stone = p.stone || 0;
    const gst = (metal + making + stone) * GST;
    return { metal, making, stone, gst, total: metal + making + stone + gst };
  }

  // Store details
  document.querySelectorAll("[data-store]").forEach(el => (el.textContent = STORE[el.dataset.store]));
  $("#year").textContent = new Date().getFullYear();
  const hello = `Namaste ${STORE.short}, I'd like to know more about your jewellery.`;
  ["#headerWa", "#contactWa", "#waFloat"].forEach(id => ($(id).href = waLink(hello)));
  $("#bridalWa").href = waLink(`Namaste ${STORE.short}, I'd like to book a bridal jewellery appointment.`);
  const tel = "tel:" + STORE.phone.replace(/\s/g, "");
  $("#telLink").href = tel;
  $("#contactCall").href = tel;
  $("#mailLink").href = "mailto:" + STORE.email;
  $("#map").src = `https://www.google.com/maps?q=${encodeURIComponent(STORE.mapQuery)}&output=embed`;

  // Rates
  const rateRows = [["24K Gold (999)", RATES.gold24], ["22K Gold (916)", RATES.gold22], ["18K Gold (750)", RATES.gold18], ["Silver (999)", RATES.silver]];
  $("#ratebar").innerHTML = `<div class="ratebar-track">${Array(2).fill(
    rateRows.map(([n, r]) => `<span>${n} <b>${inr(r)}/g</b></span>`).join("") + `<span>Updated ${RATES.updated}</span>`
  ).join("")}</div>`;
  $("#rateUpdated").textContent = RATES.updated;
  $("#rateTable").innerHTML = rateRows.map(([n, r]) =>
    `<tr><td>${n}</td><td>${inr(r)}<small>/g</small></td><td>${inr(r * 10)}<small>/10g</small></td></tr>`).join("");

  // Calculator
  function calc() {
    const p = $("#cPurity").value, w = +$("#cWeight").value || 0, m = +$("#cMaking").value || 0;
    const r = price({ purity: p, weight: w, making: m });
    $("#calcOut").innerHTML = `
      <div><span>Metal (${w} g × ${inr(rateOf(p))})</span><b>${inr(r.metal)}</b></div>
      <div><span>Making charges (${m}%)</span><b>${inr(r.making)}</b></div>
      <div><span>GST (3%)</span><b>${inr(r.gst)}</b></div>
      <div class="total"><span>Estimated total</span><b>${inr(r.total)}</b></div>`;
  }
  ["#cPurity", "#cWeight", "#cMaking"].forEach(id => $(id).addEventListener("input", calc));
  calc();

  // Categories
  $("#cats").innerHTML = CATEGORIES.map(c => {
    const n = PRODUCTS.filter(p => p.cat === c.id).length;
    return `<a class="cat" href="#catalogue" data-cat="${c.id}">
      <img src="${c.img}" alt="${c.name}" loading="lazy">
      <span><b>${c.name}</b><small>${n} designs</small></span></a>`;
  }).join("");

  // Catalogue
  let active = "all";
  function renderFilters() {
    $("#filters").innerHTML = [{ id: "all", name: "All" }, ...CATEGORIES]
      .map(c => `<button class="chip${c.id === active ? " on" : ""}" data-f="${c.id}">${c.name}</button>`).join("");
  }
  function renderGrid() {
    const list = PRODUCTS.filter(p => active === "all" || p.cat === active);
    $("#grid").innerHTML = list.map(p => `
      <article class="card" data-id="${p.id}" tabindex="0">
        <div class="card-img">
          <img src="${p.img}" alt="${p.name}" loading="lazy">
          ${p.tag ? `<span class="tag">${p.tag}</span>` : ""}
        </div>
        <div class="card-body">
          <small>${label(p.purity)} · ${p.weight} g</small>
          <h3>${p.name}</h3>
          <p class="price">${inr(price(p).total)} <span>approx.</span></p>
        </div>
      </article>`).join("");
  }
  function setFilter(id) { active = id; renderFilters(); renderGrid(); }
  $("#filters").addEventListener("click", e => { const b = e.target.closest("[data-f]"); if (b) setFilter(b.dataset.f); });
  $("#cats").addEventListener("click", e => { const c = e.target.closest("[data-cat]"); if (c) setFilter(c.dataset.cat); });
  setFilter("all");

  // Product modal
  const modal = $("#modal");
  function openProduct(id) {
    const p = PRODUCTS.find(x => x.id === +id);
    const r = price(p);
    $("#mImg").src = p.img; $("#mImg").alt = p.name;
    $("#mTitle").textContent = p.name;
    $("#mPurity").textContent = `${label(p.purity)} · ${p.weight} g`;
    $("#mBreak").innerHTML = `
      <tr><td>Metal value</td><td>${inr(r.metal)}</td></tr>
      <tr><td>Making (${p.making}%)</td><td>${inr(r.making)}</td></tr>
      ${r.stone ? `<tr><td>Stones</td><td>${inr(r.stone)}</td></tr>` : ""}
      <tr><td>GST (3%)</td><td>${inr(r.gst)}</td></tr>
      <tr class="total"><td>Estimated price</td><td>${inr(r.total)}</td></tr>`;
    $("#mWa").href = waLink(`Namaste ${STORE.short}, I'm interested in "${p.name}" (${label(p.purity)}, ${p.weight} g, est. ${inr(r.total)}). Is it available?`);
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeModal() { modal.hidden = true; document.body.style.overflow = ""; }
  $("#grid").addEventListener("click", e => { const c = e.target.closest(".card"); if (c) openProduct(c.dataset.id); });
  $("#grid").addEventListener("keydown", e => { const c = e.target.closest(".card"); if (c && e.key === "Enter") openProduct(c.dataset.id); });
  $("#modalX").addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  // Header + mobile menu
  const header = $("#header"), nav = $("#nav"), burger = $("#burger");
  addEventListener("scroll", () => header.classList.toggle("solid", scrollY > 40), { passive: true });
  burger.addEventListener("click", () => { nav.classList.toggle("open"); burger.classList.toggle("x"); });
  nav.addEventListener("click", e => { if (e.target.tagName === "A") { nav.classList.remove("open"); burger.classList.remove("x"); } });

  // Reveal on scroll
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll(".head, .cat, .card, .bridal-copy, .bridal-pics, .rate-card, .calc, .about-img, .about-copy, .contact-in")
    .forEach(el => { el.classList.add("reveal"); io.observe(el); });
})();
