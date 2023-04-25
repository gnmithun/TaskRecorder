import { customFetch } from "../Common/customFetch"
export class FilteredTasks {
    constructor(){}
    public static async getTasksWith(day:any){
        const filteredTaskByDayEndPoint = "http://localhost:8000/tasksFor?day="+day
        const resp = await customFetch(filteredTaskByDayEndPoint, { method:'GET' })
        const data = await resp.json() 
        return data
    }
}

