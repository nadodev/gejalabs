import { Link, usePage } from "@inertiajs/react";
import { FlaskConical, Globe, Github, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (
          options: {
            autoDisplay: boolean;
            includedLanguages: string;
            pageLanguage: string;
          },
          element: string,
        ) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const links = [
  { to: "/", label: "INICIO", match: (url: string) => url === "/" },
  { to: "/about", label: "SOBRE", match: (url: string) => url.startsWith("/about") },
  { to: "/experiments", label: "PROJETOS", match: (url: string) => url.startsWith("/experiments") },
  { to: "/knowledge", label: "EXPERIENCIAS", match: (url: string) => url.startsWith("/knowledge") },
  { to: "/blog", label: "BLOG", match: (url: string) => url.startsWith("/blog") },
] as const;

const googleTranslateElementId = "google_translate_element";
const googleTranslateScriptId = "google-translate-script";
type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const storedTheme = window.localStorage.getItem("theme");

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.classList.toggle("light", theme === "light");
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem("theme", theme);
}

function getGoogleTranslateSelect() {
  return document.querySelector<HTMLSelectElement>(".goog-te-combo");
}

function getCurrentGoogleTranslateLanguage(): "pt" | "en" {
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith("googtrans="))
    ?.split("=")[1];

  return cookie?.endsWith("/en") ? "en" : "pt";
}

function setGoogleTranslateCookie(language: "pt" | "en") {
  const value = language === "pt" ? "" : `/pt/${language}`;
  const expires = language === "pt" ? "Thu, 01 Jan 1970 00:00:00 GMT" : "";
  const hostParts = window.location.hostname.split(".");
  const domains = [window.location.hostname];

  if (hostParts.length > 1) {
    domains.push(`.${hostParts.slice(-2).join(".")}`);
  }

  for (const domain of domains) {
    document.cookie = `googtrans=${value}; path=/; domain=${domain}; expires=${expires}`;
  }

  document.cookie = `googtrans=${value}; path=/; expires=${expires}`;
}

function protectTechnicalLabels() {
  const selectors = [
    ".notranslate",
    "[data-no-translate]",
    "code",
    "pre",
  ];

  document.querySelectorAll<HTMLElement>(selectors.join(",")).forEach((element) => {
    element.classList.add("notranslate");
    element.setAttribute("translate", "no");
  });
}

