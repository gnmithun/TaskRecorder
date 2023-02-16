export class FilteredTasks {
    constructor(){}
    public static async getTasksWith(day){
        const requestOptions:RequestInit = {
          method:'GET',
          headers:{ 'Content-Type' : 'application/json'},
          mode:'cors'
        }
        const resp = await fetch("http://localhost:8000/tasksFor?day="+day,requestOptions)
        const data = await resp.json() 
        return data
    }
}

