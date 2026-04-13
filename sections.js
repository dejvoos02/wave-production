/**
 * sections.js
 * Wave Production — NEWS, WAVE, TBF, LIVE, ARCHIVE, STORE, ABOUT
 */

// ─── DATA ─────────────────────────────────────────────────────────

// News — stored in localStorage so admin can add posts without a backend
const NEWS_STORAGE_KEY = 'wp_news_posts';

const NEWS_DEFAULTS = [
    {
        id: 1,
        title: 'Wave Production spouští nový web',
        category: 'UPDATE',
        date: '13 APR 2026',
        image: 'resources/p1.webp',
        body: 'Vítejte na novém webu Wave Production. Najdete zde novinky, přehled eventů, profily DJs z TBF kolektivu a náš e-shop s merch.'
    },
    {
        id: 2,
        title: 'TBF Night vol. 12 — Hronov',
        category: 'EVENT',
        date: '05 APR 2026',
        image: 'resources/p2.jpg',
        body: 'Dvanáctý díl naší pravidelné série TBF Night se koná 24. května v Hronově. Na line-upu jsou MEZLIK, Keth, neo Beck a host večera MackFire.'
    },
    {
        id: 3,
        title: 'Nový mix od DJ Dlabac Jan',
        category: 'RELEASE',
        date: '28 MAR 2026',
        image: 'resources/p3.jpg',
        body: 'Hodinový set nahraný live na TBF Night vol. 11 je nyní dostupný ke stažení a poslechu. Čistý techno groove s bassline přesahy.'
    },
];

const TBF_DJS = [
    { id: 1,  name: 'NYTA',        genre: 'BASS / CLUB',       bio: 'Originální zvuk na pomezí bass music a UK clubu. Pravidelná tvář TBF lineupů.',              img: null },
    { id: 2,  name: 'BRTN',        genre: 'TECHNO',            bio: 'Industriální techno s důrazem na hypnotické groovy a syrový zvuk.',                          img: null },
    { id: 3,  name: 'FLY',         genre: 'DNB / JUNGLE',      bio: 'Drum and bass a jungle veterán. Archiv setů sahá přes deset let zpět.',                      img: null },
    { id: 4,  name: 'H4N3S',       genre: 'HARD TECHNO',       bio: 'Hard techno a trance přesahy. Energetické sety s pečlivě budovaným ARC.',                    img: null },
    { id: 5,  name: 'KETH',        genre: 'BASS HOUSE',        bio: 'Bass house a UK funky — taneční energie kombinovaná s hlubokou spodkem.',                    img: null },
    { id: 6,  name: 'KUBIS',       genre: 'MINIMAL / DEEP',    bio: 'Minimalistický deep techno přístup. Dlouhé hypnotické sety stavěné na atmosféru.',           img: null },
    { id: 7,  name: 'MACKFIRE',    genre: 'NEURO / DNB',       bio: 'Neurofunk a techstep — agresivní spodek, přesná práce s rytmikou.',                          img: null },
    { id: 8,  name: 'MEZLIK',      genre: 'TECHNO / INDUSTRIAL',bio: 'Industrial techno s darkwave prvky. Jeden z nejaktivnějších hráčů v kolektivu.',             img: null },
    { id: 9,  name: 'MIND CONTROL',genre: 'PSYTRANCE',         bio: 'Psychedelický trance a goa. Transové sety s důrazem na cestu, ne cíl.',                      img: null },
    { id: 10, name: 'NEO BECK',    genre: 'ELECTRO / EBM',     bio: 'Electro a EBM tradice přenesená do současnosti. Temné, brutální, přesné.',                   img: null },
    { id: 11, name: 'PEDRICK',     genre: 'CLUB / EXPERIMENTAL',bio: 'Experimentální club sound — neočekávané kombinace žánrů pod jednou střechou.',              img: null },
    { id: 12, name: 'SHARD',       genre: 'AMBIENT / MODULAR', bio: 'Ambientní a modulární krajiny. Živé sety na pomezí instalace a performance.',                img: null },
];

