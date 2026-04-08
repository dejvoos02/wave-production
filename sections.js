/**
 * sections.js
 * Handles Music grid, Tour list, Videos grid, and modal interactions.
 */

// ─── DATA ─────────────────────────────────────────────────────────

const ALBUMS = [
    {
        id: 1,
        title: 'From Zero (Deluxe Edition)',
        date: '16 MAY 2025',
        type: 'albums',
        cover: 'resources/p1.webp',
        tracks: 19,
        time: '34 MIN',
        label: 'LOREM RECORDS / IPSUM SHOP',
        youtubeUrl: 'https://www.youtube.com',
        listenUrl: '#',
        tracklist: [
            { n: 1, name: 'From Zero', dur: '00:22' },
            { n: 2, name: 'The Emptiness Machine', dur: '03:10' },
            { n: 3, name: 'Cut the Bridge', dur: '03:48' },
            { n: 4, name: 'Heavy is the Crown', dur: '02:47' },
            { n: 5, name: 'Over Each Other', dur: '02:50' },
            { n: 6, name: 'Casualty', dur: '02:20' },
            { n: 7, name: 'Overflow', dur: '03:31' },
            { n: 8, name: 'Two Faced', dur: '03:03' },
            { n: 9, name: 'Stained', dur: '02:55' },
            { n: 10, name: 'More the Victim', dur: '03:19' },
            { n: 11, name: 'Good Things Go', dur: '03:45' },
            { n: 12, name: 'Up From the Bottom', dur: '03:22' },
        ]
    },
    {
        id: 2,
        title: 'From Zero',
        date: '15 NOV 2024',
        type: 'albums',
        cover: 'resources/p2.jpg',
        tracks: 11,
        time: '37 MIN',
        label: 'LOREM RECORDS / IPSUM SHOP',
        youtubeUrl: 'https://www.youtube.com',
        listenUrl: '#',
        tracklist: [
            { n: 1, name: 'From Zero', dur: '00:22' },
            { n: 2, name: 'The Emptiness Machine', dur: '03:10' },
            { n: 3, name: 'Cut the Bridge', dur: '03:48' },
            { n: 4, name: 'Heavy is the Crown', dur: '02:47' },
            { n: 5, name: 'Over Each Other', dur: '02:50' },
            { n: 6, name: 'Casualty', dur: '02:20' },
            { n: 7, name: 'Overflow', dur: '03:31' },
            { n: 8, name: 'Two Faced', dur: '03:03' },
            { n: 9, name: 'Stained', dur: '02:55' },
            { n: 10, name: 'More the Victim', dur: '03:19' },
            { n: 11, name: 'Good Things Go', dur: '03:45' },
        ]
    },
    {
        id: 3,
        title: 'Papercuts',
        date: '12 APR 2024',
        type: 'albums',
        cover: 'resources/p3.jpg',
        tracks: 12,
        time: '45 MIN',
        label: 'LOREM RECORDS',
        youtubeUrl: 'https://www.youtube.com',
        listenUrl: '#',
        tracklist: [
            { n: 1, name: 'Lorem Ipsum', dur: '03:24' },
            { n: 2, name: 'Dolor Sit Amet', dur: '04:12' },
            { n: 3, name: 'Consectetur', dur: '03:55' },
            { n: 4, name: 'Adipiscing Elit', dur: '02:47' },
            { n: 5, name: 'Sed Do Eiusmod', dur: '03:31' },
        ]
    },
    {
        id: 4,
        title: 'Lost Demos',
        date: '07 APR 2023',
        type: 'albums',
        cover: 'resources/p4.jpg',
        tracks: 14,
        time: '52 MIN',
        label: 'LOREM RECORDS',
        youtubeUrl: 'https://www.youtube.com',
        listenUrl: '#',
        tracklist: [
            { n: 1, name: 'Lorem Ipsum Demo', dur: '02:44' },
            { n: 2, name: 'Dolor Demo', dur: '03:10' },
            { n: 3, name: 'Consectetur Raw', dur: '04:02' },
            { n: 4, name: 'Adipiscing Uncut', dur: '03:55' },
            { n: 5, name: 'Eiusmod Tempor', dur: '03:18' },
        ]
    },
    {
        id: 5,
        title: 'Meteora (20th Anniversary)',
        date: '07 APR 2023',
        type: 'albums',
        cover: 'resources/p5.jpg',
        tracks: 13,
        time: '36 MIN',
        label: 'LOREM RECORDS',
        youtubeUrl: 'https://www.youtube.com',
        listenUrl: '#',
        tracklist: [
            { n: 1, name: 'Foreword', dur: '00:13' },
            { n: 2, name: 'Don\'t Stay', dur: '03:07' },
            { n: 3, name: 'Somewhere I Belong', dur: '03:33' },
            { n: 4, name: 'Lying From You', dur: '02:55' },
            { n: 5, name: 'Hit the Floor', dur: '02:45' },
            { n: 6, name: 'Easier to Run', dur: '03:24' },
        ]
    },
    {
        id: 6,
        title: 'Hybrid Theory (20th Anniversary)',
        date: '09 OCT 2020',
        type: 'albums',
        cover: 'resources/p1.webp',
        tracks: 11,
        time: '37 MIN',
        label: 'LOREM RECORDS',
        youtubeUrl: 'https://www.youtube.com',
        listenUrl: '#',
        tracklist: [
            { n: 1, name: 'Papercut', dur: '03:04' },
            { n: 2, name: 'One Step Closer', dur: '02:35' },
            { n: 3, name: 'With You', dur: '03:23' },
            { n: 4, name: 'Points of Authority', dur: '03:20' },
            { n: 5, name: 'Crawling', dur: '03:29' },
            { n: 6, name: 'Runaway', dur: '03:03' },
            { n: 7, name: 'By Myself', dur: '03:09' },
            { n: 8, name: 'In the End', dur: '03:36' },
        ]
    },
    {
        id: 7,
        title: 'One More Light',
        date: '19 MAY 2017',
        type: 'albums',
        cover: 'resources/p2.jpg',
        tracks: 10,
        time: '34 MIN',
        label: 'LOREM RECORDS',
        youtubeUrl: 'https://www.youtube.com',
        listenUrl: '#',
        tracklist: [
            { n: 1, name: 'Nobody Can Save Me', dur: '03:24' },
            { n: 2, name: 'Good Goodbye', dur: '02:51' },
            { n: 3, name: 'Talking to Myself', dur: '03:38' },
            { n: 4, name: 'Battle Symphony', dur: '04:17' },
        ]
    },
    {
        id: 8,
        title: 'Live in Texas',
        date: '15 AUG 2003',
        type: 'live',
        cover: 'resources/p3.jpg',
        tracks: 12,
        time: '55 MIN',
        label: 'LOREM LIVE RECORDINGS',
        youtubeUrl: 'https://www.youtube.com',
        listenUrl: '#',
        tracklist: [
            { n: 1, name: 'Papercut (Live)', dur: '03:10' },
            { n: 2, name: 'One Step Closer (Live)', dur: '02:50' },
            { n: 3, name: 'Crawling (Live)', dur: '03:38' },
        ]
    },
    {
        id: 9,
        title: 'The Emptiness Machine (Single)',
        date: '05 SEP 2024',
        type: 'eps',
        cover: 'resources/p4.jpg',
        tracks: 2,
        time: '7 MIN',
        label: 'LOREM RECORDS',
        youtubeUrl: 'https://www.youtube.com',
        listenUrl: '#',
        tracklist: [
            { n: 1, name: 'The Emptiness Machine', dur: '03:10' },
            { n: 2, name: 'The Emptiness Machine (Instrumental)', dur: '03:10' },
        ]
    },
    {
        id: 10,
        title: 'Heavy Is The Crown (Single)',
        date: '10 OCT 2024',
        type: 'eps',
        cover: 'resources/p5.jpg',
        tracks: 1,
        time: '3 MIN',
        label: 'LOREM RECORDS',
        youtubeUrl: 'https://www.youtube.com',
        listenUrl: '#',
        tracklist: [
            { n: 1, name: 'Heavy Is The Crown', dur: '02:47' },
        ]
    },
    {
        id: 11,
        title: 'Living Things',
        date: '26 JUN 2012',
        type: 'albums',
        cover: 'resources/p3.jpg',
        tracks: 12,
        time: '42 MIN',
        label: 'LOREM RECORDS',
        youtubeUrl: 'https://www.youtube.com',
        listenUrl: '#',
        tracklist: [
            { n: 1, name: 'Lost in the Echo', dur: '03:43' },
            { n: 2, name: 'In My Remains', dur: '03:44' },
            { n: 3, name: 'Burn It Down', dur: '03:50' },
            { n: 4, name: 'Lies Greed Misery', dur: '02:35' },
        ]
    },
    {
        id: 12,
        title: 'A Thousand Suns',
        date: '14 SEP 2010',
        type: 'albums',
        cover: 'resources/p4.jpg',
        tracks: 15,
        time: '48 MIN',
        label: 'LOREM RECORDS',
        youtubeUrl: 'https://www.youtube.com',
        listenUrl: '#',
        tracklist: [
            { n: 1, name: 'The Requiem', dur: '01:39' },
            { n: 2, name: 'The Radiance', dur: '01:53' },
            { n: 3, name: 'Burning in the Skies', dur: '04:14' },
            { n: 4, name: 'Empty Spaces', dur: '00:21' },
            { n: 5, name: 'When They Come for Me', dur: '04:56' },
        ]
    },
];

