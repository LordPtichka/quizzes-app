export const ServiceData = {
    async GetCardDataAll() {
        try {
            const response = await fetch('http://json-server:4000/dataCard')
            const data = await response.json()
            return data
        } catch (error) {
            return "error"
        }
    },

    async PatchStatusActive(id: string) {
        try {
            // const response = await fetch(`http://json-server:4000/dataCard/${id}`,
            const response = await fetch(`http://localhost:4000/dataCard/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ "status": "completed" }),
                },
            )
            const data = await response.json()
            return data
        } catch (error) {
            return "error"
        }

    },

    async PatchStatusDisable(id: string) {
        try {
            const response = await fetch(`http://localhost:4000/dataCard/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ "status": "" }),
                },
            )
            const data = await response.json()
            return data
        } catch (error) {
            return "error"
        }
    },
    // ===========================
    // ===========================
    // ===========================
    async PostCreateCard(data: object) {
        try {
            const response = await fetch(`http://localhost:4000/dataCard/`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                },
            )
            const dataStatus = await response.json()
            console.log(dataStatus)
            return dataStatus
        } catch (error) {
            return "error"
        }
    },
}