const TBF_EVENTS = [
    { title: 'TBF NIGHT VOL. 12', venue: 'Hronov', date: '24 MAY 2026', lineup: 'MEZLIK, KETH, NEO BECK, MACKFIRE', ticketsUrl: '#' },
    { title: 'TBF OPEN AIR',      venue: 'Náchod', date: '12 JUL 2026', lineup: 'FULL CREW',                        ticketsUrl: '#' },
    { title: 'TBF NIGHT VOL. 13', venue: 'Hronov', date: '20 SEP 2026', lineup: 'TBA',                              ticketsUrl: '#' },
];

const TBF_MIXES = [
    { title: 'DJ DLABAC JAN — TBF NIGHT 11 LIVE SET', duration: '58:22', date: 'MAR 2026', url: '#', thumb: 'resources/p1.webp' },
    { title: 'MEZLIK — INDUSTRIAL SERIES EP.4',        duration: '45:10', date: 'FEB 2026', url: '#', thumb: 'resources/p2.jpg'  },
    { title: 'KETH — BASS HOUSE MIX VOL.2',            duration: '62:04', date: 'JAN 2026', url: '#', thumb: 'resources/p3.jpg'  },
    { title: 'H4N3S — HARD TECHNO PROMO',              duration: '30:18', date: 'DEC 2025', url: '#', thumb: 'resources/p4.jpg'  },
    { title: 'BRTN — LIVE AT TBF OPEN AIR',            duration: '74:33', date: 'AUG 2025', url: '#', thumb: 'resources/p5.jpg'  },
    { title: 'MIND CONTROL — PSYCHEDELIC JOURNEY',     duration: '88:00', date: 'JUL 2025', url: '#', thumb: 'resources/p1.webp' },
];

const LIVE_VODS = [
    { title: 'TBF NIGHT VOL. 11 — FULL STREAM', sub: 'LIVE RECORDING', thumb: 'resources/p1.webp', url: '#' },
    { title: 'DJ DLABAC JAN — STUDIO SESSION',  sub: 'LIVE PERFORMANCE', thumb: 'resources/p2.jpg',  url: '#' },
    { title: 'TBF OPEN AIR 2025 HIGHLIGHTS',    sub: 'LIVE RECORDING',   thumb: 'resources/p3.jpg',  url: '#' },
];

const ARCHIVE_PHOTOS = [
    { src: 'resources/p1.webp', caption: 'TBF Night vol. 11 — Hronov, březen 2026' },
    { src: 'resources/p2.jpg',  caption: 'TBF Open Air 2025 — Náchod'              },
    { src: 'resources/p3.jpg',  caption: 'Studio Session — DJ Dlabac Jan'          },
    { src: 'resources/p4.jpg',  caption: 'TBF Night vol. 10 — Hronov'              },
    { src: 'resources/p5.jpg',  caption: 'Wave Production setup — Hronov 2024'     },
    { src: 'resources/p1.webp', caption: 'MEZLIK live set — December 2025'         },
    { src: 'resources/p2.jpg',  caption: 'H4N3S & KETH b2b — TBF Night vol. 9'    },
    { src: 'resources/p3.jpg',  caption: 'Wave Production gear — backstage 2025'   },
];

const ARCHIVE_VIDEOS = [
    { title: 'TBF NIGHT VOL. 11 AFTERMOVIE',    sub: 'OFFICIAL VIDEO',   thumb: 'resources/p1.webp', url: '#' },
    { title: 'MEZLIK — INDUSTRIAL SERIES EP.4',  sub: 'SET RECORDING',    thumb: 'resources/p2.jpg',  url: '#' },
    { title: 'TBF OPEN AIR 2025 AFTERMOVIE',     sub: 'OFFICIAL VIDEO',   thumb: 'resources/p3.jpg',  url: '#' },
    { title: 'DJ DLABAC JAN — STUDIO SESSION',   sub: 'PERFORMANCE',      thumb: 'resources/p4.jpg',  url: '#' },
    { title: 'WAVE PRODUCTION — TEASER 2026',    sub: 'PROMO',            thumb: 'resources/p5.jpg',  url: '#' },
    { title: 'KETH — BASS HOUSE MIX VISUAL',     sub: 'MUSIC VIDEO',      thumb: 'resources/p1.webp', url: '#' },
];

