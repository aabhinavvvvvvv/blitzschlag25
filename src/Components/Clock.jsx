import { useState, useEffect } from "react";

const Clock = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date("2025-02-06T00:00:00") - +new Date();

        return difference > 0
            ? {
                  days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                  hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                  minutes: Math.floor((difference / (1000 * 60)) % 60),
                  seconds: Math.floor((difference / 1000) % 60),
              }
            : { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

    const timeUnits = [
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
    ];

    return (
        <div className="flex items-center text-white text-lg md:text-md">
            {timeUnits.map((unit, index) => (
                <div key={unit.label} className="flex items-center">
                    <div className="text-center flex flex-col items-center">
                        <span
                            className="font-bold drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"
                            style={{
                                fontFamily: "'Metal Mania', cursive",
                                textShadow:
                                    "0 0 5px rgba(255, 215, 0, 0.8), 0 0 5px rgba(255, 215, 0, 0.6)",
                            }}
                        >
                            <span className="text-3xl ">
                                {String(unit.value).padStart(2, "0")}
                            </span>
                        </span>
                        <p className="text-xs sm:text-sm md:text-base font-bold">{unit.label}</p>
                    </div>
                    {/* Add evenly spaced colons between time units */}
                    {index < timeUnits.length - 1 && (
                        <div
                            className="font-bold mx-2 sm:mx-4 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"
                            style={{
                                fontFamily: "'Metal Mania', cursive",
                                textShadow:
                                    "0 0 5px rgba(255, 215, 0, 0.8), 0 0 5px rgba(255, 215, 0, 0.6)",
                            }}
                        >
                            <span className="text-3xl">:</span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Clock;
