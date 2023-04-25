import { customFetch } from "../Common/customFetch"
export class CompletedTasks {
    constructor(){}
    public static async getTasksWith(status:any){
        const filteredTaskByStatusEndPoint = "http://localhost:8000/tasksWithStatus/"+status
        const resp = await customFetch(filteredTaskByStatusEndPoint, { method : 'GET' })
        const data = await resp.json() 
        return data
    }
}