const STORE_ITEMS = [
    { id: 1, name: 'WAVE LOGO TEE',          category: 'tshirts',     price: 490,  size: ['S','M','L','XL','XXL'], img: 'resources/p1.webp', desc: 'Unisex černé tričko s minimalistickým Wave Production logem na hrudi. 100% bavlna, gramáž 180g.' },
    { id: 2, name: 'TBF CLASSIC TEE',        category: 'tshirts',     price: 490,  size: ['S','M','L','XL'],       img: 'resources/p2.jpg',  desc: 'The Bassline Fanatiqz tričko s full-back potiskem. Limitovaná série, vysoká gramáž.' },
    { id: 3, name: 'WAVE HOODIE',            category: 'hoodies',     price: 990,  size: ['S','M','L','XL','XXL'], img: 'resources/p3.jpg',  desc: 'Mikina s kapucí, přední kapsou a výšivkou Wave Production na hrudi. 300g french terry.' },
    { id: 4, name: 'TBF CREWNECK',           category: 'hoodies',     price: 890,  size: ['S','M','L','XL'],       img: 'resources/p4.jpg',  desc: 'Crewneck s TBF kolektivním potiskem na zádech. Oversized střih.' },
    { id: 5, name: 'WAVE TOTE BAG',          category: 'accessories', price: 290,  size: null,                     img: 'resources/p5.jpg',  desc: 'Plátěná taška 38×42cm s Wave Production potiskem. Pevná rukojeť, přírodní bavlna.' },
    { id: 6, name: 'TBF STICKER PACK',       category: 'accessories', price: 120,  size: null,                     img: 'resources/p1.webp', desc: 'Sada 6 samolepek TBF kolektivu. Voděodolný vinyl, různé velikosti.' },
];

// ─── NEWS ─────────────────────────────────────────────────────────

function getNewsPosts() {
    try {
        const stored = localStorage.getItem(NEWS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [...NEWS_DEFAULTS];
    } catch {
        return [...NEWS_DEFAULTS];
    }
}

function saveNewsPosts(posts) {
    try { localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(posts)); } catch {}
}

function renderNews() {
    const grid  = document.getElementById('newsGrid');
    if (!grid) return;
    const posts = getNewsPosts();
    if (!posts.length) {
        grid.innerHTML = '<p class="section-placeholder">Žádné příspěvky.</p>';
        return;
    }
    grid.innerHTML = posts.map((p, i) => `
        <article class="news-card reveal ${i === 0 ? 'news-card--featured' : ''}" onclick="openNewsPost(${p.id})">
            ${p.image ? `<div class="news-card-img-wrap"><img src="${p.image}" alt="${p.title}" loading="lazy" class="news-card-img"></div>` : ''}
            <div class="news-card-body">
                <span class="news-card-category">${p.category}</span>
                <h3 class="news-card-title">${p.title}</h3>
                <p class="news-card-excerpt">${p.body.substring(0, 120)}${p.body.length > 120 ? '…' : ''}</p>
                <span class="news-card-date">${p.date}</span>
            </div>
        </article>
    `).join('');
    observeReveals();
}

function openNewsPost(id) {
    const posts = getNewsPosts();
    const post  = posts.find(p => p.id === id);
    if (!post) return;
    // Reuse album modal as news detail modal
    // Reuse djModal — albumModal/modalContent don't exist in HTML
    const contentEl = document.getElementById('djModalContent');
    const modalEl   = document.getElementById('djModal');
    if (!contentEl || !modalEl) return;
    contentEl.innerHTML = `
        <div class="news-detail">
            ${post.image ? `<img src="${post.image}" alt="${post.title}" class="news-detail-img">` : ''}
            <div class="news-detail-body">
                <span class="news-card-category">${post.category}</span>
                <h2 class="news-detail-title">${post.title}</h2>
                <span class="news-card-date">${post.date}</span>
                <p class="news-detail-text">${post.body}</p>
            </div>
        </div>
    `;
    modalEl.classList.add('open');
    document.body.style.overflow = 'hidden';
}

