import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-sky-300 to-orange-200 drop-shadow">
          QuizGen: AI-Powered Quiz Hub
        </h1>
        <p className="mt-4 text-sky-200/90 max-w-2xl">
          Generate quizzes on the fly across Academic, Entertainment, and General Knowledge. Track scores and history in a sleek neon UI.
        </p>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/70" />
    </section>
  )
}
