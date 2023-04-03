import { QueryClient, QueryClientProvider } from "react-query";
import GameContextProvider from "./config/contexts";
import Quiz from "./pages/Quiz";

const App = () => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <GameContextProvider>
        <Quiz />
      </GameContextProvider>
    </QueryClientProvider>
  );
};

export default App;