// Admin panel — visible when URL contains ?admin=1
function initNewsAdmin() {
    const admin = document.getElementById('newsAdmin');
    if (!admin) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') !== '1') { admin.style.display = 'none'; return; }

    document.getElementById('newsPublishBtn').addEventListener('click', () => {
        const title    = document.getElementById('newsInputTitle').value.trim();
        const category = document.getElementById('newsInputCategory').value.trim().toUpperCase() || 'NEWS';
        const image    = document.getElementById('newsInputImage').value.trim() || null;
        const body     = document.getElementById('newsInputBody').value.trim();
        if (!title || !body) { alert('Vyplňte nadpis a text.'); return; }

        const posts = getNewsPosts();
        const newPost = {
            id:       Date.now(),
            title,
            category,
            date:     new Date().toLocaleDateString('cs-CZ', { day:'2-digit', month:'short', year:'numeric' }).toUpperCase(),
            image,
            body
        };
        posts.unshift(newPost);
        saveNewsPosts(posts);
        renderNews();
        document.getElementById('newsInputTitle').value    = '';
        document.getElementById('newsInputCategory').value = '';
        document.getElementById('newsInputImage').value    = '';
        document.getElementById('newsInputBody').value     = '';
    });
}

// ─── TBF ──────────────────────────────────────────────────────────

function renderCrew() {
    const grid = document.getElementById('crewGrid');
    if (!grid) return;
    grid.innerHTML = TBF_DJS.map(dj => `
        <div class="crew-card reveal" onclick="openDjModal(${dj.id})">
            <div class="crew-card-avatar">${dj.name.charAt(0)}</div>
            <div class="crew-card-info">
                <div class="crew-card-name">${dj.name}</div>
                <div class="crew-card-genre">${dj.genre}</div>
            </div>
        </div>
    `).join('');
}

function openDjModal(id) {
    const dj = TBF_DJS.find(d => d.id === id);
    if (!dj) return;
    document.getElementById('djModalContent').innerHTML = `
        <div class="dj-detail">
            <div class="dj-detail-avatar">${dj.name.charAt(0)}</div>
            <div class="dj-detail-info">
                <div class="modal-title">${dj.name}</div>
                <div class="modal-date">${dj.genre}</div>
                <p class="dj-detail-bio">${dj.bio}</p>
                <div class="modal-actions">
                    <a class="btn-primary" href="#" target="_blank">SOUNDCLOUD</a>
                    <a class="btn-primary" href="#" target="_blank">INSTAGRAM</a>
                </div>
            </div>
        </div>
    `;
    document.getElementById('djModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function renderTbfEvents() {
    const list = document.getElementById('tbfEventsList');
    if (!list) return;
    list.innerHTML = TBF_EVENTS.map(ev => `
        <div class="tbf-event-row reveal">
            <div class="tour-info">
                <div class="tour-city">${ev.title} <span class="tour-city-venue">${ev.venue}</span></div>
                <div class="tour-date">${ev.date}</div>
                <div class="tour-support"><strong>LINE-UP</strong>${ev.lineup}</div>
            </div>
            <div class="tour-buttons">
                <a href="${ev.ticketsUrl}" class="btn-tickets">LÍSTKY</a>
            </div>
        </div>
    `).join('');
}

function renderTbfMixes() {
    const grid = document.getElementById('tbfMixesGrid');
    if (!grid) return;
    grid.innerHTML = TBF_MIXES.map(m => `
        <div class="video-card reveal" onclick="window.open('${m.url}', '_blank')">
            <img class="video-card-thumb" src="${m.thumb}" alt="${m.title}" loading="lazy">
            <div class="video-play-icon">&#9654;</div>
            <div class="video-card-label">
                <div class="video-card-title">${m.title}</div>
                <div class="video-card-sub">${m.date} &bull; ${m.duration}</div>
            </div>
        </div>
    `).join('');
}

// TBF sub-nav tabs
document.querySelectorAll('.tbf-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tbf-nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tbf-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = document.getElementById('tbf' + btn.dataset.tbf.charAt(0).toUpperCase() + btn.dataset.tbf.slice(1));
        if (panel) { panel.classList.add('active'); observeReveals(); }
    });
});

// DJ modal close
document.getElementById('djModalClose').addEventListener('click', () => {
    document.getElementById('djModal').classList.remove('open');
    document.body.style.overflow = '';
});
document.getElementById('djModal').addEventListener('click', function(e) {
    if (e.target === this) { this.classList.remove('open'); document.body.style.overflow = ''; }
});

