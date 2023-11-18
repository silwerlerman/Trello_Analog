import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RouterProvider } from 'react-router-dom';
import Router from './router/routerSchema';

const client = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity, cacheTime: 1000 * 60 } }
});

export const App = () => {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={Router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
