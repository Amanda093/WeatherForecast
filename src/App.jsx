import Title from "./components/Title.jsx";
import Search from "./components/Search.jsx";
import Weather from "./components/Weather.tsx";
import "./index.css";

function App() {
  return (
    // background
    <div className="w-screen h-screen flex justify-center p-16 bg-gradient-to-b from-orange-500 to-yellow-400 flex flex-auto">
      <div className="w-[500px] space-y-5 ">
        <Title>Previsão do tempo</Title>
        <Search />
        <hr />
        <Title size="text-3xl" position="text-left">
          Capitais
        </Title>
        <Weather />
      </div>
    </div>
  );
}

export default App;
