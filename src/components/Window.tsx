import React, { Dispatch, useEffect } from "react";

interface WindowProps {
    confirm: () => void;
    cancel: () => void;
    message: string;
    title: string;
    show?: Dispatch<React.SetStateAction<boolean>>;
    mode?: Dispatch<React.SetStateAction<string>>;
    confirmText?: string;
    cancelText?: string;
    danger: boolean;
}

const Window: React.FC<WindowProps> = ({
    confirm,
    cancel,
    message,
    title,
    show,
    mode,
    confirmText = "Confirm",
    cancelText = "Cancel",
    danger = false,
}) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                cancel();
                if (show) show(false);
                if (mode) mode("read");
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000077] op z-50 p-5">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <p className="mb-4">{message}</p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => {
                            cancel();
                            if (show) show(false);
                            if (mode) mode("read");
                        }}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors duration-300"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            confirm();
                            if (show) show(false);
                            if (mode) mode("read");
                        }}
                        className={`px-4 py-2 transition-colors duration-300 rounded ${
                            danger
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Window;
