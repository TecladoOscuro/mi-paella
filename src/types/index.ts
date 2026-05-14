export interface Ingredient {
  id: string
  name: string
  quantity: string
  category: 'proteina' | 'verdura' | 'arroz' | 'caldo' | 'condimentos' | 'especial' | 'marisco'
}

export interface CookingStep {
  order: number
  description: string
  time?: string
  heatLevel?: string
}

export interface HeatPhase {
  phase: string
  time: string
  induction: string
  parrilla: string
}

export interface CookingMethod {
  steps: CookingStep[]
  tips: string[]
  heatPhases: HeatPhase[]
}

export interface Recipe {
  id: string
  name: string
  level: number
  difficulty: 'Muy fácil' | 'Fácil' | 'Media' | 'Media-Alta' | 'Difícil' | 'Avanzado'
  totalTime: string
  description: string
  story: string
  ingredients: Ingredient[]
  induction: CookingMethod
  parrilla: CookingMethod
  tips: string[]
}

export interface ShoppingItem {
  recipeId: string
  items: Record<string, boolean>
}
