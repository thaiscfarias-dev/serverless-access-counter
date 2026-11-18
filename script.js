// ==========================================
// CONFIGURAÇÃO DA API AWS
// ==========================================

// Preencher quando o API Gateway estiver pronto.
const API_URL = "";

// ==========================================
// ELEMENTOS DA PÁGINA
// ==========================================

const canvas = document.querySelector(".canvas");
const cosmicLetters = gsap.utils.toArray(".cosmic-container div");

const strawberry = document.querySelector(".strawberry-container p");
const comingSoon = document.querySelector(".coming-soon p");
const streak = document.querySelector(".streak");
const accessCounter = document.querySelector(".access-counter");

// ==========================================
// ANIMAÇÃO PRINCIPAL
// ==========================================

gsap.registerPlugin(SplitText);

const strawberryText = new SplitText(strawberry, {
  type: "chars",
});

// Animação das letras COSMIC

function addCosmic() {
  const timeline = gsap.timeline();

  timeline.from(cosmicLetters, {
    duration: 2,
    opacity: 0,
    left: 0,
    scale: 0,
    ease: "back.out(1.7)",
    stagger: 0.25,
  });

  return timeline;
}

// Animação da palavra STRAWBERRY

function addStrawberry() {
  const timeline = gsap.timeline();

  timeline.from(strawberryText.chars, {
    duration: 1.5,
    opacity: 0,
    top: 25,
    rotationY: 360,
    ease: "elastic.out(1, 0.4)",
    transformOrigin: "0% 10%",
    stagger: 0.1,
  });

  return timeline;
}

// Animação COMING SOON

function addComingSoon() {
  const timeline = gsap.timeline({
    delay: 0,
  });

  timeline.from(comingSoon, {
    duration: 1.5,
    opacity: 0,
    letterSpacing: 15,
    scale: 3,
    ease: "back.out(1.7)",
  });

  return timeline;
}

// Animação da estrela cadente

function shootingStar() {
  const timeline = gsap.timeline();

  const canvasWidth = canvas.clientWidth;
  const canvasHeight = canvas.clientHeight;

  const startX = canvasWidth / 2 + canvasWidth * 0.35;
  const distance = Math.min(canvasWidth, canvasHeight) * 0.9;

  gsap.set(streak, {
    left: startX,
    top: 0,
    scale: 0,
  });

  timeline.fromTo(
    streak,
    {
      left: startX,
      top: -150,
      scale: 1,
      autoAlpha: 1,
    },
    {
      duration: 1,
      left: startX - distance,
      top: distance,
      scale: 0,
      autoAlpha: 0,
      ease: "power1.inOut",
    },
  );

  return timeline;
}

// ==========================================
// CAMPO DE ESTRELAS
// ==========================================

function createStarField() {
  const maxStars = 1000;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < maxStars; i++) {
    const star = document.createElement("div");

    const size = Math.floor(Math.random() * 4 + 1);

    star.classList.add("star");

    star.style.left = Math.floor(Math.random() * canvas.clientWidth) + "px";

    star.style.top = Math.floor(Math.random() * canvas.clientHeight) + "px";

    star.style.opacity = Math.random();

    star.style.width = size + "px";
    star.style.height = size + "px";

    fragment.appendChild(star);
  }

  canvas.appendChild(fragment);

  const stars = gsap.utils.toArray(".star").slice(1, maxStars / 10);

  gsap.to(stars, {
    duration: 0.5,
    autoAlpha: 0,
    scale: 0,
    repeat: -1,
    yoyo: true,
    repeatDelay: 1,
    ease: "bounce.out",
    stagger: 0.15,
  });
}

// ==========================================
// CONTADOR DE ACESSOS
// ==========================================

// ==========================================
// CONTADOR DE ACESSOS
// ==========================================

// URL da API Gateway
// const API_URL = "";

// Identificador persistente do navegador
function getVisitorId() {
  const cookieName = "cosmic_visitor_id";

  const existingCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(cookieName + "="));

  if (existingCookie) {
    return existingCookie.split("=")[1];
  }

  const visitorId = crypto.randomUUID();

  document.cookie =
    `${cookieName}=${visitorId}; Max-Age=31536000; Path=/; SameSite=Lax` +
    (location.protocol === "https:" ? "; Secure" : "");

  return visitorId;
}

// Formata os números
function formatNumber(value) {
  return Number(value).toLocaleString("pt-BR");
}

// Consulta e registra o acesso
async function loadAccessCounter() {
  if (!API_URL) {
    console.warn("API Gateway ainda não configurada.");
    return;
  }

  try {
    const visitorId = getVisitorId();

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visitorId: visitorId,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Erro ao consultar contador");
    }

    const data = await response.json();

    document.getElementById("total-visits").textContent = formatNumber(
      data.totalVisits,
    );

    document.getElementById("unique-visitors").textContent = formatNumber(
      data.uniqueVisitors,
    );

    document.getElementById("returning-visits").textContent = formatNumber(
      data.returningVisits,
    );
  } catch (error) {
    console.error("Erro ao carregar estatísticas:", error);
  }
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================

createStarField();

const mainTimeline = gsap.timeline({
  repeat: -1,
  yoyo: true,
  repeatDelay: 5,
});

mainTimeline
  .add(addCosmic(), "start")
  .add(addStrawberry(), "start+=0.75")
  .add(shootingStar(), "start+=0.75")
  .add(addComingSoon());

mainTimeline.to(
  ".stats-section",
  {
    duration: 5,
    opacity: 1,
  },
  ">",
);

loadAccessCounter();
