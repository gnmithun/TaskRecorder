export class CompletedTasks {
    constructor(){}
    getTasksWith(param){
        console.log("Fetch tasks which are",param)
    }
}

/*
    const customFetchTasksBasedOnStatus = async (status) => {
      setLoading(true)

      const requestOptions = {
        method : 'GET',
        headers : { 'Content-Type' : 'application/json' },
        mode:'cors'
      }
      const resp = await fetch("http://localhost:8000/tasksWithStatus/"+status,requestOptions)
      const data = await resp.json() 

      if (data.response === "Success"){
        if ( data.details.length === 0 ) {
          alert("No tasks found")
          setTasks([])
          setLoading(false)
          return
        }
        setTasks(data.details)  
      } else {
        alert(data.details)
      }  
      setLoading(false)
    }
*/