const TOUR_DATES = [
    { city: 'STOCKHOLM', country: 'SWEDEN', venue: '3ARENA', date: '29 MAY 2026', support: 'LOREM & IPSUM BAND', hasVip: true },
    { city: 'HAMBURG', country: 'GERMANY', venue: 'VOLKSPARKSTADION', date: '01 JUN 2026', support: 'LOREM & IPSUM BAND', hasVip: true },
    { city: 'HAMBURG', country: 'GERMANY', venue: 'VOLKSPARKSTADION', date: '03 JUN 2026', support: 'LOREM & IPSUM BAND', hasVip: true },
    { city: 'NÜRBURG', country: 'GERMANY', venue: 'ROCK AM RING', date: '05 JUN 2026', support: null, hasVip: false },
    { city: 'NUREMBERG', country: 'GERMANY', venue: 'ROCK IM PARK', date: '07 JUN 2026', support: null, hasVip: false },
    { city: 'VIENNA', country: 'AUSTRIA', venue: 'ERNST HAPPEL STADION', date: '10 JUN 2026', support: 'LOREM & IPSUM BAND', hasVip: true },
    { city: 'BUDAPEST', country: 'HUNGARY', venue: 'PUSKAS ARENA', date: '12 JUN 2026', support: 'LOREM & IPSUM BAND', hasVip: true },
    { city: 'PRAGUE', country: 'CZECH REPUBLIC', venue: 'O2 ARENA', date: '14 JUN 2026', support: 'LOREM BAND', hasVip: true },
    { city: 'WARSAW', country: 'POLAND', venue: 'PGE NARODOWY', date: '17 JUN 2026', support: 'LOREM & IPSUM BAND', hasVip: true },
    { city: 'BERLIN', country: 'GERMANY', venue: 'OLYMPIASTADION', date: '20 JUN 2026', support: null, hasVip: false },
    { city: 'AMSTERDAM', country: 'NETHERLANDS', venue: 'ZIGGO DOME', date: '23 JUN 2026', support: 'LOREM BAND', hasVip: true },
    { city: 'PARIS', country: 'FRANCE', venue: 'STADE DE FRANCE', date: '27 JUN 2026', support: 'LOREM & IPSUM BAND', hasVip: true },
];

