import getPart from "@/helpers/getPart";
import Img from "../misc/Img";

const Whatsapp = async () => {
  const part = await getPart("CONTACT_US");

  // Handle missing content gracefully
  if (!part || !part.content) {
    console.error("CONTACT_US content not found");
    return null;
  }

  const { content } = part;
  const { phone } = content?.contactPhone?.[0] || {};
  if (!phone) return null;
  const message = `Hello, I am interested in your services.`;
  return (
    <a
      href={`https://wa.me/${phone.replaceAll(" ", "")}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className=""
    >
      <div className="fixed bottom-4 lg:bottom-16 right-5 z-10 bg-dh-newsecondory text-white rounded-full hover:scale-105 transition-all drop-shadow-lg justify-start flex items-center lg:h-14 lg:pr-4 h-10 pr-3 pl-1">
        <p className="min-w-22 text-xs lg:text-sm font-semibold pl-3 lg:pl-0 lg:ml-6">CHAT NOW</p>
        <div className=" w-6 h-6 lg:w-10 lg:h-10 ml-1 lg:ml-2">
          <Img src="/api/files/574" />
        </div>
      </div>
    </a>
  );
};

export default Whatsapp;