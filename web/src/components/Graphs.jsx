import first_graph from "../assets/graphs/first_graph.svg";
import second_graph from "../assets/graphs/second_graph.svg";
import third_graph from "../assets/graphs/third_graph.svg";
import forth_graph from "../assets/graphs/forth_graph.svg";

export default function Graphs() {
  return (
    <>
      <div className="h-full">
        <h1 className="bold text-[32px] text-[#17120F] mb-[100px]">Dashboard</h1>
        <div className="flex justify-center w-full">
          <div className="flex flex-wrap gap-[38px] w-[790px] h-[427px]">
            <div className="w-[374px] h-[188px]">
              <img src={first_graph} />
            </div>
            <div className="w-[374px] h-[188px]">
              <img src={second_graph} />
            </div>
            <div className="w-[374px] h-[188px]">
              <img src={third_graph} />
            </div>
            <div className="w-[374px] h-[188px]">
              <img src={forth_graph} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
