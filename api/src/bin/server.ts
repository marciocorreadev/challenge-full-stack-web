import app from '@app'

class Server {
    static async start(port: number): Promise<void> {
        try {
            app.listen(port, () => console.log(`Server running at ${port}`))
        } catch (error) {
            console.log(error)
        }
    }
}

Server.start(Number(process.env.PORT) || 3333)