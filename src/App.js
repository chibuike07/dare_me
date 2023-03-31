import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import GameContextProvider from "./config/contexts";
import Quiz from "./pages/Quiz";

const App = () => {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <GameContextProvider>
        <div className="App">
          <Quiz />
        </div>
        ;
      </GameContextProvider>
    </QueryClientProvider>
  );
};

export default App;
