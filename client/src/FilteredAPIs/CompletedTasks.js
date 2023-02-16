"use strict";
exports.__esModule = true;
exports.CompletedTasks = void 0;
var CompletedTasks = /** @class */ (function () {
    function CompletedTasks() {
    }
    CompletedTasks.getTasksWith = function (param) {
        console.log("Fetch tasks which are", param);
    };
    return CompletedTasks;
}());
exports.CompletedTasks = CompletedTasks;
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
