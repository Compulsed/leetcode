import { Heap, MinHeap } from "@datastructures-js/heap"

/*
    Tricks:
    1. Min heap for keeping track of max value (may also need to order within this too -- sharing comparitor!)
        1. Must keep track of keep size yourself
    2. Sorting times must be careful if times are the same (exclusive, inclusive, etc.)
*/

const bandWidth = [
    [0, 11, 500],
    [1, 10, 500],
    [1, 10, 500],
    [2, 9, 500],
    [12, 15, 1000],
    [30, 50, 5000],
    [20, 45, 5000],
]


interface ShowTiming {
    time: number,
    op: "START" | "END",
    bandwidth: number
}

interface BandwithWindow {
    start: number,
    end: number,
    bandwidth: number
}

const main = (topK: number): any => {
    // Create data structure with { time, op: START | END, bandwidth }
    // Iterate through the bandwidth array, adding these to a list
    // Sort the list by time
    // Iterate through the list, changing the counter based on start OR end
    // Edge cases:
    // 1. What happens if multiple start / end at the same time? -- Should be okay 
    // 2. Are times inclusive or exclusive? -- inclusive at the start, exclusive at the end [start, end)
    const times = bandWidth.flatMap(b => {
        const [startTime, endTime, bandWidth] = b

        const start: ShowTiming = {
            time: startTime,
            op: "START",
            bandwidth: bandWidth
        }

        const end: ShowTiming = {
            time: endTime,
            op: "END",
            bandwidth: bandWidth
        }        

        return [start, end]
    })

    // Start to end times -- MY MISTAKE: What happens when start / end times happen at the same time
    const sortedTimes = times.sort((a, b) => {
        if (a.time !== b.time) return a.time - b.time;                                                                     
      
        // When times are equal, process END before START                                                                  
        if (a.op === "END" && b.op === "START") return -1;                                                                 
        if (a.op === "START" && b.op === "END") return 1;                                                                  
        
        return 0;        
    })

    const compressedTimes = []

    for (let i = 0; i < sortedTimes.length; ++i) {
        const currentTime = sortedTimes[i]
        const nextTime = sortedTimes[i + 1]

        if (nextTime && nextTime.time === currentTime.time && nextTime.op === currentTime.op) {
            nextTime.bandwidth += currentTime.bandwidth
        } else {
            compressedTimes.push(currentTime)
        }
    }


    let currentBandwidth = 0
    let lastTime = null

    // We store a min heap to know when to pop head.
    const minHeap = new Heap<BandwithWindow>(
        (a, b) => a.bandwidth - b.bandwidth
    )

    for (const t of compressedTimes) {

        if (t.op === "START") {
            if (lastTime !== null) {
                const timeSlice = {
                    bandwidth: currentBandwidth,
                    start: lastTime!,
                    end: t.time
                }

                pushTimeSlice(minHeap, topK, currentBandwidth, timeSlice)

            }
            
            lastTime = t.time

            // Start we add the time then record
            currentBandwidth += t.bandwidth
 
        }

        if (t.op === "END") {
            const timeSlice = {
                bandwidth: currentBandwidth,
                start: lastTime!,
                end: t.time
            }
                                                            
            pushTimeSlice(minHeap, topK, currentBandwidth, timeSlice)
            lastTime = t.time

            currentBandwidth -= t.bandwidth

        }
    }

    return minHeap.sort()
}

const pushTimeSlice = (minHeap: MinHeap<BandwithWindow>, k: number, currentBandwidth: number, timeSlice: BandwithWindow) => {
    // Always push until we hit K
    if (k > minHeap.size()) {
        minHeap.push(timeSlice)
    } else {
        // We have a higher bandwidth, than what is in the minHeap, replace it
        if (currentBandwidth > minHeap.root()!.bandwidth) {
            minHeap.pop()
            minHeap.push(timeSlice)
        }
    }
            
}

console.log(main(2))