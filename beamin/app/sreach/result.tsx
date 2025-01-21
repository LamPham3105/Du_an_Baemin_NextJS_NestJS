import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ResultFood({ items }: { items: any[] }) {
  const router = useRouter();

  const handleNavigate = (id: string) => {
    // Simply navigate to the detail page with the id in the URL
    window.location.href = `/detailfood?query=${id}`;
  };

  // Check if items.data is an array before attempting to map
  if (!Array.isArray(items.data)) {
    console.error(
      "Expected items.data to be an array but got",
      typeof items.data
    );
    return <div>Error: Invalid data format</div>; // You can customize the error UI
  }

  return (
    <div className="mt-3 flex flex-row flex-wrap gap-3">
      {items.data.length > 0 ? (
        items.data.map((item: any) => (
          <div
            onClick={() => handleNavigate(item.id)}
            key={item.id}
            className="group w-[19%] h-56 bg-white flex flex-col cursor-pointer"
          >
            <div className="group-hover:brightness-105 w-full h-[60%] relative">
              <Image
                layout="fill"
                objectFit="cover"
                src={item.img}
                alt={item.name}
              />
            </div>
            <div className="group-hover:bg-slate-50 w-full h-[40%] pr-3 border border-solid">
              <div className="ml-3 w-full truncate text-base h-[30%]">
                <span className="font-bold text-[#252525]">{item.name}</span>
              </div>
              <div
                className="ml-3 w-full truncate text-sm h-[30%]"
                style={{ color: "#959595" }}
              >
                <span>{item.address}</span>
              </div>
              <div className="flex items-center w-full text-sm border-t border-beamin-50 h-[30%]">
                <span className="ml-3">{item.kind}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No items available</div> // You can customize this message
      )}
    </div>
  );
}
