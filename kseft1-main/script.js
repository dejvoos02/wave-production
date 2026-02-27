/**
 * LIQUID REVEAL — script.js
 * WebGL fluid simulation for smooth image transitions.
 *
 * HOW IT WORKS:
 * 1. A real-time fluid simulation runs on the GPU (WebGL).
 * 2. Your mouse creates "splats" of velocity into the fluid field.
 * 3. The fluid spreads, swirls, and dissipates naturally.
 * 4. The fluid's density is used as a displacement mask to blend
 *    between two images — no hard edges, no canvas flashing.
 * 5. When enough fluid has been revealed (~70%), we auto-advance
 *    to the next image pair with a smooth fade.
 *
 * WHY THIS IS BETTER THAN YOUR OLD APPROACH:
 * - Old: Canvas 2D `destination-out` = hard erasing → flash on transition
 * - New: WebGL shaders = everything happens on GPU → buttery smooth
 */

// ─── CONFIGURATION ────────────────────────────────────────────────
const CONFIG = {
    SIM_RESOLUTION:       128,
    DYE_RESOLUTION:       512,
    DENSITY_DISSIPATION:  1.0,   // NO fading — revealed areas stay revealed permanently
    VELOCITY_DISSIPATION: 0.85,  // velocity still dissipates so motion feels natural
    PRESSURE_ITERATIONS:  8,
    SPLAT_RADIUS:         0.004,
    SPLAT_FORCE:          6000,
    REVEAL_THRESHOLD:     0.65,

    IMAGES: ['resources/p1.jpg', 'resources/p2.jpg', 'resources/p3.jpg', 'resources/p4.jpg']
};

// ─── CANVAS & WEBGL SETUP ─────────────────────────────────────────
const canvas = document.getElementById('c');
// Use window dimensions — canvas.clientWidth is 0 at script load time
// because CSS layout hasn't finished yet. window.innerWidth is always ready.
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

const gl = canvas.getContext('webgl', { alpha: false });
if (!gl) {
    alert('WebGL not supported in your browser. Try Chrome or Firefox.');
}

gl.getExtension('OES_texture_float');
gl.getExtension('OES_texture_float_linear');

// ─── SHADER COMPILATION HELPERS ───────────────────────────────────
function compileShader(type, src) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function createProgram(vertSrc, fragSrc) {
    const vert = compileShader(gl.VERTEX_SHADER,   vertSrc);
    const frag = compileShader(gl.FRAGMENT_SHADER, fragSrc);
    const prog  = gl.createProgram();
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(prog));
        return null;
    }

    // Auto-collect uniforms
    const uniforms = {};
    const count = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < count; i++) {
        const name = gl.getActiveUniform(prog, i).name;
        uniforms[name] = gl.getUniformLocation(prog, name);
    }
    return { program: prog, uniforms };
}

// Get shader source from <script> tags in the HTML
function shaderSrc(id) {
    return document.getElementById(id).textContent;
}

// ─── BUILD ALL PROGRAMS ───────────────────────────────────────────
const vertSrc = shaderSrc('vertShader');

const programs = {
    advection:        createProgram(vertSrc, shaderSrc('fragAdvection')),
    divergence:       createProgram(vertSrc, shaderSrc('fragDivergence')),
    pressure:         createProgram(vertSrc, shaderSrc('fragPressure')),
    gradientSubtract: createProgram(vertSrc, shaderSrc('fragGradientSubtract')),
    splat:            createProgram(vertSrc, shaderSrc('fragSplat')),
    display:          createProgram(vertSrc, shaderSrc('fragDisplay')),
};

// ─── FULLSCREEN QUAD GEOMETRY ─────────────────────────────────────
// A simple rectangle covering the entire viewport — all effects are drawn onto this
const quadBuf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, -1,1, 1,1, 1,-1]), gl.STATIC_DRAW);
const quadIdx = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, quadIdx);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2, 0,2,3]), gl.STATIC_DRAW);

function drawQuad(target) {
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, quadIdx);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);
    if (target) {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    } else {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
}

// ─── FRAMEBUFFER HELPERS ──────────────────────────────────────────
function createFBO(w, h) {
    const tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.FLOAT, null);
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return {
        fbo, tex, width: w, height: h,
        texelX: 1.0 / w, texelY: 1.0 / h,
        attach(slot) {
            gl.activeTexture(gl.TEXTURE0 + slot);
            gl.bindTexture(gl.TEXTURE_2D, tex);
            return slot;
        }
    };
}

// Double FBO: we ping-pong between two buffers so we can read & write simultaneously
function createDoubleFBO(w, h) {
    let a = createFBO(w, h);
    let b = createFBO(w, h);
    return {
        width: w, height: h,
        texelX: 1.0 / w, texelY: 1.0 / h,
        read: () => a,
        write: () => b,
        swap() { [a, b] = [b, a]; }
    };
}

