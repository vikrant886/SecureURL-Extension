import React from "react";
import { PieChart } from '@mui/x-charts/PieChart';

export default function Dash({ good, bad }) {
    let totalGood = 0;
    let totalBad = 0;

    try {
        const first = good ? JSON.parse(good) : [];
        totalGood = first.length;
    } catch (error) {
        console.error("Failed to parse good JSON:", error);
    }

    try {
        const second = bad ? JSON.parse(bad) : [];
        totalBad = second.length;
    } catch (error) {
        console.error("Failed to parse bad JSON:", error);
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
            <PieChart
                className="flex flex-col items-center justify-center"
                colors={['green', 'red']} // Adjusted colors array
                series={[
                    {
                        data: [
                            { id: 'good', value: totalGood, label: 'Benign' },
                            { id: 'bad', value: totalBad, label: 'Malicious' },
                        ],
                        innerRadius: 13,
                        outerRadius: 60,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        startAngle: -180,
                        endAngle: 180,
                        cx: 120,
                        cy: 100,
                    }
                ]}
            />
        </div>
    );
}
