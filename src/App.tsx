import { useEffect, useState } from "react"

enum TrainType {
  Puyuma = "普悠瑪",
  Taroko = "太魯閣",
  XinTzechiang = "新自強",
  Tzechiang = "自強",
  Chukuang = "莒  光",
  Local = "區  間",
  FastLocal = "區間快",
}

enum Line {
  Mountain = "山",
  Ocean = "海",
  None = "無",
}

enum Platform {
  TwoA = "2A",
  TwoB = "2B",
}

type Train = {
  number: number;
  type: TrainType;
  destination: string;
  line: Line;
  stops: string[];
  arrivalTime: String;
  platform: Platform;
  delay: number;
}

function getColourFromType(type: TrainType) {
  const className = "bg-red-600 bg-amber-500 bg-orange-500 bg-green-600 bg-purple-800"
  switch (type) {
    case TrainType.Puyuma:
      return "bg-red-600";
    case TrainType.Taroko:
      return "bg-amber-500";
    case TrainType.XinTzechiang:
      return "bg-purple-800";
    case TrainType.Tzechiang:
      return "bg-orange-500";
    case TrainType.Chukuang:
      return "bg-amber-500";
    case TrainType.Local:
      return "bg-green-600";
  }
}

function App() {
  const [trains, setTrains] = useState<Train[]>([
    {
      number: 154,
      type: TrainType.XinTzechiang,
      destination: "南港",
      line: Line.Mountain,
      stops: ["台南", "嘉義", "台中", "桃園", "板橋", "台北", "松山", "南港"],
      arrivalTime: "18:45",
      platform: Platform.TwoA,
      delay: 0,
    },
    {
      number: 3334,
      type: TrainType.Local,
      destination: "新左營",
      line: Line.Mountain,
      stops: [],
      arrivalTime: "18:57",
      platform: Platform.TwoA,
      delay: 3,
    },
    {
      number: 107,
      type: TrainType.Puyuma,
      destination: "屏東",
      line: Line.Mountain,
      stops: [],
      arrivalTime: "18:57",
      platform: Platform.TwoA,
      delay: 0,
    },
    {
      number: 121,
      type: TrainType.Tzechiang,
      destination: "屏東",
      line: Line.Mountain,
      stops: [],
      arrivalTime: "18:57",
      platform: Platform.TwoA,
      delay: 0,
    },
    {
      number: 491,
      type: TrainType.Taroko,
      destination: "台東",
      line: Line.Mountain,
      stops: [],
      arrivalTime: "18:57",
      platform: Platform.TwoA,
      delay: 0,
    },
    {
      number: 521,
      type: TrainType.Chukuang,
      destination: "潮州",
      line: Line.Mountain,
      stops: [],
      arrivalTime: "18:57",
      platform: Platform.TwoA,
      delay: 0,
    }
  ]);

  return (
    <div className="bg-black h-screen flex flex-col">
      <div className="flex justify-between text-gray-300 py-3 px-6 items-center border-text-gray-300 border-b-4 border-solid">
        <div className="flex items-center gap-6">
          <h1 className="text-6xl">2</h1>
          <div className="text-3xl flex flex-col">
            <h2>新左營、台南、新營方向</h2>
            <h2>for Xinzouying, Tainan, Xinying</h2>
          </div>
        </div>
        <Clock/>
      </div>
      <div className="grid text-white grid-cols-[8.5rem_8rem_15rem_8.5rem_1fr_5rem] h-full overflow-y-scroll bg-top">
        {trains.map((train, i) => {
          const className = "bg-neutral-900 bg-black";
          const bgColour = i % 2 === 0 ? "bg-neutral-900" : "bg-black";

          return (
            <>
              <span className={`${bgColour} text-5xl text-center text-yellow-300 py-4 pl-4`}>{train.arrivalTime}</span>
              <span className={`${bgColour} text-5xl text-left text-red-500 py-4 pl-2`}>{train.delay !== 0 && `+${train.delay}`}</span>
              <span className={`text-5xl text-center py-4 ${getColourFromType(train.type)}`}>{train.type}</span>
              <span className={`text-5xl text-center py-4 ${getColourFromType(train.type)}`}>{train.number}</span>
              <span className={`${bgColour} text-5xl text-center py-4`}>{train.destination}<span className="pl-6 text-3xl">經{train.line}線</span></span>
              <span className={`${bgColour} text-5xl text-center py-4 pr-4`}>{train.platform}</span>
              <span className="py-2 text-center bg-gray-300 text-black text-3xl">停靠站</span>
              <div className={`${bgColour} col-span-5`}>
                <TrainStopsSection key={train.number} stops={train.stops} terminal={train.destination} local={train.type == TrainType.Local}/>
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}

function TrainStopsSection({stops, local, terminal}:{stops: string[], local: boolean, terminal: string}) {
  if (local) {
    return (
      <div className="flex text-gray-200 text-3xl pl-4 items-center font-light">
        高雄 到 {terminal} 中途個站。
      </div>
    )
  }
  return (
    <ul className="flex col-span-5 text-gray-200 text-3xl pl-4 items-center font-light">
      {stops.map((stop, i) => {
        if (i === stops.length - 1)
          return <li key={stop}>{stop}。</li>
        return <li key={stop}>{stop}、</li>
      })}
    </ul>
  )
}

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000)

    return () => clearInterval(interval);
  }, []);
  return (
    <h2 className="text-6xl">
      {time.getHours().toString().padStart(2, "0")}:{time.getMinutes().toString().padStart(2, "0")}
    </h2>
  )
}

export default App
