import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import GameContextProvider from "./config/contexts";
import Quiz from "./pages/Quiz";

const App = () => {
  const client = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <GameContextProvider>
          <Quiz />;
        </GameContextProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
