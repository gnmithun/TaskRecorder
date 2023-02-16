"use strict";
exports.__esModule = true;
exports.FilteredTasks = void 0;
var FilteredTasks = /** @class */ (function () {
    function FilteredTasks() {
    }
    FilteredTasks.getTasksWith = function (day) {
        console.log("Fetch tasks which are", day);
        // const options = {
        //     method : 'GET',
        //     headers : { 'Content-Type' : 'application/json' },
        //     mode:'cors'
        //   }
        //   const resp = await fetch("http://localhost:8000/tasksFor?day="+day,options)
        //   const data = await resp.json() 
        //   if (data.response === "Success"){
        //     if ( data.details.length === 0 ) {
        //       alert("No tasks found")
        //       setTasks([])
        //       setLoading(false)
        //       return
        //     }
        //     setTasks(data.details)  
        //   } else {
        //     alert(data.details)
        //   }  
    };
    return FilteredTasks;
}());
exports.FilteredTasks = FilteredTasks;
/*
   const customFetchTasks = async (day) => {
      setLoading(true)


      setLoading(false)
    }
*/
