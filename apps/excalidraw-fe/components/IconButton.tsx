import { ReactNode } from "react"

export function IconButton({
    icon,
    onClick,
    activated
}: {
    icon: ReactNode,
    onClick: () => void,
    activated: boolean
}) {

    return (
        <button
            className={`cursor-pointer border-2 transition-all p-3 flex items-center justify-center
                ${activated
                    ? "bg-blue-500 text-white border-[#2c2c2c] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[1px] translate-y-[1px]"
                    : "bg-white text-[#2c2c2c] border-[#2c2c2c] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                } active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`}
            onClick={onClick}
        >
            <div className={`${activated ? "-rotate-6" : "rotate-0"} transition-transform`}>
                {icon}
            </div>
        </button>
    );
}
