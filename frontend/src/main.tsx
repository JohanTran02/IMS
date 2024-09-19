import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({

  uri: 'http://localhost:4000/',

  cache: new InMemoryCache(),

});
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    {/* <App/> */}
    </ApolloProvider>

  </StrictMode>,
)
