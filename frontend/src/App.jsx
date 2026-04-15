function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 px-6 py-16">
      <section className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-950/30 backdrop-blur sm:p-10">
        <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-200">
          Tailwind CSS v4 + Vite + React
        </span>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Tailwind is configured correctly
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
          If you can see this gradient background, rounded card, and styled
          button, Tailwind CSS v4 is working in your Vite React project.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
            Primary Action
          </button>
          <button className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
            Secondary Action
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
            <p className="text-sm text-slate-400">Plugin</p>
            <p className="mt-2 font-semibold text-white">@tailwindcss/vite</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
            <p className="text-sm text-slate-400">CSS Entry</p>
            <p className="mt-2 font-semibold text-white">@import "tailwindcss"</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
            <p className="text-sm text-slate-400">Framework</p>
            <p className="mt-2 font-semibold text-white">React + Vite</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
