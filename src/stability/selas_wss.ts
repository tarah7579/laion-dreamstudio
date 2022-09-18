export const generateWss = (opts) => {
    console.log("Connecting")
    const connection = new WebSocket(opts.host)

    connection.onmessage = function(event) {
        const data = JSON.parse(event.data)
        if ("jobId" in data) { 
            console.log(data["jobId"]) 
        } 
        else if ("status" in data && "queue" in data && "images" in data && "nPreviousJobs" in data) {
            const status = data["status"]
            const queue = data["queue"]
            const images = data["images"]
            const nPreviousJobs = data["nPreviousJobs"]
            if (status == "pending") {
                console.log('status: %s - queue position: %d', status, queue)
            } else if (status == "accepted") {
                console.log('status: %s - generation in progress', status)
            } else if (status == "completed") {
                console.log('status: %s', status)
                console.log('image: %s', images[0])
            } else {
                console.log('unknown status: %s', status)
            }
        }
        else {
            console.log("unknown api response:", JSON.stringify(data))
        }

    }
    connection.onopen = function(event) {
        console.log("Connected")
        const message = {"prompt": opts.prompt}
        const message_json = JSON.stringify(message)
        console.log("Sending" + message_json)
        connection.send(message_json)
    }
}