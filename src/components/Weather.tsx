import React from "react";
import { fetchWeatherApi } from "openmeteo";

// openmeteo API

// parâmetros da requisição da API
const params = {
  latitude: -10, // latitude do local
  longitude: -55, // longitude do local
  hourly: "temperature_2m",
  daily: ["temperature_2m_max", "temperature_2m_min"],
  timezone: "America/Sao_Paulo", // fuso horário
};

// URL da API
const url = "https://api.open-meteo.com/v1/forecast";

// chamada assíncrona para a API, passando os parâmetros definidos acima.
const responses = await fetchWeatherApi(url, params);

// auxilia para gerar intervalos de tempo entre 'start' e 'stop' com um determinado 'step'.
const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

// processa a primeira resposta do array
const response = responses[0];

// atributos da resposta relacionados ao fuso horário e à localização.
const utcOffsetSeconds = response.utcOffsetSeconds();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const latitude = response.latitude();
const longitude = response.longitude();

// dados horários e diários da resposta.
const hourly = response.hourly()!;
const daily = response.daily()!;

// estrutura para armazenar os dados processados da previsão do tempo.
const weatherData = {
  hourly: {
    // processando os horários, ajustando os valores de tempo de acordo com o deslocamento do fuso horário.
    time: range(
      Number(hourly.time()),
      Number(hourly.timeEnd()),
      hourly.interval()
    ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),

    // os valores de temperatura horários e armazenando-os.
    temperature2m: hourly.variables(0)!.valuesArray()!, // temperaturas a 2 metros de altura.
  },

  daily: {
    // processando os tempos diários, ajustando novamente os valores de tempo.
    time: range(
      Number(daily.time()),
      Number(daily.timeEnd()),
      daily.interval() // intervalo de tempo (em dias)
    ).map((t) => new Date((t + utcOffsetSeconds) * 1000)), // converte o tempo para formato Date

    // temperaturas máximas e mínimas
    temperature2mMax: daily.variables(0)!.valuesArray()!,
    temperature2mMin: daily.variables(1)!.valuesArray()!,
  },
};

// componente funcional
const Weather: React.FC = () => {
  return (
    <table className="text-gray-800 font-bold">
      <tr>
        <td>min</td>
        <td>max</td>
      </tr>

      {weatherData.hourly.time.map((time, i) => (
        <tr key={i}>
          <td>{weatherData.daily.temperature2mMin[i]}°</td>
          <td>{weatherData.daily.temperature2mMax[i]}°</td>
          <td>Rio de Janeiro</td>
        </tr>
      ))}
    </table>
  );
};

export default Weather;