// ─── SIMULATION BUFFERS ───────────────────────────────────────────
function getRes(target) {
    const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
    const a = aspect < 1 ? 1 / aspect : aspect;
    const min = Math.round(target);
    const max = Math.round(target * a);
    return gl.drawingBufferWidth > gl.drawingBufferHeight
        ? { w: max, h: min }
        : { w: min, h: max };
}

let simRes = getRes(CONFIG.SIM_RESOLUTION);
let dyeRes = getRes(CONFIG.DYE_RESOLUTION);

let velocity  = createDoubleFBO(simRes.w, simRes.h);
let dye       = createDoubleFBO(dyeRes.w, dyeRes.h);
let divergence = createFBO(simRes.w, simRes.h);
let pressure  = createDoubleFBO(simRes.w, simRes.h);

// ─── IMAGE TEXTURES ───────────────────────────────────────────────
// Loads a JPG/PNG from disk into a WebGL texture.
// Shows a black placeholder pixel instantly, then swaps in the real image once loaded.
function loadImageTexture(url) {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    // Placeholder: 1×1 black pixel so the shader has something to sample immediately
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA,
                  gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
    const img = new Image();
    img.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    };
    img.onerror = () => console.error('Failed to load image:', url);
    img.src = url;
    return tex;
}

// Build image textures from your resources/ folder
const imageTextures = CONFIG.IMAGES.map(loadImageTexture);

function bindImageTexture(tex, slot) {
    gl.activeTexture(gl.TEXTURE0 + slot);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    return slot;
}

// ─── IMAGE CYCLING STATE ──────────────────────────────────────────
let currentImageIdx = 0;
let nextImageIdx    = 1;
let blendFactor     = 0;       // 0 = fully current image, 1 = fully next image
let isTransitioning = false;
let transitionStart = 0;
const TRANSITION_DURATION = 1200; // ms for the auto-fade portion

// ─── POINTER / MOUSE STATE ────────────────────────────────────────
const pointer = {
    x: 0.5 * canvas.width,
    y: 0.5 * canvas.height,
    dx: 0, dy: 0,
    moved: false
};

// ─── FLUID SPLAT ──────────────────────────────────────────────────
function addSplat(x, y, dx, dy, color) {
    const p = programs.splat;
    gl.useProgram(p.program);

    // Splat into velocity field
    gl.uniform1i(p.uniforms.u_target, velocity.read().attach(0));
    gl.uniform1f(p.uniforms.u_ratio, canvas.width / canvas.height);
    gl.uniform2f(p.uniforms.u_point, x / canvas.width, 1.0 - y / canvas.height);
    gl.uniform3f(p.uniforms.u_color, dx, -dy, 0);
    gl.uniform1f(p.uniforms.u_radius, CONFIG.SPLAT_RADIUS);
    drawQuad(velocity.write());
    velocity.swap();

    // Splat into dye field (this becomes the visual mask)
    gl.uniform1i(p.uniforms.u_target, dye.read().attach(0));
    gl.uniform3f(p.uniforms.u_color, color.r, color.g, color.b);
    drawQuad(dye.write());
    dye.swap();
}

// ─── MAIN SIMULATION STEP ─────────────────────────────────────────
let lastTime = performance.now();

function step(dt) {
    const p = programs;

    // 1. Advect velocity (move the velocity field along itself)
    gl.useProgram(p.advection.program);
    gl.uniform2f(p.advection.uniforms.u_texel, velocity.texelX, velocity.texelY);
    gl.uniform2f(p.advection.uniforms.u_dyeTexel, velocity.texelX, velocity.texelY);
    gl.uniform1i(p.advection.uniforms.u_velocity, velocity.read().attach(0));
    gl.uniform1i(p.advection.uniforms.u_source,   velocity.read().attach(0));
    gl.uniform1f(p.advection.uniforms.u_dt, dt);
    gl.uniform1f(p.advection.uniforms.u_dissipation, CONFIG.VELOCITY_DISSIPATION);
    drawQuad(velocity.write());
    velocity.swap();

    // 2. Advect dye (move the visual fluid along the velocity)
    gl.uniform2f(p.advection.uniforms.u_texel, velocity.texelX, velocity.texelY);
    gl.uniform2f(p.advection.uniforms.u_dyeTexel, dye.texelX, dye.texelY);
    gl.uniform1i(p.advection.uniforms.u_velocity, velocity.read().attach(0));
    gl.uniform1i(p.advection.uniforms.u_source,   dye.read().attach(1));
    gl.uniform1f(p.advection.uniforms.u_dissipation, CONFIG.DENSITY_DISSIPATION);
    drawQuad(dye.write());
    dye.swap();

    // 3. Compute divergence (necessary for incompressible fluid physics)
    gl.useProgram(p.divergence.program);
    gl.uniform2f(p.divergence.uniforms.u_texel, velocity.texelX, velocity.texelY);
    gl.uniform1i(p.divergence.uniforms.u_velocity, velocity.read().attach(0));
    drawQuad(divergence);

    // 4. Solve pressure (iterative relaxation — makes fluid look "liquid")
    gl.useProgram(p.pressure.program);
    gl.uniform2f(p.pressure.uniforms.u_texel, velocity.texelX, velocity.texelY);
    gl.uniform1i(p.pressure.uniforms.u_divergence, divergence.attach(0));
    for (let i = 0; i < CONFIG.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(p.pressure.uniforms.u_pressure, pressure.read().attach(1));
        drawQuad(pressure.write());
        pressure.swap();
    }

    // 5. Subtract pressure gradient from velocity (keeps fluid incompressible)
    gl.useProgram(p.gradientSubtract.program);
    gl.uniform2f(p.gradientSubtract.uniforms.u_texel, velocity.texelX, velocity.texelY);
    gl.uniform1i(p.gradientSubtract.uniforms.u_pressure, pressure.read().attach(0));
    gl.uniform1i(p.gradientSubtract.uniforms.u_velocity, velocity.read().attach(1));
    drawQuad(velocity.write());
    velocity.swap();
}

