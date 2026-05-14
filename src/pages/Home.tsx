import { Link } from 'react-router-dom'
import { recipes, getDifficultyColor } from '../data/recipes'

export function Home() {
  return (
    <div className="bg-paella-bg text-paella-text min-h-dvh">
      <div className="fixed top-0 left-0 right-0 z-20 bg-paella-bg border-b border-paella-border">
        <div className="flex items-center justify-between h-12 px-5">
          <h1 className="text-lg font-bold">🥘 Mi Paella</h1>
          <span className="text-xs text-paella-muted bg-paella-surface rounded-full px-2.5 py-1">
            {recipes.length} recetas
          </span>
        </div>
      </div>

      <div className="pt-12 pb-8 px-4">
        <p className="text-sm text-paella-muted mb-5 px-1 pt-4">
          Recetas tradicionales de arroz en paellera. De más fácil a más avanzado.
        </p>

        <div className="space-y-3">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              to={`/receta/${recipe.id}`}
              className="block bg-paella-card rounded-2xl border border-paella-border p-4 active:scale-[0.98] transition-transform duration-100"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-paella-muted bg-paella-surface rounded-md px-2 py-0.5">
                      {recipe.level}
                    </span>
                    <span className={`text-xs font-medium rounded-md px-2 py-0.5 ${getDifficultyColor(recipe.difficulty)}`}>
                      {recipe.difficulty}
                    </span>
                  </div>
                  <h2 className="text-base font-semibold leading-snug">
                    {recipe.name}
                  </h2>
                  <p className="text-sm text-paella-muted mt-1 line-clamp-2 leading-relaxed">
                    {recipe.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2.5">
                    <span className="text-xs text-paella-muted">⏱ {recipe.totalTime}</span>
                    <span className="text-xs text-paella-muted">🍽 {recipe.servings}</span>
                    <span className="text-xs text-paella-muted">{recipe.kcal}</span>
                  </div>
                </div>
                <svg className="w-5 h-5 text-paella-border mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