// ─── LIVE / TWITCH ────────────────────────────────────────────────

const TWITCH_CHANNEL = 'thebasslinefanatiqscz';
const NEXT_STREAM    = new Date('2026-05-24T21:00:00');

function initLive() {
    renderLiveVods();
    initCountdown();
    checkTwitchLive();

    document.getElementById('watchLiveBtn').addEventListener('click', openTwitchOverlay);
    document.getElementById('twitchCloseBtn').addEventListener('click', closeTwitchOverlay);
}

function openTwitchOverlay() {
    const overlay = document.getElementById('twitchOverlay');
    const iframe  = document.getElementById('twitchEmbed');
    const domain  = window.location.hostname || 'localhost';
    iframe.src = `https://player.twitch.tv/?channel=${TWITCH_CHANNEL}&parent=${domain}&autoplay=true`;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeTwitchOverlay() {
    const overlay = document.getElementById('twitchOverlay');
    const iframe  = document.getElementById('twitchEmbed');
    iframe.src = '';
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function checkTwitchLive() {
    // Visual indicator — full live check requires Twitch API (server-side token)
    // Shows pulsing dot as placeholder; replace with actual API call when backend is ready
    const dot = document.getElementById('liveStatusDot');
    if (dot) dot.classList.add('live-pulse');
}

function initCountdown() {
    const el      = document.getElementById('liveCountdown');
    const nameEl  = document.getElementById('liveNextName');
    if (!el) return;
    if (nameEl) nameEl.textContent = NEXT_STREAM.toLocaleDateString('cs-CZ', { day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' });

    function tick() {
        const diff = NEXT_STREAM - Date.now();
        if (diff <= 0) { el.textContent = 'PRÁVĚ TEĎ'; return; }
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        el.textContent = `${d}D ${String(h).padStart(2,'0')}H ${String(m).padStart(2,'0')}M ${String(s).padStart(2,'0')}S`;
    }
    tick();
    setInterval(tick, 1000);
}

function renderLiveVods() {
    const grid = document.getElementById('liveVodsGrid');
    if (!grid) return;
    grid.innerHTML = LIVE_VODS.map(v => `
        <div class="video-card reveal" onclick="window.open('${v.url}', '_blank')">
            <img class="video-card-thumb" src="${v.thumb}" alt="${v.title}" loading="lazy">
            <div class="video-play-icon">&#9654;</div>
            <div class="video-card-label">
                <div class="video-card-title">${v.title}</div>
                <div class="video-card-sub">${v.sub}</div>
            </div>
        </div>
    `).join('');
}

// ─── ARCHIVE ──────────────────────────────────────────────────────

function renderArchivePhotos() {
    const grid = document.getElementById('archivePhotoGrid');
    if (!grid) return;
    grid.innerHTML = ARCHIVE_PHOTOS.map((p, i) => `
        <div class="archive-photo reveal" onclick="openLightbox(${i})">
            <img src="${p.src}" alt="${p.caption}" loading="lazy" class="archive-photo-img">
            <div class="archive-photo-caption">${p.caption}</div>
        </div>
    `).join('');
}

function renderArchiveVideos() {
    const grid = document.getElementById('archiveVideoGrid');
    if (!grid) return;
    grid.innerHTML = ARCHIVE_VIDEOS.map(v => `
        <div class="video-card reveal" onclick="window.open('${v.url}', '_blank')">
            <img class="video-card-thumb" src="${v.thumb}" alt="${v.title}" loading="lazy">
            <div class="video-play-icon">&#9654;</div>
            <div class="video-card-label">
                <div class="video-card-title">${v.title}</div>
                <div class="video-card-sub">${v.sub}</div>
            </div>
        </div>
    `).join('');
}

function openLightbox(index) {
    const photo = ARCHIVE_PHOTOS[index];
    document.getElementById('lightboxImg').src       = photo.src;
    document.getElementById('lightboxCaption').textContent = photo.caption;
    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
}

document.getElementById('lightboxClose').addEventListener('click', () => {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
});
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this || e.target === document.getElementById('lightboxImg')) return;
    this.classList.remove('open');
    document.body.style.overflow = '';
});

// Archive sub-nav tabs
document.querySelectorAll('[data-archive]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('[data-archive]').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.archive-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const id = btn.dataset.archive === 'photos' ? 'archivePhotos' : 'archiveVideos';
        document.getElementById(id).classList.add('active');
        observeReveals();
    });
});