const VIDEOS = [
    { title: 'The Emptiness Machine', sub: 'OFFICIAL MUSIC VIDEO', thumb: 'resources/p1.webp', url: 'https://www.youtube.com' },
    { title: 'Heavy is the Crown', sub: 'OFFICIAL MUSIC VIDEO', thumb: 'resources/p2.jpg', url: 'https://www.youtube.com' },
    { title: 'Up From the Bottom', sub: 'OFFICIAL MUSIC VIDEO', thumb: 'resources/p3.jpg', url: 'https://www.youtube.com' },
    { title: 'Two Faced', sub: 'OFFICIAL LYRIC VIDEO', thumb: 'resources/p4.jpg', url: 'https://www.youtube.com' },
    { title: 'Lost in the Echo', sub: 'OFFICIAL MUSIC VIDEO', thumb: 'resources/p5.jpg', url: 'https://www.youtube.com' },
    { title: 'Live at World Tour', sub: 'LIVE PERFORMANCE', thumb: 'resources/p1.webp', url: 'https://www.youtube.com' },
];

// ─── MUSIC GRID ───────────────────────────────────────────────────

function renderMusicGrid(filter = 'all') {
    const grid = document.getElementById('musicGrid');
    const filtered = filter === 'all' ? ALBUMS : ALBUMS.filter(a => a.type === filter);

    grid.innerHTML = filtered.map(album => `
        <div class="music-card reveal" data-id="${album.id}" onclick="openModal(${album.id})">
            <img class="music-card-img" src="${album.cover}" alt="${album.title}" loading="lazy">
            <div class="music-card-info">
                <div class="music-card-title">${album.title}</div>
                <div class="music-card-meta">${album.date} &bull; ${album.type.toUpperCase()}</div>
            </div>
        </div>
    `).join('');

    // Trigger reveal animations
    requestAnimationFrame(() => {
        grid.querySelectorAll('.reveal').forEach((el, i) => {
            setTimeout(() => el.classList.add('visible'), i * 60);
        });
    });
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderMusicGrid(btn.dataset.filter);
    });
});

