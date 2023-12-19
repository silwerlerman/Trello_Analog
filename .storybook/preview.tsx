import type { Preview } from '@storybook/react';
import '../src/UI/styles.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const reactQueryDecorator = (Story: React.ComponentType): JSX.Element => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {<Story />}
    </QueryClientProvider>
  );
};

const reactRouterDecorator = (Story: React.ComponentType): JSX.Element => {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/*" element={<Story />} />
      </Routes>
    </MemoryRouter>
  );
};

const preview: Preview = {
  decorators: [reactQueryDecorator, reactRouterDecorator],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
};

export default preview;