// ─── REVEAL DETECTION ─────────────────────────────────────────────
// We can't easily read back the WebGL dye texture on every frame (expensive).
// Instead we track cumulative mouse movement as a proxy for "how much revealed".
let totalSplatEnergy = 0;
const ADVANCE_ENERGY  = 8000;

function checkAdvance() {
    if (isTransitioning) return;
    if (totalSplatEnergy > ADVANCE_ENERGY) {
        startTransition();
    }
}

function startTransition() {
    isTransitioning = true;
    transitionStart = performance.now();
}

function updateTransition(now) {
    if (!isTransitioning) return;
    const t = Math.min((now - transitionStart) / TRANSITION_DURATION, 1);
    blendFactor = t;

    if (t >= 1) {
        // Advance to next images
        currentImageIdx = nextImageIdx;
        nextImageIdx    = (nextImageIdx + 1) % imageTextures.length;
        blendFactor     = 0;
        isTransitioning = false;
        totalSplatEnergy = 0;

        // Clear the dye so the new image starts fresh
        clearDye();
    }
}

function clearDye() {
    gl.bindFramebuffer(gl.FRAMEBUFFER, dye.read().fbo);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bindFramebuffer(gl.FRAMEBUFFER, dye.write().fbo);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

// ─── RENDER LOOP ──────────────────────────────────────────────────
function render() {
    const now = performance.now();
    const dt  = Math.min((now - lastTime) / 1000, 0.016); // cap at 60fps equivalent
    lastTime  = now;

    // Apply mouse splat if moved
    if (pointer.moved) {
        const speed = Math.sqrt(pointer.dx * pointer.dx + pointer.dy * pointer.dy);
        // Color of the splat — we use white/light colors because our shader
        // uses the fluid density (sum of RGB) as the reveal mask
        addSplat(pointer.x, pointer.y,
            pointer.dx * CONFIG.SPLAT_FORCE * dt,
            pointer.dy * CONFIG.SPLAT_FORCE * dt,
            { r: 0.9, g: 0.85, b: 0.8 }
        );
        totalSplatEnergy += speed;
        pointer.moved = false;
        checkAdvance();
    }

    // Run fluid physics
    step(dt);

    // Handle auto-transition timing
    updateTransition(now);

    // Draw final output — blend images using fluid as mask
    const dp = programs.display;
    gl.useProgram(dp.program);
    gl.uniform1i(dp.uniforms.u_fluid,  dye.read().attach(0));
    gl.uniform1i(dp.uniforms.u_image0, bindImageTexture(imageTextures[currentImageIdx], 1));
    gl.uniform1i(dp.uniforms.u_image1, bindImageTexture(imageTextures[nextImageIdx],    2));
    gl.uniform1f(dp.uniforms.u_blend,  blendFactor);
    drawQuad(null); // draw to screen

    requestAnimationFrame(render);
}

// ─── INPUT HANDLING ───────────────────────────────────────────────
function onMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    pointer.dx = x - pointer.x;
    pointer.dy = y - pointer.y;
    pointer.x  = x;
    pointer.y  = y;
    pointer.moved = true;
}

function onTouchMove(e) {
    e.preventDefault();
    const t    = e.targetTouches[0];
    const rect = canvas.getBoundingClientRect();
    const x = t.clientX - rect.left;
    const y = t.clientY - rect.top;
    pointer.dx = x - pointer.x;
    pointer.dy = y - pointer.y;
    pointer.x  = x;
    pointer.y  = y;
    pointer.moved = true;
}

canvas.addEventListener('mousemove',  onMouseMove);
canvas.addEventListener('touchstart', e => { e.preventDefault(); onTouchMove(e); }, { passive: false });
canvas.addEventListener('touchmove',  onTouchMove, { passive: false });

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    simRes = getRes(CONFIG.SIM_RESOLUTION);
    dyeRes = getRes(CONFIG.DYE_RESOLUTION);
    velocity   = createDoubleFBO(simRes.w, simRes.h);
    dye        = createDoubleFBO(dyeRes.w, dyeRes.h);
    divergence = createFBO(simRes.w, simRes.h);
    pressure   = createDoubleFBO(simRes.w, simRes.h);
});

// ─── START ────────────────────────────────────────────────────────
render();