// ─── MODAL ────────────────────────────────────────────────────────

function openModal(id) {
    const album = ALBUMS.find(a => a.id === id);
    if (!album) return;

    const tracklist = album.tracklist.map(t => `
        <div class="track-row">
            <span class="track-num">${t.n}</span>
            <span class="track-name">${t.name}</span>
            <span class="track-dur">${t.dur}</span>
        </div>
    `).join('');

    document.getElementById('modalContent').innerHTML = `
        <img class="modal-cover" src="${album.cover}" alt="${album.title}">
        <div class="modal-right">
            <div class="modal-title">${album.title}</div>
            <div class="modal-date">${album.date} &bull; ${album.type.toUpperCase()}</div>
            <div class="modal-stats">
                TRACKS: ${album.tracks} &nbsp;|&nbsp; TIME: ${album.time}<br>
                ${album.label}
            </div>
            <div class="modal-actions">
                <a class="btn-primary" href="${album.listenUrl}" target="_blank">BUY / LISTEN</a>
                <a class="btn-watch" href="${album.youtubeUrl}" target="_blank">WATCH</a>
            </div>
            <div class="modal-tracklist">
                ${tracklist}
            </div>
        </div>
    `;

    document.getElementById('albumModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('albumModal').classList.remove('open');
    document.body.style.overflow = '';
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('albumModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

// ─── TOUR LIST ────────────────────────────────────────────────────

function renderTour() {
    const list = document.getElementById('tourList');
    list.innerHTML = TOUR_DATES.map(show => `
        <div class="tour-row reveal">
            <div class="tour-info">
                <div class="tour-city">
                    ${show.city}, ${show.country}
                    <span class="tour-city-venue">${show.venue}</span>
                </div>
                <div class="tour-date">${show.date}</div>
                ${show.support ? `<div class="tour-support"><strong>WITH</strong>${show.support}</div>` : ''}
            </div>
            <div class="tour-buttons">
                ${show.hasVip ? `<button class="btn-vip">VIP</button>` : ''}
                <button class="btn-tickets">TICKETS</button>
            </div>
        </div>
    `).join('');
}

// ─── VIDEOS GRID ──────────────────────────────────────────────────

function renderVideos() {
    const grid = document.getElementById('videosGrid');
    grid.innerHTML = VIDEOS.map(v => `
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

// ─── SCROLL REVEAL ────────────────────────────────────────────────

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

function observeReveals() {
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
}

// ─── ACTIVE NAV LINK ─────────────────────────────────────────────

const sections = ['hero', 'music', 'tour', 'videos', 'archive', 'lpu', 'store', 'about'];
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { threshold: 0.3 });

sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
});

// ─── INIT ─────────────────────────────────────────────────────────

renderMusicGrid('all');
renderTour();
renderVideos();

// Wait a tick for DOM to populate, then observe
requestAnimationFrame(() => {
    observeReveals();
});