import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getRecipeById, getDifficultyColor } from '../data/recipes'
import { getShoppingList, toggleIngredient, clearShoppingList } from '../db/shopping'
import type { Ingredient, CookingMethod } from '../types'

type Tab = 'ingredientes' | 'preparacion'
type IngredientMode = 'lista' | 'compra'
type CookingMode = 'induccion' | 'parrilla'

export function Detail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const recipe = getRecipeById(id ?? '')

  const [activeTab, setActiveTab] = useState<Tab>('ingredientes')
  const [ingredientMode, setIngredientMode] = useState<IngredientMode>('lista')
  const [cookingMode, setCookingMode] = useState<CookingMode>('induccion')
  const [checklist, setChecklist] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (id) {
      getShoppingList(id).then(setChecklist)
    }
  }, [id])

  const handleToggle = useCallback(async (ingredientId: string) => {
    if (!id) return
    const updated = await toggleIngredient(id, ingredientId)
    setChecklist(updated)
  }, [id])

  const handleClear = useCallback(async () => {
    if (!id) return
    await clearShoppingList(id)
    setChecklist({})
  }, [id])

  if (!recipe) {
    return (
      <div className="min-h-dvh flex items-center justify-center p-5">
        <div className="text-center">
          <p className="text-paella-muted text-lg mb-3">Receta no encontrada</p>
          <button
            onClick={() => navigate('/')}
            className="text-paella-red font-medium"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  const checkedCount = Object.values(checklist).filter(Boolean).length
  const totalIngredients = recipe.ingredients.length
  const currentMethod: CookingMethod = cookingMode === 'induccion' ? recipe.induction : recipe.parrilla

  return (
    <div className="min-h-dvh pb-(--safe-bottom)">
      <NavigationBar title={recipe.name} onBack={() => navigate('/')} />

      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-paella-muted bg-paella-surface rounded-md px-2 py-0.5">
            Nivel {recipe.level}
          </span>
          <span className={`text-xs font-medium rounded-md px-2 py-0.5 ${getDifficultyColor(recipe.difficulty)}`}>
            {recipe.difficulty}
          </span>
          <span className="text-xs text-paella-muted">⏱ {recipe.totalTime}</span>
        </div>
        <p className="text-sm text-paella-muted leading-relaxed">{recipe.story}</p>
      </div>

      <div className="sticky top-0 z-10 bg-paella-bg/90 backdrop-blur-xl border-b border-paella-border">
        <div className="flex">
          <button
            onClick={() => setActiveTab('ingredientes')}
            className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
              activeTab === 'ingredientes'
                ? 'text-paella-red border-b-2 border-paella-red'
                : 'text-paella-muted'
            }`}
          >
            🛒 Ingredientes
          </button>
          <button
            onClick={() => setActiveTab('preparacion')}
            className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
              activeTab === 'preparacion'
                ? 'text-paella-red border-b-2 border-paella-red'
                : 'text-paella-muted'
            }`}
          >
            🔥 Preparación
          </button>
        </div>
      </div>

      <div className="px-5 py-4">
        {activeTab === 'ingredientes' && (
          <IngredientsTab
            ingredients={recipe.ingredients}
            mode={ingredientMode}
            onModeChange={setIngredientMode}
            checklist={checklist}
            onToggle={handleToggle}
            onClear={handleClear}
            checkedCount={checkedCount}
            totalIngredients={totalIngredients}
          />
        )}

        {activeTab === 'preparacion' && (
          <PreparationTab
            method={currentMethod}
            mode={cookingMode}
            onModeChange={setCookingMode}
            tips={recipe.tips}
          />
        )}
      </div>
    </div>
  )
}

function NavigationBar({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="sticky top-0 z-20 bg-paella-bg/90 backdrop-blur-xl border-b border-paella-border px-2 pt-(--safe-bottom)">
      <div className="flex items-center h-11">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-paella-red font-medium text-sm px-2 py-1 -ml-1 active:opacity-60"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Inicio
        </button>
        <div className="flex-1 text-center">
          <h2 className="text-sm font-semibold truncate px-4 text-gray-100">{title}</h2>
        </div>
        <div className="w-16" />
      </div>
    </div>
  )
}

