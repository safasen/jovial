import Clock from "./clock";

export default function FocusPeriod({planId, userId}) {
    return (
        <>
        <div className="h-3/4">
            <h1 className="text-5xl">Focus Period</h1>
            <div className="flex justify-center items-center h-full">
                <Clock planId={planId} userId={userId} />
            </div>
        </div>
        </>
    )
}