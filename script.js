document.addEventListener("DOMContentLoaded", () => {
  // Збір інформації про браузер
  const browserInfo = {
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    language: navigator.language
  };
  localStorage.setItem("browserInfo", JSON.stringify(browserInfo));
  const infoDiv = document.getElementById("localStorage-data");
  infoDiv.innerText = "Дані браузера: " + JSON.stringify(browserInfo, null, 2);

  // Відгуки
  fetch("https://jsonplaceholder.typicode.com/posts/10/comments")
    .then(res => res.json())
    .then(data => {
      const section = document.getElementById("comments-section");
      const h2 = document.createElement("h2");
      h2.innerText = "Відгуки роботодавців";
      section.appendChild(h2);
      data.forEach(comment => {
        const p = document.createElement("p");
        p.innerHTML = `<b>${comment.name}</b> (${comment.email}):<br>${comment.body}`;
        section.appendChild(p);
      });
    });

  // Модальне вікно
  setTimeout(() => {
    document.getElementById("feedback-modal").classList.remove("hidden");
  }, 60000);

  document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("feedback-modal").classList.add("hidden");
  });

  // ===== Темна / світла тема =====
  const switcher = document.getElementById("theme-switch");

  function applyTheme(isDark) {
    document.body.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
    if (switcher) switcher.checked = isDark;
  }

  function isNightTime() {
    const hour = new Date().getHours();
    return hour < 7 || hour >= 21;
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    applyTheme(savedTheme === "dark");
  } else {
    applyTheme(isNightTime());
  }

  if (switcher) {
    switcher.addEventListener("change", () => {
      applyTheme(switcher.checked);
    });
  }
});

