const menu = document.querySelector(".menu");
const mobile = document.querySelector(".mobile-nav");

menu?.addEventListener("click", () => {
  const isOpen = mobile?.classList.toggle("open") ?? false;
  menu.setAttribute("aria-expanded", String(isOpen));
});

mobile?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobile.classList.remove("open");
    menu?.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  }),
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

const form = document.querySelector("#project-form");
form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const status = form.querySelector(".form-status");
  const button = form.querySelector("button");
  const data = Object.fromEntries(new FormData(form).entries());

  if (status) status.textContent = "Sending your project brief…";
  if (button) button.disabled = true;

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Unable to send project brief");
    if (status) status.textContent = "Project brief sent. We’ll be in touch soon.";
    form.reset();
  } catch {
    if (status) status.textContent = "We couldn’t send that. Email alphanarrativepro@gmail.com instead.";
  } finally {
    if (button) button.disabled = false;
  }
});
