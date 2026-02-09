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
                    ? "bg-blue-500 text-white border-[#2c2c2c] dark:border-zinc-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)] translate-x-[1px] translate-y-[1px]"
                    : "bg-white dark:bg-zinc-800 text-[#2c2c2c] dark:text-zinc-100 border-[#2c2c2c] dark:border-zinc-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.3)]"
                } active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`}
            onClick={onClick}
        >
            <div className={`${activated ? "-rotate-6" : "rotate-0"} transition-transform`}>
                {icon}
            </div>
        </button>
    );
}
