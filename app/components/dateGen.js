export default function dateGen(){
    const d = new Date()
    let currentNum = new Date().getDate()
    const currentMonth = new Date().getMonth() + 1;
    let array = []
    if (currentNum > 12) {
        while(array.length <12) {
            const date = (d.getMonth() + 1 < 10 ? ("0" + (d.getMonth() + 1).toString()) : (d.getMonth() + 1).toString())  + (currentNum < 10 ? ("0" + (currentNum).toString()) : (currentNum).toString()) + (d.getFullYear()).toString()
            array.push(date)
            currentNum--;
        }
    }else if (currentNum <= 12 && currentMonth > 1) {
        while(array.length <12) {
            if (currentNum ==0){
                if (currentMonth == 4 || currentMonth == 6 || currentMonth == 9 || currentMonth == 11) {
                    currentNum = 31;
                    while(array.length < 12){
                        const date = (d.getMonth() < 10 ? ("0" + (d.getMonth()).toString()) : (d.getMonth()).toString())  + (currentNum < 10 ? ("0" + (currentNum).toString()) : (currentNum).toString()) + (d.getFullYear()).toString()
                        array.push(date)
                        currentNum--;
                    }
                    break;
                }else if (currentMonth == 3) {
                    currentNum = 28;
                    while(array.length < 12){
                        const date = (d.getMonth() < 10 ? ("0" + (d.getMonth()).toString()) : (d.getMonth()).toString())  + (currentNum < 10 ? ("0" + (currentNum).toString()) : (currentNum).toString()) + (d.getFullYear()).toString()
                        array.push(date)
                        currentNum--;
                    }
                    break;
                }else {
                    currentNum = 30;
                    while(array.length < 12){
                        const date = (d.getMonth() < 10 ? ("0" + (d.getMonth()).toString()) : (d.getMonth()).toString())  + (currentNum < 10 ? ("0" + (currentNum).toString()) : (currentNum).toString()) + (d.getFullYear()).toString()
                        array.push(date)
                        currentNum--;
                    }
                    break;
                }
            }
            const date = (d.getMonth() + 1 < 10 ? ("0" + (d.getMonth() + 1).toString()) : (d.getMonth() + 1).toString())  + (currentNum < 10 ? ("0" + (currentNum).toString()) : (currentNum).toString()) + (d.getFullYear()).toString()
            array.push(date)
            currentNum--;
        }
    }
    return array
}

// export function dateGenWhole(start, today){
//     const d = new Date()
//     let flag=true
//     let currentYear = d.getFullYear()
//     let array = []
//     while (flag == true ) {
//         if (Number(start.slice(0,2)) == 4 || Number(start.slice(0,2)) == 6 || Number(start.slice(0,2)) == 9 || Number(start.slice(0,2)) == 11) {
//             if (Number(start.slice(3,5)) == 30) {
                
//             }else {
//                 start = start.slice(0,3) + (Number(start.slice(3,5))+1).toString() + start.slice(5,7)
//             }
//     }
// }