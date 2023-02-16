export class CompletedTasks {
    constructor(){}
    public static async getTasksWith(status){
        console.log("Fetch tasks which are",status)
        const requestOptions:RequestInit = {
          method:'GET',
          headers:{ 'Content-Type' : 'application/json'},
          mode:'cors'
        }
        const resp = await fetch("http://localhost:8000/tasksWithStatus/"+status,requestOptions)
        const data = await resp.json() 
        return data
    }
}