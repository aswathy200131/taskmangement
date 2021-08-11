import React from 'react';
import axios from 'axios';

class App extends React.Component {
 constructor(props){
  super(props);
  this.state ={
    tasks:[],
    id:0,
    task:''
  }
}
componentDidMount(){
axios.get("http://localhost:8080/api/")
.then((res)=>{
  this.setState({
    tasks:res.data,
    id:0,
    task:''
  })
})
}
submit(event,id){
  event.preventDefault()
  if(id===0){
    axios.post("http://localhost:8080/api/",{
      task:this.state.task
    }).then(()=>{
      this.componentDidMount(); 
    })
  }else{
    axios.put("http://localhost:8080/api/",{
      id:id, 
      task:this.state.task
    }).then(()=>{
      this.componentDidMount(); 
    })
  }
}
delete(id){
  axios.delete("http://localhost:8080/api/"+id)
  .then(()=>{
    this.componentDidMount();
  })
}
edit(id){
  axios.get("http://localhost:8080/api/"+id)
  .then((res)=>{
    this.setState({
      id:res.data.id,
      task:res.data.task

    })
  })
}
  render(){
  return (
    <div className="container">
     <div className="row">
      <div className="col s6">
          <form onSubmit={(e)=>this.submit(e,this.state.id)}>
          <div class="input-field col s12">
          <i class="material-icons prefix">assignment</i>
          <input value={this.state.task} onChange={(e)=>this.setState({task:e.target.value})} type="text" id="autocomplete-input" class="autocomplete"  />
          <label for="autocomplete-input">Enter New Task</label>
        </div>
        <button class="btn waves-effect waves-light right" type="submit" name="action">Submit
           <i class="material-icons right">send</i>
         </button>
          </form>
      </div> 
      <div className="col s6">
      <table>
        <thead>
          <tr>
              <th>Status</th>
              <th>Tasks</th>
              <th>Edit</th>
              <th>Delete</th>
          </tr>
        </thead>

        <tbody>
            {
              this.state.tasks.map(task =>
                <tr key={task.id}>
                  <td><label>
                       <input type="radio" />
                       <span></span>
                      </label> </td>
                  <td>{task.task}</td>
                  <td>
                  <button onClick={(e)=>this.edit(task.id)} class="btn waves-effect waves-light" type="submit" name="action">
           <i class="material-icons">edit</i>
         </button>
                  </td>
                  <td>
                  <button onClick={(e)=>this.delete(task.id)} class="btn waves-effect waves-light" type="submit" name="action">
           <i class="material-icons">delete</i>
         </button>
                  </td>

                </tr>
                )
       }
        
        </tbody>
      </table>
          </div>                
          </div>              
      </div>
    );
  }
}
export default App;
