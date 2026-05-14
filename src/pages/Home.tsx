import { Link } from 'react-router-dom'
import { recipes, getDifficultyColor } from '../data/recipes'

export function Home() {
  return (
    <div className="pb-(--safe-bottom)">
      <header className="sticky top-0 z-10 bg-paella-bg/90 backdrop-blur-xl border-b border-paella-border px-5 pt-(--safe-bottom)">
        <div className="flex items-center justify-between h-12">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-100">🥘 Mi Paella</h1>
          </div>
          <span className="text-xs text-paella-muted bg-paella-surface rounded-full px-2.5 py-1">
            {recipes.length} recetas
          </span>
        </div>
      </header>

      <main className="px-4 pt-4 pb-24">
        <p className="text-sm text-paella-muted mb-5 px-1">
          Recetas tradicionales de arroz en paellera. De más fácil a más avanzado.
        </p>

        <div className="space-y-3">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              to={`/receta/${recipe.id}`}
              className="block bg-paella-card rounded-2xl shadow-sm border border-paella-border p-4 active:scale-[0.98] transition-transform duration-100"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-paella-muted bg-paella-surface rounded-md px-2 py-0.5">
                      Nivel {recipe.level}
                    </span>
                    <span className={`text-xs font-medium rounded-md px-2 py-0.5 ${getDifficultyColor(recipe.difficulty)}`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                  <h2 className="text-base font-semibold leading-snug text-gray-100">
                    {recipe.name}
                  </h2>
                  <p className="text-sm text-paella-muted mt-1 line-clamp-2 leading-relaxed">
                    {recipe.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2.5">
                    <span className="text-xs text-paella-muted flex items-center gap-1">
                      ⏱ {recipe.totalTime}
                    </span>
                    <span className="text-xs text-paella-muted">
                      {recipe.ingredients.length} ingredientes
                    </span>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-paella-border mt-1 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