function IngredientsTab({
  ingredients,
  mode,
  onModeChange,
  checklist,
  onToggle,
  onClear,
  checkedCount,
  totalIngredients,
}: {
  ingredients: Ingredient[]
  mode: IngredientMode
  onModeChange: (m: IngredientMode) => void
  checklist: Record<string, boolean>
  onToggle: (id: string) => void
  onClear: () => void
  checkedCount: number
  totalIngredients: number
}) {
  const categories = [...new Set(ingredients.map((i) => i.category))]
  const categoryLabels: Record<string, string> = {
    arroz: 'Arroz',
    proteina: 'Proteína',
    marisco: 'Marisco',
    verdura: 'Verduras',
    caldo: 'Caldo',
    condimentos: 'Condimentos',
    especial: 'Especial',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex bg-paella-surface rounded-lg p-0.5">
          <button
            onClick={() => onModeChange('lista')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              mode === 'lista' ? 'bg-paella-border shadow-sm text-gray-100' : 'text-paella-muted'
            }`}
          >
            📋 Lista
          </button>
          <button
            onClick={() => onModeChange('compra')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              mode === 'compra' ? 'bg-paella-green text-white shadow-sm' : 'text-paella-muted'
            }`}
          >
            ✅ Modo compra
          </button>
        </div>

        {mode === 'compra' && (
          <button
            onClick={onClear}
            disabled={checkedCount === 0}
            className={`text-xs active:text-paella-red transition-colors ${
              checkedCount === 0 ? 'text-paella-border' : 'text-paella-muted'
            }`}
          >
            Limpiar
          </button>
        )}
      </div>

      {mode === 'compra' && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-paella-muted mb-2">
            <span>{checkedCount}/{totalIngredients} conseguidos</span>
          </div>
          <div className="w-full bg-paella-surface rounded-full h-1.5">
            <div
              className="bg-paella-green h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${(checkedCount / totalIngredients) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="space-y-4">
        {categories.map((cat) => {
          const items = ingredients.filter((i) => i.category === cat)
          return (
            <div key={cat}>
              <h3 className="text-xs font-semibold text-paella-muted uppercase tracking-wider mb-2">
                {categoryLabels[cat] ?? cat}
              </h3>
              {mode === 'lista' ? (
                <ul className="space-y-1.5">
                  {items.map((ing) => (
                    <li key={ing.id} className="text-sm text-gray-300 flex justify-between py-1.5 border-b border-paella-border last:border-0">
                      <span>{ing.name}</span>
                      <span className="text-paella-muted text-xs font-medium ml-2 shrink-0">{ing.quantity}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-1">
                  {items.map((ing) => {
                    const checked = checklist[ing.id] ?? false
                    return (
                      <li key={ing.id}>
                        <button
                          onClick={() => onToggle(ing.id)}
                          className="w-full flex items-center gap-3 py-2.5 border-b border-paella-border last:border-0 active:bg-paella-surface -mx-2 px-2 rounded-lg transition-colors"
                        >
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                              checked
                                ? 'bg-paella-green border-paella-green'
                                : 'border-paella-border'
                            }`}
                          >
                            {checked && (
                              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <span className={`text-sm ${checked ? 'text-paella-muted line-through' : 'text-gray-300'}`}>
                              {ing.name}
                            </span>
                          </div>
                          <span className="text-xs text-paella-muted font-medium shrink-0">{ing.quantity}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PreparationTab({
  method,
  mode,
  onModeChange,
  tips,
}: {
  method: CookingMethod
  mode: CookingMode
  onModeChange: (m: CookingMode) => void
  tips: string[]
}) {
  return (
    <div>
      <div className="flex bg-paella-surface rounded-lg p-0.5 mb-5">
        <button
          onClick={() => onModeChange('induccion')}
          className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
            mode === 'induccion' ? 'bg-paella-border shadow-sm text-gray-100' : 'text-paella-muted'
          }`}
        >
          ⚡ Inducción
        </button>
        <button
          onClick={() => onModeChange('parrilla')}
          className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
            mode === 'parrilla' ? 'bg-paella-border shadow-sm text-gray-100' : 'text-paella-muted'
          }`}
        >
          🔥 Parrilla / BBQ
        </button>
      </div>

      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-100">Pasos</h3>
        {method.steps.map((step) => (
          <div key={step.order} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-paella-red text-white text-xs font-bold flex items-center justify-center shrink-0">
                {step.order}
              </div>
              {step.order < method.steps.length && (
                <div className="w-0.5 flex-1 bg-paella-border my-1" />
              )}
            </div>
            <div className="flex-1 pb-4">
              <p className="text-sm text-gray-300 leading-relaxed">{step.description}</p>
              {(step.time || step.heatLevel) && (
                <div className="flex gap-3 mt-1.5">
                  {step.time && (
                    <span className="text-xs text-paella-muted flex items-center gap-1">
                      ⏱ {step.time}
                    </span>
                  )}
                  {step.heatLevel && (
                    <span className="text-xs text-paella-red font-medium flex items-center gap-1">
                      🔥 {step.heatLevel}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-paella-surface rounded-xl p-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-100 mb-3">Fases de calor</h3>
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-paella-border">
                <th className="text-left py-2 pr-2 text-paella-muted font-medium">Fase</th>
                <th className="text-left py-2 pr-2 text-paella-muted font-medium">Tiempo</th>
                <th className="text-left py-2 text-paella-muted font-medium">
                  {mode === 'induccion' ? 'Inducción' : 'Parrilla'}
                </th>
              </tr>
            </thead>
            <tbody>
              {method.heatPhases.map((phase, i) => (
                <tr key={i} className="border-b border-paella-border last:border-0">
                  <td className="py-2 pr-2 text-gray-300">{phase.phase}</td>
                  <td className="py-2 pr-2 text-paella-muted">{phase.time}</td>
                  <td className="py-2 text-gray-300 font-medium">
                    {mode === 'induccion' ? phase.induction : phase.parrilla}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {method.tips.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-100 mb-3">
            Tips para {mode === 'induccion' ? 'Inducción' : 'Parrilla / BBQ'}
          </h3>
          <ul className="space-y-2">
            {method.tips.map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-400">
                <span className="text-paella-orange shrink-0">💡</span>
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tips.length > 0 && (
        <div className="bg-paella-card rounded-xl p-4 border border-paella-border">
          <h3 className="text-sm font-semibold text-gray-100 mb-3">Consejos generales</h3>
          <ul className="space-y-2">
            {tips.map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-400">
                <span className="text-paella-red shrink-0">🥘</span>
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
