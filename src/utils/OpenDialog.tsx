import React from "react";

type Props = {
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel: () => void;
};

const OpenDialog: React.FC<Props> = ({ title, description, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="mt-2">{description}</p>
                <div className="mt-4 flex justify-end space-x-4">
                    <button
                        onClick={onCancel}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        İptal
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Evet, Çıkar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OpenDialog;
