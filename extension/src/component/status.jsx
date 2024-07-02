import React from "react";

export default function Status({ current }) {

    return (
        <div className="w-full h-full flex flex-row">
            {current && current.type === "good" ? (
                <div className="w-full h-full flex justify-center">
                    <div className="w-40 h-40 bg-red-900 flex items-center justify-center rounded-full">
                        <div className="w-28 h-28 bg-red-700 flex items-center justify-center rounded-full">
                            <div className="w-16 h-16 bg-red-500 flex items-center justify-center rounded-full">
                                Safe
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex justify-center">
                    <div className="w-40 h-40 bg-red-900 flex items-center justify-center rounded-full">
                        <div className="w-28 h-28 bg-red-700 flex items-center justify-center rounded-full">
                            <div className="w-16 text-white text-3xl font-bold h-16 bg-red-500 flex items-center justify-center rounded-full">
                                !!
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
