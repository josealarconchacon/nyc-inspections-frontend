import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'inspections',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'inspections/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // Return a list of inspection IDs to prerender
      // You can modify this to fetch actual IDs from your API or use a predefined list
      return [
        { id: '1' },
        { id: '2' },
        { id: '3' },
        // Add more IDs as needed for prerendering
      ];
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
