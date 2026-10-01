'use client'

export default function Footer() {
    const voltarAoTopo = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="w-full bg-[#1565C0] p-10 gap-6 flex flex-col items-center justify-center">
            <button
                onClick={voltarAoTopo}
                aria-label="Voltar ao topo"
                className="w-14 h-14 bg-[#054EA1] flex items-center justify-center rounded-full text-white text-2xl cursor-pointer transition-all duration-300 hover:bg-[#033B7A] hover:scale-110 hover:shadow-lg active:scale-95"
            >
                ↑
            </button>

            <div className="w-[90%] text-white flex flex-col items-center text-center">
                Guilherme Ferreira Tombini - Programação para Dispositivos Móveis II - 2026
            </div>
        </div>
    );
}