// ─── STORE ────────────────────────────────────────────────────────

function renderStore(filter = 'all') {
    const grid    = document.getElementById('storeGrid');
    if (!grid) return;
    const items   = filter === 'all' ? STORE_ITEMS : STORE_ITEMS.filter(i => i.category === filter);
    grid.innerHTML = items.map(item => `
        <div class="store-card reveal" onclick="openProductModal(${item.id})">
            <div class="store-card-img-wrap">
                <img src="${item.img}" alt="${item.name}" loading="lazy" class="store-card-img">
            </div>
            <div class="store-card-info">
                <div class="store-card-name">${item.name}</div>
                <div class="store-card-price">${item.price} Kč</div>
            </div>
        </div>
    `).join('');
    observeReveals();
}

function openProductModal(id) {
    const item = STORE_ITEMS.find(i => i.id === id);
    if (!item) return;
    const sizePicker = item.size
        ? `<div class="product-sizes">${item.size.map(s => `<button class="size-btn">${s}</button>`).join('')}</div>`
        : '';
    document.getElementById('productModalContent').innerHTML = `
        <img class="modal-cover" src="${item.img}" alt="${item.name}">
        <div class="modal-right">
            <div class="modal-title">${item.name}</div>
            <div class="modal-date">${item.category.toUpperCase()}</div>
            <div class="modal-stats">${item.price} Kč</div>
            <p class="product-desc">${item.desc}</p>
            ${sizePicker}
            <div class="modal-actions">
                <button class="btn-primary" onclick="alert('E-shop bude spuštěn brzy.')">PŘIDAT DO KOŠÍKU</button>
            </div>
        </div>
    `;
    document.getElementById('productModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

document.getElementById('productModalClose').addEventListener('click', () => {
    document.getElementById('productModal').classList.remove('open');
    document.body.style.overflow = '';
});
document.getElementById('productModal').addEventListener('click', function(e) {
    if (e.target === this) { this.classList.remove('open'); document.body.style.overflow = ''; }
});

// Store filter
document.querySelectorAll('[data-store]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('[data-store]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderStore(btn.dataset.store);
    });
});

// ─── SHARED: MODAL CLOSE ──────────────────────────────────────────
// albumModal/modalClose don't exist in HTML — safely skip if missing

const _modalClose = document.getElementById('modalClose');
const _albumModal = document.getElementById('albumModal');
if (_modalClose && _albumModal) {
    _modalClose.addEventListener('click', () => {
        _albumModal.classList.remove('open');
        document.body.style.overflow = '';
    });
    _albumModal.addEventListener('click', function(e) {
        if (e.target === this) { this.classList.remove('open'); document.body.style.overflow = ''; }
    });
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        ['albumModal','djModal','productModal','lightbox','twitchOverlay'].forEach(id => {
            const el = document.getElementById(id);
            if (el && (el.classList.contains('open') || el.classList.contains('active'))) {
                el.classList.remove('open');
                el.classList.remove('active');
                if (id === 'twitchOverlay') document.getElementById('twitchEmbed').src = '';
                document.body.style.overflow = '';
            }
        });
    }
});

// ─── SCROLL REVEAL ────────────────────────────────────────────────

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.08 });

function observeReveals() {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
}

// ─── ACTIVE NAV ───────────────────────────────────────────────────

const NAV_SECTIONS = ['hero','news','wave','tbf','live','archive','store','about'];
const navLinks     = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { threshold: 0.25 });

NAV_SECTIONS.forEach(id => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
});

// ─── INIT ─────────────────────────────────────────────────────────

renderNews();
initNewsAdmin();
renderCrew();
renderTbfEvents();
renderTbfMixes();
initLive();
renderArchivePhotos();
renderArchiveVideos();
renderStore('all');

requestAnimationFrame(observeReveals);