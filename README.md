# 🥘 Mi Paella

**Guía de paellas tradicionales — recetas, ingredientes y modos de cocción**

Aplicación web progresiva (PWA) para consultar recetas de paella y arroces tradicionales mediterráneos. Mobile-first, instalable como widget en iPhone/Android.

🌐 **[tecladooscuro.github.io/mi-paella](https://tecladooscuro.github.io/mi-paella/)**

---

## Qué incluye

- **12 recetas tradicionales** — desde pollo y verduras (nivel principiante) hasta la paella valenciana con caracoles y leña de naranjo
- **2 modos de cocción por receta**: ⚡ Inducción y 🔥 Parrilla/BBQ (incluye LotusGrill)
- **Modo compra**: checklist interactivo que persiste en el dispositivo aunque bloquees la pantalla
- **Fases de calor** detalladas para cada método y cada receta
- **PWA**: instálala en la pantalla de inicio del móvil, funciona sin conexión

## Recetas

| # | Receta | Dificultad | Tiempo |
|---|--------|-----------|--------|
| 1 | Paella de Pollo y Verduras | Muy fácil | 45 min |
| 2 | Paella de Pollo y Conejo | Fácil | 50 min |
| 3 | Paella de Verduras de Temporada | Fácil | 45 min |
| 4 | Paella de Marisco | Media | 50 min |
| 5 | Arroz Negro (Arròs Negre) | Media | 55 min |
| 6 | Arroz del Senyoret | Media-Alta | 55 min |
| 7 | Fideuà de Gandía | Media-Alta | 50 min |
| 8 | Arroz al Horno (Arròs al Forn) | Difícil | 70 min |
| 9 | Paella Mixta | Difícil | 60 min |
| 10 | Arroz a Banda | Avanzado | 70 min |
| 11 | Arroz con Costra | Avanzado | 75 min |
| 12 | Paella Valenciana Tradicional | Avanzado | 70 min |

## Tech

React 19 · TypeScript · Tailwind CSS 4 · Vite · Dexie.js (IndexedDB) · vite-plugin-pwa

## Desarrollo local

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # dist/
```

## Despliegue

Push a `main` → GitHub Actions build + deploy a GitHub Pages automáticamente.
