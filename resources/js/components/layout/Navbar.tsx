import { Link, usePage } from "@inertiajs/react";
import { FlaskConical, Globe, Github } from "lucide-react";
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
  { to: "/", label: "HOME", match: (url: string) => url === "/" },
  { to: "/about", label: "ABOUT", match: (url: string) => url.startsWith("/about") },
  { to: "/experiments", label: "PROJECTS", match: (url: string) => url.startsWith("/experiments") },
  { to: "/knowledge", label: "KNOWLEDGE", match: (url: string) => url.startsWith("/knowledge") },
] as const;

const googleTranslateElementId = "google_translate_element";
const googleTranslateScriptId = "google-translate-script";

function getGoogleTranslateSelect() {
  return document.querySelector<HTMLSelectElement>(".goog-te-combo");
}

function getCurrentGoogleTranslateLanguage(): "pt" | "en" {
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith("googtrans="))
    ?.split("=")[1];

  return cookie?.endsWith("/pt") ? "pt" : "en";
}

function setGoogleTranslateCookie(language: "pt" | "en") {
  const value = language === "en" ? "" : `/en/${language}`;
  const expires = language === "en" ? "Thu, 01 Jan 1970 00:00:00 GMT" : "";
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
    "header",
    ".mono-label",
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

  useEffect(() => {
    const currentLanguage = getCurrentGoogleTranslateLanguage();
    setSelectedLanguage(currentLanguage);

    if (currentLanguage === "pt") {
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
          pageLanguage: "en",
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

    if (language === "en") {
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

    translateSelect.value = language === "en" ? "" : language;
    translateSelect.dispatchEvent(new Event("change"));
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/60 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
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
                    translate="no"
                    className={`notranslate px-2.5 py-2 font-mono text-[0.65rem] tracking-widest transition-colors hover:bg-surface hover:text-foreground xl:px-3 ${
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
          <div className="flex items-center gap-1 rounded-full border border-border bg-surface px-1.5 py-1">
            <button
              type="button"
              onClick={() => handleLanguageChange("pt")}
              className={`rounded-full px-2.5 py-1 text-[0.65rem] font-mono tracking-widest transition-colors hover:bg-background hover:text-foreground ${
                selectedLanguage === "pt" ? "bg-background text-primary" : "text-muted-foreground"
              }`}
              aria-label="Traduzir para portugues"
            >
              PT
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange("en")}
              className={`rounded-full px-2.5 py-1 text-[0.65rem] font-mono tracking-widest transition-colors hover:bg-background hover:text-foreground ${
                selectedLanguage === "en" ? "bg-background text-primary" : "text-muted-foreground"
              }`}
              aria-label="Translate to English"
            >
              EN
            </button>
            <span className="grid size-7 place-items-center rounded-full bg-background text-muted-foreground">
              <Globe className="size-3.5" />
            </span>
          </div>
          <a
            href="https://github.com/nadodev"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid size-9 place-items-center border border-border bg-surface text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <Github className="size-4" />
          </a>
        </div>
      </nav>
    </header>
  );
}
