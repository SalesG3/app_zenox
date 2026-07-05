import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: ':alias/**',
    // Mude para Server (SSR real-time) ou Client (Renderiza no navegador como o Angular antigo)
    renderMode: RenderMode.Client 
  },
  {
    // Opcional: Manter o resto do site (como a tela de login) como Prerender
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
