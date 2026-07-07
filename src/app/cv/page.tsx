import type { Metadata } from "next";
import { PageHeader } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "CV",
  description: "Curriculum vitae — view online or download the PDF.",
};

export default function CvPage() {
  return (
    <main className="ruled-paper min-h-screen">
      <PageHeader current="/cv" />
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-mono text-3xl font-semibold text-ink">Curriculum Vitae</h1>
            <p className="mt-2 font-serif text-graphite">
              The formal record. Replace <code>public/cv.pdf</code> with your
              latest version and this page updates automatically.
            </p>
          </div>
          <a
            href="/cv.pdf"
            download
            className="border border-ink/40 bg-stickyYellow px-4 py-2 font-mono text-sm text-ink shadow-note hover:-translate-y-0.5 hover:shadow-noteLift focus-visible:outline focus-visible:outline-2 focus-visible:outline-string"
          >
            ⤓ Download PDF
          </a>
        </div>

        <div className="relative mt-8 bg-white p-2 shadow-note" style={{ transform: "rotate(-0.4deg)" }}>
          <span className="tape" style={{ left: "calc(50% - 42px)", top: -12 }} />
          <object
            data="/cv.pdf"
            type="application/pdf"
            className="h-[80vh] w-full"
            aria-label="CV PDF viewer"
          >
            <p className="p-6 font-serif text-graphite">
              Your browser can&apos;t display PDFs inline.{" "}
              <a href="/cv.pdf" className="text-string underline">
                Download the CV instead.
              </a>
            </p>
          </object>
        </div>
      </div>
    </main>
  );
}
