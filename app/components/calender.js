export default function Calendar() {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const currentNum = currentDate.getDate();
    const currentMonth = currentDate.getMonth() + 1;
    const currentArray = []
    let i=currentNum;
    while (currentArray.length < 31) {
        if (currentMonth == 4 || currentMonth == 6 || currentMonth == 9 || currentMonth == 11) {
            if (i > 30) {
                i = 1;
                currentArray.push(i);
                i++;
                continue;
            }
        }else if (currentMonth == 2) {
            if (i > 28) {
                i = 1;
                currentArray.push(i);
                i++;
                continue;
            }
        }else {
            if (i > 31) {
                i = 1;
                currentArray.push(i);
                i++;
                continue;
            }
        }
        currentArray.push(i);
        i++;
    }
    return (
        <>
        <div>
            <div className="grid grid-cols-7 gap-2 p-4 bg-white text-gray-500 text-center rounded-lg mb-2">
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thur</div>
                <div>Fri</div>
                <div>Sat</div>
                <div className="text-red-500">Sun</div>
            </div>
            <div className="grid grid-cols-7 gap-2 p-4 bg-white rounded-lg text-center">
                {Array.from({ length: currentDay -1 }).map((_, i) => (
                    <div key={i}></div>
                ))}
                {currentArray.map((day, i) => (
                    <div key={i} onClick={()=> console.log(i)} className={`p-2 cursor-pointer hover:bg-gray-200 rounded-lg ${i === 0 ? 'bg-gray-200 text-gray-500' : ''}`}>
                        {day}
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}