export function Navbar() {
  const { url } = usePage();
  const [selectedLanguage, setSelectedLanguage] = useState<"pt" | "en">(() =>
    getCurrentGoogleTranslateLanguage(),
  );
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [url]);

  useEffect(() => {
    const currentLanguage = getCurrentGoogleTranslateLanguage();
    setSelectedLanguage(currentLanguage);

    if (currentLanguage === "en") {
      protectTechnicalLabels();
    }

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate) {
        return;
      }

      new window.google.translate.TranslateElement(
        {
          autoDisplay: false,
          includedLanguages: "pt,en",
          pageLanguage: "pt",
        },
        googleTranslateElementId,
      );

      setSelectedLanguage(getCurrentGoogleTranslateLanguage());
    };

    if (!document.getElementById(googleTranslateScriptId)) {
      const script = document.createElement("script");
      script.id = googleTranslateScriptId;
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate) {
      window.googleTranslateElementInit();
    }
  }, []);

  function handleLanguageChange(language: "pt" | "en", attempts = 0) {
    setSelectedLanguage(language);
    setGoogleTranslateCookie(language);

    if (language === "pt") {
      window.location.reload();
      return;
    }

    protectTechnicalLabels();

    const translateSelect = getGoogleTranslateSelect();

    if (!translateSelect) {
      if (attempts < 10) {
        setTimeout(() => handleLanguageChange(language, attempts + 1), 400);
      }

      return;
    }

    translateSelect.value = language === "pt" ? "" : language;
    translateSelect.dispatchEvent(new Event("change"));
  }

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/60 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-5">
        <Link href="/" className="notranslate group flex items-center gap-2.5" translate="no">
          <span className="grid size-8 place-items-center border border-primary/40 bg-surface text-primary shadow-neon">
            <FlaskConical className="size-4" />
          </span>
          <span className="font-display text-lg font-700 tracking-tight">
            GEJA<span className="text-primary">LABS</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const isActive = link.match(url);

              return (
                <li key={link.to}>
                  <Link
                    href={link.to}
                    className={`px-2.5 py-2 font-mono text-[0.65rem] tracking-widest transition-colors hover:bg-surface hover:text-foreground xl:px-3 ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div id={googleTranslateElementId} className="google-translate-anchor" aria-hidden="true" />
          <div className="hidden items-center gap-1 rounded-full border border-border bg-surface px-1.5 py-1 sm:flex">
            <button
              type="button"
              onClick={() => handleLanguageChange("pt")}
              className={`rounded-full px-2.5 py-1 text-[0.65rem] font-mono tracking-widest transition-colors hover:bg-background hover:text-foreground ${
                selectedLanguage === "pt" ? "bg-background text-primary" : "text-muted-foreground"
              }`}
              aria-label="Usar portugues"
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange("en")}
              className={`rounded-full px-2.5 py-1 text-[0.65rem] font-mono tracking-widest transition-colors hover:bg-background hover:text-foreground ${
                selectedLanguage === "en" ? "bg-background text-primary" : "text-muted-foreground"
              }`}
              aria-label="Traduzir para ingles"
            >
              EN
            </button>
            <span className="grid size-7 place-items-center rounded-full bg-background text-muted-foreground">
              <Globe className="size-3.5" />
            </span>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Usar tema claro" : "Usar tema escuro"}
            className="grid size-9 place-items-center border border-border bg-surface text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <a
            href="https://github.com/nadodev"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden size-9 place-items-center border border-border bg-surface text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary sm:grid"
          >
            <Github className="size-4" />
          </a>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            className="grid size-9 place-items-center border border-border bg-surface text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary lg:hidden"
          >
            {isMobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen ? (
        <div id="mobile-navigation" className="border-t border-border/70 bg-background/95 shadow-panel backdrop-blur-xl lg:hidden">
          <div className="mx-auto max-w-6xl px-4 py-4">
            <ul className="grid gap-2">
              {links.map((link) => {
                const isActive = link.match(url);

                return (
                  <li key={link.to}>
                    <Link
                      href={link.to}
                      className={`flex items-center justify-between border border-border bg-surface/50 px-4 py-3 font-mono text-xs tracking-widest transition-colors hover:border-primary/50 hover:text-primary ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                      <span className={isActive ? "text-primary" : "text-muted-foreground"}>/{link.to === "/" ? "home" : link.to.replace("/", "")}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 grid grid-cols-[1fr_auto_auto] items-center gap-2">
              <div className="flex items-center justify-between rounded-full border border-border bg-surface px-1.5 py-1">
                <button
                  type="button"
                  onClick={() => handleLanguageChange("pt")}
                  className={`rounded-full px-3 py-1.5 text-[0.65rem] font-mono tracking-widest transition-colors hover:bg-background hover:text-foreground ${
                    selectedLanguage === "pt" ? "bg-background text-primary" : "text-muted-foreground"
                  }`}
                  aria-label="Usar portugues"
                >
                  PT
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange("en")}
                  className={`rounded-full px-3 py-1.5 text-[0.65rem] font-mono tracking-widest transition-colors hover:bg-background hover:text-foreground ${
                    selectedLanguage === "en" ? "bg-background text-primary" : "text-muted-foreground"
                  }`}
                  aria-label="Traduzir para ingles"
                >
                  EN
                </button>
                <span className="grid size-8 place-items-center rounded-full bg-background text-muted-foreground">
                  <Globe className="size-3.5" />
                </span>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Usar tema claro" : "Usar tema escuro"}
                className="grid size-10 place-items-center border border-border bg-surface text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </button>
              <a
                href="https://github.com/nadodev"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid size-10 place-items-center border border-border bg-surface text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Github className="size-4" />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
